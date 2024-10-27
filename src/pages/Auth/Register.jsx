import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import GuestLayout from "../../layouts/GuestLayout.jsx";
import {APP_API_URL} from "../../config.js";

export default function Register() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');

        if (!formData.firstName) {
            setFirstNameError('First Name cannot be empty');
            return;
        }

        if (!formData.lastName) {
            setLastNameError('Last Name cannot be empty');
            return;
        }

        if (!formData.email) {
            setEmailError('Email address cannot be empty');
            return;
        }

        if (!formData.password) {
            setPasswordError('Password cannot be empty');
            return;
        }

        try {
            const response = await fetch(`${APP_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError("Failed to register.");
                setTimeout(() => {
                    setError('');
                }, 5000);
            }

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            });
            alert('User registered successfully');
            navigate('/');
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <GuestLayout header="Register">
            {!isAuthenticated ? (
                <div className="flex justify-center items-center min-h-screen text-gray-300">
                    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto p-6 sm:p-8 bg-slate-950 rounded-2xl shadow-xl">
                        {error && (
                            <p className="text-center font-bold py-2 bg-slate-900 rounded mb-4">
                                {error}
                            </p>
                        )}
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <div className="flex flex-col w-full">
                                <label htmlFor="firstName" className="mb-2 font-bold">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="p-2 rounded border border-gray-400 bg-slate-800 text-gray-300"
                                />
                                {firstNameError && (
                                    <p className="font-bold px-2 py-2 bg-slate-900 rounded mt-2">
                                        {firstNameError}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col w-full">
                                <label htmlFor="lastName" className="mb-2 font-bold">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="p-2 rounded border border-gray-400 bg-slate-800 text-gray-300"
                                />
                                {lastNameError && (
                                    <p className="font-bold px-2 py-2 bg-slate-900 rounded mt-2">
                                        {lastNameError}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col w-full">
                                <label htmlFor="email" className="mb-2 font-bold">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="john.doe@domain.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="p-2 rounded border border-gray-400 bg-slate-800 text-gray-300"
                                />
                                {emailError && (
                                    <p className="font-bold px-2 py-2 bg-slate-900 rounded mt-2">
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col w-full">
                                <label htmlFor="password" className="mb-2 font-bold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Type in your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="p-2 rounded border border-gray-400 bg-slate-800 text-gray-300"
                                />
                                {passwordError && (
                                    <p className="font-bold px-2 py-2 bg-slate-900 rounded mt-2">
                                        {passwordError}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 w-full sm:w-auto"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <p className="text-gray-300 text-center text-2xl font-bold py-2 bg-slate-900 rounded mb-4">
                    You are already registered.
                </p>
            )}
        </GuestLayout>
    );
}
