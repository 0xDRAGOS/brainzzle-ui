import DeleteUserForm from "./partials/DeleteUserForm.jsx";
import UpdatePasswordForm from "./partials/UpdatePasswordForm.jsx";
import UpdateProfileInformationForm from "./partials/UpdateProfileInformationForm.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import {json, useNavigate} from "react-router-dom";

export default function AccountSettings({ user }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleUserDeleted = () => {
        navigate("/register");
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

            <div className="mt-8">
                <UpdateProfileInformationForm user={user} token={token} />
            </div>

            <div className="mt-8">
                <UpdatePasswordForm userId={user.userId} token={token} />
            </div>

            <div className="mt-8">
                <DeleteUserForm userId={user.userId} token={token} onUserDeleted={handleUserDeleted} />
            </div>
        </div>
    );
}
