import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination.jsx";

export default function QuizList({ quizzes = [], error, currentPage, totalPages, onNextPage, onPreviousPage }) {
    const navigate = useNavigate();

    const handleViewQuiz = (quizId) => {
        navigate(`/quiz/view/${quizId}`);
    };

    const handlePlayQuiz = (quizId) => {
        navigate(`/quiz/play/${quizId}`);
    };

    const truncateTitle = (title) => {
        return title.length > 15 ? `${title.slice(0, 12)}...` : title;
    };

    return (
        <div className="mx-4 md:mx-0 w-full max-w-6xl p-8 bg-slate-950 rounded-xl shadow-2xl">
            {error && <p className="text-center text-red-500 font-bold py-2 bg-slate-800 rounded mb-4">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {quizzes.length === 0 ? (
                    <p className="text-center text-gray-400 col-span-3">There is no quizzes yet.</p>
                ) : (
                    quizzes.map((quiz, index) => (
                        <div key={index}
                             className="p-4 rounded-lg bg-slate-900 shadow-md transform transition-transform duration-200 hover:scale-105">
                            <h3 className="text-lg font-semibold">{truncateTitle(quiz.title)}</h3>
                            <p className="text-gray-400">{quiz.description}</p>
                            <div className="flex flex-col mt-4">
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    onClick={() => handleViewQuiz(quiz.id)}
                                >
                                    View
                                </button>
                                <button
                                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    onClick={() => handlePlayQuiz(quiz.id)}
                                >
                                    Play
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={onNextPage}
                onPrevious={onPreviousPage}
            />
        </div>
    );
}
