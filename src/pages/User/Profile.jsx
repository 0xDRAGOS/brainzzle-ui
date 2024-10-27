import { useState, useEffect } from "react";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import AccountSettings from "./AccountSettings.jsx";
import MyQuizzes from "../Quiz/MyQuizzes.jsx";
import {APP_API_URL} from "../../config.js";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("personalInfo");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${APP_API_URL}/adminuser/get-profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (data.statusCode === 200 && data.user) {
                    setUser(data.user);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        if (token) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [token]);

    const sidebarItems = [
        { id: "personalInfo", label: "Personal Info" },
        { id: "accountSettings", label: "Account Settings" },
        { id: "notifications", label: "Notifications" },
        { id: "privacy", label: "Privacy" },
        { id: "myquizzes", label: "My Quizzes" }
    ];

    const renderContent = () => {
        if (loading) {
            return <p>Loading...</p>;
        }

        switch (activeTab) {
            case "personalInfo":
                return <PersonalInfo user={user} />;
            case "accountSettings":
                return <AccountSettings user={user} />;
            case "notifications":
                return <Notifications />;
            case "privacy":
                return <Privacy />;
            case "myquizzes":
                return <MyQuizzes/>;
            default:
                return <PersonalInfo user={user} />;
        }
    };

    return (
        <AuthenticatedLayout header="Profile">
            <div className="flex min-h-screen m-8 bg-slate-950 text-gray-300 rounded-xl shadow-2xl">
                <div className="w-1/4 p-4 bg-slate-950 rounded-lg shadow-lg">
                    <ul className="space-y-4">
                        {sidebarItems.map((item) => (
                            <li
                                key={item.id}
                                className={`cursor-pointer p-2 rounded-lg ${
                                    activeTab === item.id ? "bg-blue-600 text-white" : "hover:bg-slate-800"
                                }`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-3/4 p-8 bg-slate-800 rounded-lg shadow-lg">
                    {renderContent()}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function PersonalInfo({ user }) {
    return (
        <div className="p-6 bg-slate-900 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-white mb-6">Personal Information</h2>

            {user ? (
                <div className="space-y-4 text-gray-300">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">First Name:</span>
                        <span className="text-lg">{user.firstName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Last Name:</span>
                        <span className="text-lg">{user.lastName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Email:</span>
                        <span className="text-lg">{user.email}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Account Status:</span>
                        <span className={`text-lg ${user.enabled ? "text-green-500" : "text-red-500"}`}>
                            {user.enabled ? "Enabled" : "Disabled"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Account Locked:</span>
                        <span className={`text-lg ${user.accountNonLocked ? "text-green-500" : "text-red-500"}`}>
                            {user.accountNonLocked ? "No" : "Yes"}
                        </span>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400">No user data available.</p>
            )}
        </div>
    );
}

function Notifications() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <p>Manage your notification preferences.</p>
        </div>
    );
}

function Privacy() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Privacy Settings</h2>
            <p>Manage your privacy settings and control who can see your activity.</p>
        </div>
    );
}
