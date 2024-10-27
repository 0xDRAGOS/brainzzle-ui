import { useState, useEffect } from "react";
import {APP_API_URL} from "../../../config.js";

export default function UpdateProfileInformationForm({ user, token }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${APP_API_URL}/user/update-details`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ firstName, lastName, email }),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile information");
            }

            setSuccess("Profile updated successfully");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className="w-full max-w-md p-6 bg-slate-950 rounded-lg shadow-lg" onSubmit={handleUpdateProfile}>
            <h3 className="text-xl font-semibold mb-4">Update Profile Information</h3>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <div className="mb-4">
                <label className="block mb-2 text-gray-300">First Name</label>
                <input
                    type="text"
                    className="input-field w-full p-2 rounded border border-gray-700 bg-slate-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-600"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-gray-300">Last Name</label>
                <input
                    type="text"
                    className="input-field w-full p-2 rounded border border-gray-700 bg-slate-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-600"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-gray-300">Email</label>
                <input
                    type="email"
                    className="input-field w-full p-2 rounded border border-gray-700 bg-slate-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4">
                Update Profile
            </button>
        </form>
    );
}
