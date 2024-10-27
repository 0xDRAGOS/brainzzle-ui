import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import QuizForm from "./Partials/QuizForm.jsx";
import {APP_API_URL} from "../../config.js";

export default function CreateQuiz() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState('');


    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        isPublic: false,
        questions: [
            {
                questionText: '',
                answers: [
                    {
                        answerText: '',
                        isCorrect: false
                    }
                ],
                images: []
            }
        ]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${APP_API_URL}/quiz/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(quizData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
            }

            setQuizData({
                title: '',
                description: '',
                isPublic: false,
                questions: [
                    {
                        questionText: '',
                        answers: [
                            {
                                answerText: '',
                                isCorrect: false
                            }
                        ]
                    }
                ]
            });
            alert('Quiz created successfully');
            navigate(`/quiz/view/${data.id}`);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <AuthenticatedLayout header="Create your own quiz">
            {isAuthenticated ? (
                <div className="flex justify-center items-center min-h-screen text-gray-300 my-8 mx-2">
                    <div className="w-full max-w-4xl p-8 bg-slate-950 rounded-xl shadow-2xl">
                        {error && (
                            <p className="text-center text-red-500 font-bold py-2 bg-slate-800 rounded mb-4">{error}</p>
                        )}
                        <QuizForm
                            quizData={quizData}
                            setQuizData={setQuizData}
                            onSubmit={handleSubmit}
                            isEditing={false}
                        />
                    </div>
                </div>
            ) : (
                <p className="text-gray-300 text-center text-2xl font-bold py-2 bg-slate-900 rounded mb-4">
                    You need to be logged in to create a quiz.
                </p>
            )}
        </AuthenticatedLayout>
    );
}