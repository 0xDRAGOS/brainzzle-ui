import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import QuizList from "./partials/QuizList.jsx";
import {APP_API_URL} from "../../config.js"

export default function Quizzes() {
    const { isAuthenticated } = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const quizzesPerPage = 9;

    const fetchQuizzes = async (page = 0) => {
        const token = localStorage.getItem('token');

        try {
            console.log(APP_API_URL)
            const response = await fetch(`${APP_API_URL}/quiz/get-all/summaries?page=${page}&size=${quizzesPerPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                setError("Failed to fetch quizzes data.");
                setTimeout(() => {
                    setError('');
                }, 5000);
            }

            const data = await response.json();
            setQuizzes(data.content);
            setTotalPages(data.page.totalPages);
            setCurrentPage(data.page.number);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchQuizzes(currentPage);
        }
    }, [isAuthenticated, currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <AuthenticatedLayout header="Explore Quizzes">
            {isAuthenticated ? (
                <div className="flex justify-center items-center min-h-screen text-gray-300 my-8">
                    <QuizList
                        quizzes={quizzes}
                        error={error}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPreviousPage={handlePreviousPage}
                    />
                </div>
            ) : (
                <p className="text-gray-300 text-center text-2xl font-bold py-2 bg-slate-900 rounded mb-4">
                    You need to be logged in to view quizzes.
                </p>
            )}
        </AuthenticatedLayout>
    );
}
