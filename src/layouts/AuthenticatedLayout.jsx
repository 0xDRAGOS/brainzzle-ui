import { Link } from 'react-router-dom';
import NavLink from '../components/NavLink.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function AuthenticatedLayout({ user, header, children }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950">
            <nav className="bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-2 lg:py-4">
                    <div className="flex justify-between h-auto">
                        <div className="shrink-0 flex items-center">
                            <Link to="/">
                                <h1 className="text-gray-300 text-5xl">Brainzzle.</h1>
                            </Link>
                        </div>

                        <div className="flex space-x-8 sm:-my-px sm:ms-10 sm:flex items-center">
                            <NavLink to="/">Login</NavLink>
                            <NavLink to="/">Signup</NavLink>
                            <NavLink to="/" className="bg-blue-700 pt-2 pb-2 border hover:text-white hover:border hover:border-white focus:text-white focus:border-white">Create your quiz</NavLink>
                        </div>
                    </div>
                </div>

                <div className="border-t border-transparent h-1">
                    <div
                        className="bg-gradient-to-r from-transparent via-gray-300 to-transparent h-full transition-all duration-500"></div>
                </div>

                {header && (
                    <header>
                        <div
                            className="text-gray-300 text-3xl max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}
            </nav>

            <main className="flex-1">{children}</main>

            <footer className="py-8 text-center text-sm text-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p>&copy; {new Date().getFullYear()} Brainzzle. All rights reserved.</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faFacebookF}/>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faInstagram}/>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faLinkedinIn}/>
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
