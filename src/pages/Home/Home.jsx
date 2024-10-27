import { Link, useNavigate } from 'react-router-dom';
import PuzzleBrainImage from "../../assets/puzzlebrain.png";
import NavLink from "../../components/NavLink.jsx";
import Footer from "../../components/Footer.jsx";
import { handleLogout } from "../../utils/AuthUtils.js";
import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import {APP_API_URL} from "../../config.js";

export default function Home() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [topQuizzes, setTopQuizzes] = useState([]);
    const [error, setError] = useState('');

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

    const fetchTopQuizzes = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${APP_API_URL}/quiz/get-top`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                setError("Failed to fetch quizzes.");
                setTimeout(() => {
                    setError('');
                }, 5000);
            }

            const data = await response.json();
            setTopQuizzes(data || []);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchTopQuizzes();
        }
    }, [isAuthenticated]);

    const truncateTitle = (title) => {
        return title.length > 15 ? `${title.slice(0, 12)}...` : title;
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-900">
            {/* Navigation Bar */}
            <nav className="bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-2 lg:py-4">
                    <div className="flex justify-between items-center h-auto">
                        <div className="shrink-0 flex items-center">
                            <Link to="/">
                                <h1 className="text-gray-300 text-2xl md:text-3xl lg:text-5xl ">Brainzzle.</h1>
                            </Link>
                        </div>
                        <div className={`hidden lg:flex space-x-8 items-center`}>
                            <NavLink
                                to="/quiz/create"
                                className="bg-blue-700 pt-2 pb-2 border hover:text-white hover:border hover:border-white focus:text-white focus:border-white text-sm sm:text-base md:text-lg transition-all duration-200 ease-in-out"
                            >
                                Create your quiz
                            </NavLink>
                            {
                                !isAuthenticated ? (
                                    <>
                                        <NavLink to="/login" className="text-sm sm:text-base md:text-lg transition-all duration-200 ease-in-out">Login</NavLink>
                                        <NavLink to="/register" className="text-sm sm:text-base md:text-lg transition-all duration-200 ease-in-out">Register</NavLink>
                                    </>
                                ) : (
                                    <Dropdown
                                        label="Profile"
                                        options={dropdownOptions}
                                        onSelect={handleDropdownSelect}
                                    />
                                )
                            }
                        </div>
                        <div className="block lg:hidden mt-2">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-300 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-transparent h-1">
                    <div className="bg-gradient-to-r from-transparent via-gray-300 to-transparent h-full transition-all duration-500"></div>
                </div>
                <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
                    <div className="flex flex-col items-center space-y-4 py-4 mx-28">
                        <NavLink
                            to="/quiz/create"
                            className="bg-blue-700 pt-2 pb-2 border hover:text-white hover:border hover:border-white focus:text-white focus:border-white text-base transition-all duration-200 ease-in-out w-full text-center"
                        >
                            Create your quiz
                        </NavLink>
                        {
                            !isAuthenticated ? (
                                <>
                                    <NavLink to="/login" className="text-base transition-all duration-200 ease-in-out">Login</NavLink>
                                    <NavLink to="/register" className="text-base transition-all duration-200 ease-in-out">Register</NavLink>
                                </>
                            ) : (
                                <Dropdown
                                    label="Profile"
                                    options={dropdownOptions}
                                    onSelect={handleDropdownSelect}
                                />
                            )
                        }
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-12 flex flex-col-reverse md:flex-row items-center justify-center min-h-screen bg-slate-900 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col max-w-lg text-center md:text-left">
                    <h3 className="text-5xl md:text-7xl text-white font-semibold">
                        Create Your Own Quiz and Master Your Knowledge
                    </h3>
                    <p className="mt-6 text-gray-300">
                        Welcome to Brainzzle, the ultimate platform for creating personalized quizzes and sharpening your skills!
                        Whether you are a student, teacher, or lifelong learner, you can design custom quizzes and challenge yourself
                        or others. It's never been easier to train your brain and track your progress as you tackle new topics and
                        improve your knowledge. Start creating your quiz today and take your learning journey to the next level!
                    </p>
                    <div className="flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-4">
                        <button
                            onClick={() => navigate('/quiz/create')}
                            className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg flex-grow"
                        >
                            Start Creating Your Quiz
                        </button>
                        <button
                            onClick={() => navigate('/quizzes')}
                            className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-6 rounded-lg flex-grow"
                        >
                            Explore Quizzes
                        </button>
                    </div>
                </div>
                <img src={PuzzleBrainImage} alt="Puzzle Brain" className="w-full max-w-md mb-8 md:mb-0 md:mr-8" />
            </section>

            {/* Features Section */}
            <section className="py-12 bg-slate-800">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl text-center text-white mb-8">Why Brainzzle?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-slate-700 p-6 rounded-lg text-center">
                            <h3 className="text-2xl text-white">Customizable Quizzes</h3>
                            <p className="text-gray-300 mt-2">Design quizzes on any topic with a variety of question types.</p>
                        </div>
                        <div className="bg-slate-700 p-6 rounded-lg text-center">
                            <h3 className="text-2xl text-white">Track Your Progress</h3>
                            <p className="text-gray-300 mt-2">Monitor your performance and quiz history in real-time.</p>
                        </div>
                        <div className="bg-slate-700 p-6 rounded-lg text-center">
                            <h3 className="text-2xl text-white">Challenge Your Friends</h3>
                            <p className="text-gray-300 mt-2">Invite friends and compete in personalized quizzes together.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 px-4 bg-slate-900 text-white">
                <h2 className="text-4xl text-center mb-8">What Our Users Say</h2>
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 rounded-lg bg-slate-800">
                        <p className="text-lg">"Brainzzle has transformed the way I study. It's a fun and effective way to quiz myself."</p>
                        <span className="block mt-4 font-semibold">— Jane Doe, Student</span>
                    </div>
                    <div className="p-6 rounded-lg bg-slate-800">
                        <p className="text-lg">"I love how easy it is to create and share quizzes with my class. A great tool for teachers!"</p>
                        <span className="block mt-4 font-semibold">— John Smith, Teacher</span>
                    </div>
                    <div className="p-6 rounded-lg bg-slate-800">
                        <p className="text-lg">"The ability to track my progress over time has really helped me improve my knowledge."</p>
                        <span className="block mt-4 font-semibold">— Alex Brown, Lifelong Learner</span>
                    </div>
                </div>
            </section>

            {/* Popular Quizzes Section */}
            <section className="py-12 px-4 bg-slate-800">
                <h2 className="text-4xl text-center text-white mb-8">Popular Quizzes</h2>
                {error && (
                    <div className="bg-red-600 text-white text-center p-4">
                        <p>{error.message}</p>
                    </div>
                )}
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topQuizzes.map((quiz, index) => (
                        <div key={index} className="bg-slate-700 p-6 rounded-lg">
                            <h3 className="text-xl text-white">{truncateTitle(quiz.title)}</h3>
                            <p className="text-gray-300 mt-2">{quiz.description}</p>
                            <Link to={`/quiz/play/${quiz.id}`} className="mt-4 inline-block text-blue-400 hover:text-blue-500">Take Quiz</Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 px-4 bg-slate-900 text-white">
                <h2 className="text-4xl text-center mb-8">Frequently Asked Questions</h2>
                <div className="max-w-4xl mx-auto space-y-6">
                    <div>
                        <h3 className="text-xl">How do I create a quiz?</h3>
                        <p className="text-gray-400 mt-2">Simply sign up, click on "Create your quiz", and follow the steps to design a custom quiz on any topic.</p>
                    </div>
                    <div>
                        <h3 className="text-xl">Can I track my progress?</h3>
                        <p className="text-gray-400 mt-2">Yes! You can monitor your quiz performance and see your improvement over time on your profile page.</p>
                    </div>
                    <div>
                        <h3 className="text-xl">Can I share my quizzes with friends?</h3>
                        <p className="text-gray-400 mt-2">Absolutely! Once you create a quiz, you can share the link with others to challenge them.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
