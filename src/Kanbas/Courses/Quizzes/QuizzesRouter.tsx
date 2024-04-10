import { Routes, Route, Navigate } from "react-router";
import { HashRouter } from "react-router-dom";
import Quizzes from ".";
import Details from "./Details";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionEditor from "./QuizQuestionEditor";

function QuizzesRouter() {
    return (
        <HashRouter>
            <>
                <Routes>
                    <Route path="/" element={<Navigate to="/Kanbas/Courses/:cid/Quizzes" />} />
                    <Route path="/Kanbas/Courses/:cid/Quizzes" element={<Quizzes />} />
                    <Route path="/Kanbas/Courses/:cid/Quizzes/:qid/Details" element={<Details />} />
                    <Route path="/Kanbas/Courses/:cid/Quizzes/:qid/Edit" element={<Navigate to="/Kanbas/Courses/:cid/Quizzes/:qid/Edit/Details" />} />
                    <Route path="/Kanbas/Courses/:cid/Quizzes/:qid/Edit/Details" element={<QuizDetailsEditor />} />
                    <Route path="/Kanbas/Courses/:cid/Quizzes/:qid/Edit/Questions" element={<QuizQuestionEditor />} />
                </Routes>
            </>
        </HashRouter>
    )
} export default QuizzesRouter;