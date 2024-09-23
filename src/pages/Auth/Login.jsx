import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const BASE_URL = `http://localhost:8080/auth/login`;


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setEmailError('Email address cannot be empty');
            setPasswordError('');
            return;
        };

        if (!password) {
            setEmailError('');
            setPasswordError('Password cannot be empty');
            return;
        };

        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const userData = await response.json();
            console.log(userData);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                setIsAuthenticated(true);
                navigate('/');
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <AuthenticatedLayout header="Login">
            {
                !isAuthenticated ? (
                    <div className="flex justify-center items-center min-h-screen text-gray-300">
                        <div className="w-1/4 h-auto p-8 bg-slate-950 rounded-2xl shadow-xl">
                            {
                                error && <p className="text-center font-bold py-2 bg-slate-900 rounded mb-4">{error}</p>
                            }
                            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="email" className="mb-2 font-bold">Email</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="p-2 rounded border border-gray-400 bg-slate-800 text-gray-300"
                                    />
                                    {
                                        emailError &&
                                        <p className="font-bold px-2 py-2 bg-slate-900 rounded mt-2">{emailError}</p>
                                    }
                                </div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="password" className="mb-2 font-bold">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="font-bold px-2 py-2 bg-slate-900 rounded mt-2"
                                    />
                                    {
                                        passwordError &&
                                        <p className="text-center font-bold py-2 bg-slate-900 rounded m-2">{passwordError}</p>
                                    }
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : <p className="text-gray-300 text-center text-2xl font-bold py-2 bg-slate-900 rounded mb-4">You are already logged in.</p>
            }
        </AuthenticatedLayout>
    );
}