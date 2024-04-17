import { useParams } from "react-router";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Details.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQuiz2, setQuizSettings2 } from "./reducer";

function Details() {
    const { courseId, qId } = useParams();
    const API_BASE = process.env.REACT_APP_API_BASE;
    const COURSES_API = `${API_BASE}/api/courses`;
    const dispatch = useDispatch();

    const [quiz, setQuiz] = useState<any>({
        _id: "0", title: "New Quiz", course: "", published: false
    });

    const [settings, setSettings] = useState<any>({
        _id: "0",
        quizType: "Graded Quiz",
        points: 100,
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 30,
        multipleAttempts: false,
        showCorrectAnswers: true,
        accessCode: "1234",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "2024-05-15",
        availableDate: "2024-04-10",
        untilDate: "2024-05-31"
    })

    const findQuiz = async () => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}/quizzes/${qId}`
        );
        console.log(response)
        setQuiz(response.data);
        dispatch(setQuiz2(response.data))
    };

    const findSettings = async () => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}/quizzes/${qId}/settings`
        );
        console.log(response)
        setSettings(response.data);
        dispatch(setQuizSettings2(response.data))
    }



    useEffect(() => {
        findQuiz();
        findSettings();
    }, []);

    return (
        <div>
            <div className="pt-5 pe-2" style={{float: "right"}} >
                <button className="btn btn-success"><FaRegCheckCircle /> Published</button>
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${qId}/Preview`}><button className="btn">Preview</button></Link> 
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${qId}/Edit/Details`}><button className="btn"><FaPencil /> Edit</button></Link> 
                <button className="btn"><FaEllipsisV /></button>
            </div>
            <div className="mt-4" style={{display: "flex", justifyContent: "center"}}>
                <table>
                    <tbody>
                        <tr>
                            <td className="tg-0pky">Quiz Type</td>
                            <td>   </td>
                            <td>{settings.quizType}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Points</td>
                            <td>   </td>
                            <td>{settings.points}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Assignment Group</td>
                            <td>   </td>
                            <td>{settings.assignmentGroup}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Shuffle Answers</td>
                            <td>   </td>
                            <td>{settings.shuffleAnswers ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Time Limit</td>
                            <td>   </td>
                            <td>{settings.timeLimit}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Multiple Attempts</td>
                            <td>   </td>
                            <td>{settings.multipleAttempts ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Show Correct Answeres</td>
                            <td>   </td>
                            <td>{settings.showCorrectAnswers ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Access Code</td>
                            <td>   </td>
                            <td>{settings.accessCode}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">One Question at a Time</td>
                            <td>   </td>
                            <td>{settings.oneQuestionAtATime ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Webcam Required</td>
                            <td>   </td>
                            <td>{settings.webcamRequired ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Lock Questions After Answering</td>
                            <td>   </td>
                            <td>{settings.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Due Date</td>
                            <td>   </td>
                            <td>{settings.dueDate}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Available Date</td>
                            <td>   </td>
                            <td>{settings.availableDate}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky">Until Date</td>
                            <td>   </td>
                            <td>{settings.untilDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
};
export default Details;