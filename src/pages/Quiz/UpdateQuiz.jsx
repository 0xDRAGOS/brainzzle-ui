import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import QuizForm from "./Partials/QuizForm.jsx";
import {APP_API_URL} from "../../config.js";

export default function UpdateQuiz() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState('');
    const { quizId } = useParams();

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
                    setError("Failed to fetch the quiz data.");
                    setTimeout(() => {
                        setError('');
                    }, 5000);
                }

                setQuizData(data);
            } catch (error) {
                setError(error.message);
                setTimeout(() => setError(''), 5000);
            }
        };

        fetchQuizData();
    }, [quizId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${APP_API_URL}/quiz/update/${quizId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(quizData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError("Failed to update the quiz: " + data.message);
                setTimeout(() => {
                    setError('');
                }, 5000);
            }

            alert('Quiz updated successfully');
            navigate(`/quiz/view/${quizId}`);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <AuthenticatedLayout header="Update your quiz">
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
                            isEditing={true}
                        />
                    </div>
                </div>
            ) : (
                <p className="text-gray-300 text-center text-2xl font-bold py-2 bg-slate-900 rounded mb-4">
                    You need to be logged in to update the quiz.
                </p>
            )}
        </AuthenticatedLayout>
    );
}
