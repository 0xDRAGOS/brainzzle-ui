import React, {useState} from 'react';

const QuizForm = ({ quizData, setQuizData, onSubmit, isEditing }) => {

    const [error, setError] = useState('');
    const handleQuizDataChange = (e) => {
        const { name, value } = e.target;
        setQuizData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            [name]: value,
        };
        setQuizData((prevData) => ({
            ...prevData,
            questions: updatedQuestions,
        }));
    };

    const handleAnswerChange = (questionIndex, answerIndex, e) => {
        const { name, value, type, checked } = e.target;
        const updatedQuestions = [...quizData.questions];
        const updatedAnswers = [...updatedQuestions[questionIndex].answers];

        updatedAnswers[answerIndex] = {
            ...updatedAnswers[answerIndex],
            [name]: type === 'checkbox' ? checked : value,
        };

        updatedQuestions[questionIndex].answers = updatedAnswers;
        setQuizData((prevData) => ({
            ...prevData,
            questions: updatedQuestions,
        }));
    };

    const removeQuestion = (questionIndex) => {
        const updatedQuestions = [...quizData.questions];

        if (updatedQuestions.length > 1) {
            updatedQuestions.splice(questionIndex, 1);
        } else {
            setError('At least one question is required.');
            setTimeout(() => setError(''), 5000);
        }

        setQuizData((prevData) => ({
            ...prevData,
            questions: updatedQuestions,
        }));
    };

    const addNewAnswer = (questionIndex) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[questionIndex].answers.push({ answerText: '', isCorrect: false });

        setQuizData((prevData) => ({
            ...prevData,
            questions: updatedQuestions,
        }));
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = [...quizData.questions];

        if (updatedQuestions[questionIndex].answers.length > 1) {
            updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
        }

        setQuizData((prevData) => ({
            ...prevData,
            questions: updatedQuestions,
        }));
    };

    const addNewQuestion = () => {
        setQuizData((prevData) => ({
            ...prevData,
            questions: [
                ...prevData.questions,
                {
                    questionText: '',
                    answers: [{ answerText: '', isCorrect: false }],
                },
            ],
        }));
    };

    const handlePublicChange = (e) => {
        setQuizData((prevData) => ({
            ...prevData,
            isPublic: e.target.checked,
        }));
    };

    return (

        <form onSubmit={onSubmit} className="flex flex-col space-y-6">
            {error && (
                <p className="text-center text-red-500 font-bold py-2 bg-slate-800 rounded mb-4">{error}</p>
            )}
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

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="isPublic"
                    checked={quizData.isPublic}
                    onChange={handlePublicChange}
                    className="rounded focus:ring focus:ring-blue-500"
                />
                <label className="text-lg font-semibold">Make quiz public</label>
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
                {isEditing ? 'Update Quiz' : 'Create Quiz'}
            </button>
        </form>
    );
};

export default QuizForm;