import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {APP_API_URL} from "../../config.js";

export default function ViewQuiz() {
    const { isAuthenticated } = useContext(AuthContext);
    const [quizData, setQuizData] = useState(null);
    const [error, setError] = useState('');
    const { quizId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchQuizData = async () => {
            try {
                const response = await fetch(`${APP_API_URL}/quiz/${quizId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch quiz data');
                }

                setQuizData(data);
            } catch (error) {
                setError(error.message);
                setTimeout(() => setError(''), 5000);
            }
        };

        fetchQuizData();
    }, [quizId]);

    if (!isAuthenticated) {
        return (
            <AuthenticatedLayout header="Quiz Details">
                <p className="text-gray-300 text-center text-2xl font-bold py-2 bg-slate-900 rounded mb-4">You need to be logged in to view this quiz.</p>
            </AuthenticatedLayout>
        );
    }

    if (!quizData) {
        return (
            <AuthenticatedLayout header="Loading Quiz">
                <div className="flex justify-center items-center min-h-screen text-gray-300">
                    <p>Loading quiz data...</p>
                </div>
            </AuthenticatedLayout>
        );
    }

    const handleUpdateQuiz = (quizId) => {
        navigate(`/quiz/update/${quizId}`);
    };

    return (
        <AuthenticatedLayout header={`Quiz: ${quizData.title}`}>
            <div className="flex justify-center items-center min-h-screen text-gray-300 my-8 mx-2">
                <div className="w-full max-w-4xl p-8 bg-slate-950 rounded-xl shadow-2xl">
                    {
                        error && <p className="text-center text-red-500 font-bold py-2 bg-slate-800 rounded mb-4">{error}</p>
                    }
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col w-full">
                            <h2 className="text-3xl font-bold mb-4">Quiz Title</h2>
                            <p className="text-lg text-gray-400">{quizData.title}</p>
                        </div>

                        <div className="flex flex-col w-full">
                            <h3 className="text-2xl font-semibold mb-2">Description</h3>
                            <p className="text-gray-400">{quizData.description}</p>
                        </div>

                        {quizData.questions.map((question, qIndex) => (
                            <div key={qIndex} className="question-block p-4 rounded-lg bg-slate-900 space-y-4">
                                <h4 className="text-xl font-semibold">Question {qIndex + 1}</h4>
                                <p className="text-gray-300">{question.questionText}</p>

                                {question.answers.map((answer, aIndex) => (
                                    <div key={aIndex} className="answer-block flex flex-col space-y-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={answer.isCorrect}
                                                disabled
                                                className="rounded focus:ring focus:ring-blue-500 mr-2"
                                            />
                                            <p className="text-gray-400">{answer.answerText}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={() => handleUpdateQuiz(quizId)}
                        >
                            Update
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-6"
                        >
                            Back to Quizzes
                        </button>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
