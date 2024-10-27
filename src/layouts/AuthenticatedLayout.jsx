import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import NavLink from '../components/NavLink.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { handleLogout, isTokenValid } from '../utils/AuthUtils.js';
import Footer from '../components/Footer.jsx';
import Dropdown from '../components/Dropdown.jsx';

export default function AuthenticatedLayout({ header, children }) {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token || !isTokenValid(token)) {
            setIsAuthenticated(false);
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate('/login');
        }
    }, [isAuthenticated, setIsAuthenticated, navigate]);

    const dropdownOptions = [
        { label: "Profile", value: "profile" },
        { label: "Logout", value: "logout" }
    ];

    const handleDropdownSelect = (option) => {
        if (option.value === "profile") {
            navigate('/profile');
        } else if (option.value === "logout") {
            handleLogout(setIsAuthenticated);
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-900">
            <nav className="bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-2 lg:py-4">
                    <div className="flex justify-between items-center h-auto">
                        <div className="shrink-0 flex items-center">
                            <Link to="/">
                                <h1 className="text-gray-300 text-2xl md:text-3xl lg:text-5xl">Brainzzle.</h1>
                            </Link>
                        </div>
                        <div className="hidden lg:flex space-x-8 items-center">
                            <NavLink to="/quiz/create" className="bg-blue-700 pt-2 pb-2 border hover:text-white hover:border hover:border-white focus:text-white focus:border-white text-sm sm:text-base md:text-lg transition-all duration-200 ease-in-out">
                                Create your quiz
                            </NavLink>
                            {
                                !isAuthenticated ? (
                                    <>
                                        <NavLink to="/login" className="text-sm sm:text-base md:text-lg transition-all duration-200 ease-in-out">Login</NavLink>
                                        <NavLink to="/register" className="text-sm sm:text-base md:text-lg transition-all duration-200 ease-in-out">Register</NavLink>
                                    </>
                                ) : (
                                    <Dropdown label="Profile" options={dropdownOptions} onSelect={handleDropdownSelect} />
                                )
                            }
                        </div>

                        <div className="block lg:hidden mt-2">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-300 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
                    <div className="flex flex-col items-center space-y-4 py-4 mx-28">
                        <NavLink to="/quiz/create" className="bg-blue-700 pt-2 pb-2 border hover:text-white hover:border hover:border-white focus:text-white focus:border-white text-base transition-all duration-200 ease-in-out w-full text-center">
                            Create your quiz
                        </NavLink>
                        {
                            !isAuthenticated ? (
                                <>
                                    <NavLink to="/login" className="text-base transition-all duration-200 ease-in-out">Login</NavLink>
                                    <NavLink to="/register" className="text-base transition-all duration-200 ease-in-out">Register</NavLink>
                                </>
                            ) : (
                                <Dropdown label="Profile" options={dropdownOptions} onSelect={handleDropdownSelect} />
                            )
                        }
                    </div>
                </div>

                <div className="border-t border-transparent h-1">
                    <div className="bg-gradient-to-r from-transparent via-gray-300 to-transparent h-full transition-all duration-500"></div>
                </div>

                {header && (
                    <header>
                        <div className="text-gray-300 text-xl sm:text-xl md:text-2xl max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
            </nav>

            <main className="flex-1">{children}</main>

            <Footer />
        </div>
    );
}
