import Home from "./pages/Home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ViewQuiz from "./pages/Quiz/ViewQuiz.jsx";
import CreateQuiz from "./pages/Quiz/CreateQuiz.jsx";
import UpdateQuiz from "./pages/Quiz/UpdateQuiz.jsx";
import MyQuizzes from "./pages/Quiz/MyQuizzes.jsx";

function App() {

  return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/quiz/view/:quizId" element={<ViewQuiz/>}/>
            <Route path="/quiz/create" element={<CreateQuiz/>}/>
            <Route path="/quiz/update/:quizId" element={<UpdateQuiz/>}/>
            <Route path="/myquizzes" element={<MyQuizzes/>}/>
        </Routes>
  )
}

export default App