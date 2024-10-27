import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {APP_API_URL} from "../../../config.js";

export default function DeleteUserForm({ userId, token }) {
    const [error, setError] = useState("");
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const deleteUser = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");

        if (!confirmDelete) return;

        try {
            const response = await fetch(`${APP_API_URL}/user/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete account");
            }

            setIsAuthenticated(false);
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");

            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-slate-950 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Delete Account</h3>
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-gray-300 mb-4">This action is irreversible. Please confirm.</p>
            <button
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                onClick={deleteUser}
            >
                Delete Account
            </button>
        </div>
    );
}
