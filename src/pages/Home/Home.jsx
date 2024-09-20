import AuthenticatedLayout from "../../layouts/AuthenticatedLayout.jsx";
import PuzzleBrainImage from "../../assets/puzzlebrain.png";

export default function Home() {
    return (
        <AuthenticatedLayout>
            <div className="flex items-center justify-center min-h-screen">
                <img src={PuzzleBrainImage} alt="Puzzle Brain Image" className="size-1/3 mr-8"/>
                <div className="flex flex-col">
                    <h3 className="max-w-5xl text-white text-7xl font-semibold">Create Your Own Quiz and Master Your Knowledge</h3>
                    <p className="max-w-lg mt-6 text-gray-300">
                        Welcome to Brainzzle, the ultimate platform for creating personalized quizzes and sharpening your skills!
                        Whether you are a student, teacher, or lifelong learner, you can design custom quizzes and challenge yourself
                        or others. It is never been easier to train your brain and track your progress as you tackle new topics and
                        improve your knowledge. Start creating your quiz today and take your learning journey to the next level!
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>


    );
}