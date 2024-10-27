import { Link } from 'react-router-dom';
import { useState } from 'react';
import NavLink from '../components/NavLink.jsx';
import Footer from '../components/Footer.jsx';

export default function GuestLayout({ header, children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                            <NavLink to="/login" className="text-sm sm:text-base md:text-lg transition-all duration-200 ease-in-out">Login</NavLink>
                            <NavLink to="/register" className="text-sm sm:text-base md:text-lg transition-all duration-200 ease-in-out">Register</NavLink>
                            <NavLink
                                to="/quiz/create"
                                className="bg-blue-700 pt-2 pb-2 border hover:text-white hover:border hover:border-white focus:text-white focus:border-white text-sm sm:text-base md:text-lg transition-all duration-200 ease-in-out"
                            >
                                Create a quiz
                            </NavLink>
                        </div>

                        <div className="lg:hidden mt-2">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-300 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
                    <div className="flex flex-col items-center space-y-4 py-4 mx-28">
                        <NavLink to="/login" className="text-base transition-all duration-200 ease-in-out w-full text-center">Login</NavLink>
                        <NavLink to="/register" className="text-base transition-all duration-200 ease-in-out w-full text-center">Register</NavLink>
                        <NavLink
                            to="/quiz/create"
                            className="bg-blue-700 pt-2 pb-2 border hover:text-white hover:border hover:border-white focus:text-white focus:border-white text-base transition-all duration-200 ease-in-out w-full text-center"
                        >
                            Create a quiz
                        </NavLink>
                    </div>
                </div>

                <div className="border-t border-transparent h-1">
                    <div className="bg-gradient-to-r from-transparent via-gray-300 to-transparent h-full transition-all duration-500"></div>
                </div>

                {header && (
                    <header>
                        <div className="text-gray-300 text-xl max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}
            </nav>

            <main className="flex-1">{children}</main>

            <Footer />
        </div>
    );
}
