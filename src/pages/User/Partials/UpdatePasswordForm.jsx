import { useState } from "react";
import {APP_API_URL} from "../../../config.js";

export default function UpdatePasswordForm({ userId, token }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${APP_API_URL}/user/update-password/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!response.ok) {
                setError("Failed to update the password.");
                setTimeout(() => {
                    setError('');
                }, 5000);
            }

            setSuccess("Password updated successfully");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className="w-full max-w-md p-6 bg-slate-950 rounded-lg shadow-lg" onSubmit={handleUpdatePassword}>
            <h3 className="text-xl font-semibold mb-4">Update Password</h3>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <div className="mb-4">
                <label className="block mb-2 text-gray-300">Current Password</label>
                <input
                    type="password"
                    className="input-field w-full p-2 rounded border border-gray-700 bg-slate-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-600"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-gray-300">New Password</label>
                <input
                    type="password"
                    className="input-field w-full p-2 rounded border border-gray-700 bg-slate-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-600"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4">
                Update Password
            </button>
        </form>
    );
}
