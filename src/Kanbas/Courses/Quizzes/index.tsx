import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    const [settings, setSettings] = useState<any[]>([]);
    const [qs, setQS] = useState<any[]>([]);
    const [quiz, setQuiz] = useState({
        id: "0", title: "New Quiz", course: "", published: false
    });

    const combine = async () => {
        const tempqs = []
        for (let i = 0; i < quizzes.length; i++) {
            const newqs = {quiz: {...quizzes[i]}, settings: {...settings[i]}}
            tempqs.push(newqs)
        }
        setQS(tempqs)
    }

    //Finding all quizzes of a particular course
    const findCourseQuizzes = async () => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}/quizzes`
        );
        setQuizzes(response.data);

        const response2 = await axios.get(
            `${COURSES_API}/${courseId}/settings`
        );
        setSettings(response2.data)
        // combine()
    };

    useEffect(() => {
        findCourseQuizzes();
        // combine()
    }, []);

    const navigate = useNavigate();

    const createQuiz = async () => {
        const response = await axios.post(
            `${COURSES_API}/${courseId}/quizzes`, quiz
        );
        setQuizzes([...quizzes, response.data]);
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${response.data.id}/Edit/Details`)
    };

    const deleteQuiz = async (quizId: any) => {
        const response = await axios.delete(
            `${COURSES_API}/${courseId}/quizzes/${quizId}`
        );
        setQuizzes(quizzes.filter((q) => q._id !== quizId));
    };

    const updateQuizPublish = async (quizId: any) => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}/quizzes/${quizId}`
        );

        let quizToUpdate = response.data;

        const curPublished = quizToUpdate.published;
        
        quizToUpdate = {...quizToUpdate, published: !curPublished}

        const reponse2 = await axios.post(`${COURSES_API}/${courseId}/quizzes/${quizId}`, quizToUpdate)

        findCourseQuizzes()
    }

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
                        {quizzes.map((q,i) => (
                            <li className="list-group-item">
                                <FaEllipsisV className="me-2" />
                                <Link
                                    to={`${q.id}/Details`}>{q.title}</Link>
                                {/* {settings[i].dueDate} */}
                                <span className="float-end">
                                    <button onClick={() => updateQuizPublish(q.id)}>{q.published ? <FaCheckCircle style={{ color: "green" }} /> : <FcCancel />}</button>
                                    <button className="btn dropdown-toggle ms-1"
                                        type="button"
                                        style={{ borderRadius: "4px" }}
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"><FaEllipsisV /></button>
                                    <div className="dropdown-menu" aria-bs-labelledby="dropdownMenuButton">
                                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${q.id}/Edit/Details`}><button className="dropdown-item">Edit</button></Link>
                                        <button className="dropdown-item" onClick={(event) => {
                                            event.preventDefault();
                                            deleteQuiz(q._id);
                                        }}>Delete</button>
                                        <button onClick={() => updateQuizPublish(q.id)} className="dropdown-item">{q.published ? "Unpublish": "Publish"}</button>
                                    </div></span>
                            </li>))}
                    </ul>
                </li>
            </ul>
        </div>
    )
};
export default Quizzes;