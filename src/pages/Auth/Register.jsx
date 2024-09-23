import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";

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

    const BASE_URL = `http://localhost:8080/auth/register`;
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

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
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
        <AuthenticatedLayout header="Register">
            {
                !isAuthenticated ? (
                    <div className="flex justify-center items-center min-h-screen text-gray-300">
                        <div className="w-1/4 h-auto p-8 bg-slate-950 rounded-2xl shadow-xl">
                            {
                                error && <p className="text-center font-bold py-2 bg-slate-900 rounded mb-4">{error}</p>
                            }
                            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="firstName" className="mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="p-2 rounded border border-gray-400 bg-slate-800 text-gray-300"
                                    />
                                    {
                                        firstNameError &&
                                        <p className="font-bold px-2 py-2 bg-slate-900 rounded mt-2">{firstNameError}</p>
                                    }
                                </div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="lastName" className="mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="p-2 rounded border border-gray-400 bg-slate-800 text-gray-300"
                                    />
                                    {
                                        lastNameError &&
                                        <p className="font-bold px-2 py-2 bg-slate-900 rounded mt-2">{lastNameError}</p>
                                    }
                                </div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="email" className="mb-2">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="john.doe@domain.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="p-2 rounded border border-gray-400 bg-slate-800 text-gray-300"
                                    />
                                    {
                                        emailError &&
                                        <p className="font-bold px-2 py-2 bg-slate-900 rounded mt-2">{emailError}</p>
                                    }
                                </div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="password" className="mb-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Type in your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="p-2 rounded border border-gray-400 bg-slate-800 text-gray-300"
                                    />
                                    {
                                        passwordError &&
                                        <p className="font-bold px-2 py-2 bg-slate-900 rounded mt-2">{passwordError}</p>
                                    }
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : <p className="text-gray-300 text-center text-2xl font-bold py-2 bg-slate-900 rounded mb-4">You are
                    already registered.</p>
            }

        </AuthenticatedLayout>
    );
}