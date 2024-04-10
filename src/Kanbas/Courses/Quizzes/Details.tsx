import { useParams } from "react-router";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

function Details() {
    const { courseId, qId } = useParams();
    const API_BASE = process.env.REACT_APP_API_BASE;
    const COURSES_API = `${API_BASE}/api/courses`;

    const [quiz, setQuiz] = useState<any>({
        _id: "0", title: "New Quiz"
    });

    const findQuiz = async () => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}/quizzes/${qId}`
        );
        setQuiz(response.data);
    };

    useEffect(() => {
        findQuiz();
    }, [quiz]);

    return (
        <div>
            <div className="pt-5 pe-2" style={{ float: "right" }}>
                <button className="btn btn-success"><FaRegCheckCircle /> Published</button>
                <button className="btn">Preview</button>
                <button className="btn"><FaPencil /> Edit</button>
                <button className="btn"><FaEllipsisV /></button>
            </div>
            <div>
                {quiz.title} 
            </div>
        </div>

    )
};
export default Details;