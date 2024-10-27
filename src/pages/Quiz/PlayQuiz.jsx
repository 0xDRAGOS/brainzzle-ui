import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import { AuthContext } from '../../context/AuthContext.jsx';
import {APP_API_URL} from "../../config.js";

export default function PlayQuiz() {
    const { quizId } = useParams();
    const { isAuthenticated } = useContext(AuthContext);
    const [quizData, setQuizData] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8080/quiz/details/${quizId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
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

    const handleAnswerSelection = (questionId, answerId) => {
        setSelectedAnswers((prev) => {
            const currentAnswers = prev[questionId] || [];

            if (currentAnswers.includes(answerId)) {
                return {
                    ...prev,
                    [questionId]: currentAnswers.filter(id => id !== answerId),
                };
            } else {
                return {
                    ...prev,
                    [questionId]: [...currentAnswers, answerId],
                };
            }
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError('You need to be logged in to play the quiz.');
            return;
        }

        const submission = {
            answers: quizData.questions.map((question) => ({
                questionId: question.questionId,
                selectedAnswerIds: selectedAnswers[question.questionId] || [],
            })),
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${APP_API_URL}/quiz/${quizId}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(submission),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Submission failed');
            }

            setResult(data);
        } catch (error) {
            setError(error.message);
            setTimeout(() => setError(''), 5000);
        }
    };


    if (!isAuthenticated) {
        return (
            <AuthenticatedLayout header="Play Quiz">
                <p className="text-gray-300 text-center text-2xl font-bold py-2 bg-slate-900 rounded mb-4">
                    You need to be logged in to play this quiz.
                </p>
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

    return (
        <AuthenticatedLayout header={`Play Quiz: ${quizData.title}`}>
            <div className="flex justify-center items-center min-h-screen text-gray-300 my-8 mx-2">
                <div className="w-full max-w-4xl p-8 bg-slate-950 rounded-xl shadow-2xl">
                    {error && (
                        <p className="text-center text-red-500 font-bold py-2 bg-slate-800 rounded mb-4">
                            {error}
                        </p>
                    )}

                    {result ? (
                        <div className="result">
                            <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
                            <p className="text-lg">You got {result.totalQuestions} out of {quizData.questions.length} completed! Your score is {result.score}.</p>
                            <button
                                onClick={() => navigate('/myquizzes')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-6"
                            >
                                Back to Quizzes
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                            {quizData.questions.map((question, qIndex) => (
                                <div key={qIndex} className="question-block p-4 rounded-lg bg-slate-900 space-y-4">
                                    <h4 className="text-xl font-semibold">Question {qIndex + 1}</h4>
                                    <p className="text-gray-300">{question.questionText}</p>

                                    {question.answers.map((answer, aIndex) => (
                                        <div key={aIndex} className="answer-block flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                name={`question-${qIndex}`}
                                                value={answer.answerId}
                                                checked={selectedAnswers[question.questionId]?.includes(answer.answerId) || false}
                                                onChange={() => handleAnswerSelection(question.questionId, answer.answerId)}
                                                className="rounded focus:ring focus:ring-blue-500"
                                            />
                                            <label className="text-gray-400">{answer.answerText}</label>
                                        </div>
                                    ))}

                                </div>
                            ))}

                            <button
                                type="submit"
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Submit Quiz
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
