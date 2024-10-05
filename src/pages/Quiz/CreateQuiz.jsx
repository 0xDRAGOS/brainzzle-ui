import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function CreateQuiz() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState('');


    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
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

    function handleQuizDataChange(e) {
        const { name, value } = e.target;
        setQuizData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleQuestionChange(index, e) {
        const { name, value } = e.target;
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            [name]: value
        };
        setQuizData(prevData => ({
            ...prevData,
            questions: updatedQuestions
        }));
    }

    function handleAnswerChange(questionIndex, answerIndex, e) {
        const { name, value, type, checked } = e.target;
        const updatedQuestions = [...quizData.questions];
        const updatedAnswers = [...updatedQuestions[questionIndex].answers];

        updatedAnswers[answerIndex] = {
            ...updatedAnswers[answerIndex],
            [name]: type === "checkbox" ? checked : value
        };

        updatedQuestions[questionIndex].answers = updatedAnswers;
        setQuizData(prevData => ({
            ...prevData,
            questions: updatedQuestions
        }));
    }

    function removeQuestion(questionIndex) {
        const updatedQuestions = [...quizData.questions];

        if (updatedQuestions.length > 1) {
            updatedQuestions.splice(questionIndex, 1);
        } else {
            console.log('At least one question is required.');
        }

        setQuizData(prevData => ({
            ...prevData,
            questions: updatedQuestions
        }));
    }

    function addNewAnswer(questionIndex) {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[questionIndex].answers.push({ answerText: '', isCorrect: false });

        setQuizData(prevData => ({
            ...prevData,
            questions: updatedQuestions
        }));
    }

    function removeAnswer(questionIndex, answerIndex) {
        const updatedQuestions = [...quizData.questions];

        if (updatedQuestions[questionIndex].answers.length > 1) {
            updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
        }

        setQuizData(prevData => ({
            ...prevData,
            questions: updatedQuestions
        }));
    }

    function addNewQuestion() {
        setQuizData(prevData => ({
            ...prevData,
            questions: [
                ...prevData.questions,
                {
                    questionText: '',
                    answers: [{ answerText: '', isCorrect: false }]  // Initial answer
                }
            ]
        }));
    }

    const BASE_URL = `http://localhost:8080/quiz/create`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(BASE_URL, {
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
        <AuthenticatedLayout
            header="Create your own quiz"
        >
            {
                isAuthenticated ? (
            <div className="flex justify-center items-center min-h-screen text-gray-300 my-8">
                <div className="w-full max-w-4xl p-8 bg-slate-950 rounded-xl shadow-2xl">
                    {
                        error && <p className="text-center text-red-500 font-bold py-2 bg-slate-800 rounded mb-4">{error}</p>
                    }
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 text-lg font-semibold">Quiz Title</label>
                            <input
                                type="text"
                                name="title"
                                value={quizData.title}
                                onChange={handleQuizDataChange}
                                className="p-3 rounded border border-gray-600 bg-slate-800 text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="mb-2 text-lg font-semibold">Description</label>
                            <textarea
                                name="description"
                                value={quizData.description}
                                onChange={handleQuizDataChange}
                                className="p-3 rounded border border-gray-600 bg-slate-800 text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"
                                rows="4"
                            />
                        </div>

                        {quizData.questions.map((question, qIndex) => (
                            <div key={qIndex} className="question-block p-4 rounded-lg bg-slate-900 space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-lg font-semibold">Question {qIndex + 1}</label>
                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(qIndex)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Remove Question
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    name="questionText"
                                    value={question.questionText}
                                    onChange={(e) => handleQuestionChange(qIndex, e)}
                                    className="p-3 rounded border border-gray-600 bg-slate-800 text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none w-full"
                                    placeholder="Enter the question text"
                                />

                                {question.answers.map((answer, aIndex) => (
                                    <div key={aIndex} className="answer-block flex flex-col space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-lg font-semibold">Answer {aIndex + 1}</label>
                                            <button
                                                type="button"
                                                onClick={() => removeAnswer(qIndex, aIndex)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                            >
                                                Remove Answer
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            name="answerText"
                                            value={answer.answerText}
                                            onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                                            className="p-3 rounded border border-gray-600 bg-slate-800 text-gray-300 focus:ring focus:ring-blue-500 focus:outline-none w-full"
                                            placeholder="Enter the answer text"
                                        />
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                name="isCorrect"
                                                checked={answer.isCorrect}
                                                onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                                                className="rounded focus:ring focus:ring-blue-500"
                                            />
                                            <label>Correct Answer</label>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => addNewAnswer(qIndex)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Add New Answer
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addNewQuestion}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add New Question
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Create Quiz
                        </button>
                    </form>
                </div>
            </div>
                    ) : (
                    <p className="text-gray-300 text-center text-2xl font-bold py-2 bg-slate-900 rounded mb-4">You need to be logged in to create a quiz.</p>
                )
            }
        </AuthenticatedLayout>
    );
}