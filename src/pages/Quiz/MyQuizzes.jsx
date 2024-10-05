import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function MyQuizzes() {
    const { isAuthenticated } = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const BASE_URL = `http://localhost:8080/quiz`;

    const fetchQuizzes = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(BASE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch quizzes');
            }

            const data = await response.json();
            setQuizzes(data);
        } catch (error) {

            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchQuizzes();
        }
    }, [isAuthenticated]);

    const handleViewQuiz = (quizId) => {
        navigate(`/quiz/view/${quizId}`);
    };

    return (
        <AuthenticatedLayout header="Your quizzes">
            {
                isAuthenticated ? (
                    <div className="flex justify-center items-center min-h-screen text-gray-300 my-8">
                        <div className="w-full max-w-6xl p-8 bg-slate-950 rounded-xl shadow-2xl">
                            {
                                error && <p className="text-center text-red-500 font-bold py-2 bg-slate-800 rounded mb-4">{error}</p>
                            }
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {quizzes.length === 0 ? (
                                    <p className="text-center text-gray-400 col-span-3">You have no quizzes yet.</p>
                                ) : (
                                    quizzes.map((quiz, index) => (
                                        <div key={index}
                                             className="p-4 rounded-lg bg-slate-900 shadow-md transform transition-transform duration-200 hover:scale-105">
                                            <h3 className="text-lg font-semibold">{quiz.title}</h3>
                                            <p className="text-gray-400">{quiz.description}</p>
                                            <button
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                                onClick={() => handleViewQuiz(quiz.id)}
                                            >
                                                View
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-300 text-center text-2xl font-bold py-2 bg-slate-900 rounded mb-4">You need
                        to be logged in to view your quizzes.</p>
                )
            }
        </AuthenticatedLayout>
    );
}