import { FaEllipsisV } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FcCancel } from "react-icons/fc";
import Details from "./Details";
import 'bootstrap/dist/js/bootstrap.js';

function Quizzes() {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const COURSES_API = `${API_BASE}/api/courses`;

    const { courseId } = useParams();
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [quiz, setQuiz] = useState({
        _id: "0", title: "New Quiz", course: "", published: false
    });

    //Finding all quizzes of a particular course
    const findCourseQuizzes = async () => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}/quizzes`
        );
        setQuizzes(response.data);
    };

    useEffect(() => {
        findCourseQuizzes();
    }, []);

    const createQuiz = async () => {
        const response = await axios.post(
            `${COURSES_API}/${courseId}/quizzes`, quiz
        );
        setQuizzes([...quizzes, response.data]);
    };

    const deleteQuiz = async (quizId: any) => {
        const response = await axios.delete(
            `${COURSES_API}/${courseId}/quizzes/${quizId}`
        );
        setQuizzes(quizzes.filter((q) => q._id !== quizId));
    };

    return (
        <div className="ps-1 pe-2 pt-2"
            style={{ left: "200px", top: "50px" }}>
            <div className="pt-5">
                <input type="text" placeholder="Search for Quiz" />
                <div className="float-end">
                    <button className="btn" onClick={createQuiz} style={{ borderRadius: "4px", color: "white", backgroundColor: "red" }}>+ Quiz</button>
                    <FaEllipsisV />
                </div>
                <hr />
            </div>
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <FaEllipsisV className="me-2" /> ASSIGNMENT QUIZZES
                    </div>
                    <ul className="list-group">
                        {quizzes.map((q) => (
                            <li className="list-group-item">
                                <FaEllipsisV className="me-2" />
                                <Link
                                    to={`${q._id}/Details`}>{q.title}</Link>
                                <span className="float-end">
                                    <FcCancel />
                                    <button className="btn dropdown-toggle ms-1"
                                        type="button"
                                        style={{ borderRadius: "4px" }}
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"><FaEllipsisV /></button>
                                    <div className="dropdown-menu" aria-bs-labelledby="dropdownMenuButton">
                                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${q._id}/Edit/Details`}><button className="dropdown-item">Edit</button></Link> 
                                        <button className="dropdown-item" onClick={(event) => {
                                            event.preventDefault();
                                            deleteQuiz(q._id);
                                        }}>Delete</button>
                                         <button className="dropdown-item">Publish</button>
                                    </div></span>
                            </li>))}
                    </ul>
                </li>
            </ul>
        </div>
    )
};
export default Quizzes;