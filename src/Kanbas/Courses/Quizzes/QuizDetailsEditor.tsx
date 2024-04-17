import { useDispatch, useSelector } from "react-redux";
import QuizEditorNav from "./QuizEditorNav";
import { KanbasState } from "../../store";
import { FcCancel } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { setQuiz2, setQuizSettings2 } from "./reducer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function QuizDetailsEditor() {
    
    const API_BASE = process.env.REACT_APP_API_BASE;
    const COURSES_API = `${API_BASE}/api/courses`;

    const { courseId, qid } = useParams();
    
    const dispatch = useDispatch()

    
    const [quiz, setQuiz] = useState<any>(useSelector((state: KanbasState) =>
        state.quizReducer.quiz));

    const [quizSettings, setSettings] = useState<any>(useSelector((state: KanbasState) =>
        state.quizReducer.quizsettings))

    const findQuiz = async () => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}/quizzes/${qid}`
        );
        setQuiz(response.data);
        dispatch(setQuiz2(response.data))
    };

    const findSettings = async () => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}/quizzes/${qid}/settings`
        );
        setSettings(response.data);
        dispatch(setQuizSettings2(response.data))
    }


    const navigate = useNavigate();
    const handleSave = async () => {
        const response = await axios.post(
            `${COURSES_API}/${courseId}/quizzes/${qid}/settings`, quizSettings
        );
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${qid}/Details`);
    };
    
    const handleSaveAndPublish = async () => {
        const newQuiz = {...quiz, published: true}
        const qresponse = await axios.post(
            `${COURSES_API}/${courseId}/quizzes/${qid}`, newQuiz
        );

        const sresponse = await axios.post(
            `${COURSES_API}/${courseId}/quizzes/${qid}/settings`, quizSettings
        );
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };

    const gettDateForInput = (date: Date) => {

        const dateObj = new Date(date);
        ////////////////////////////
        // fix
        ///////////////////////////////
        // get the month in this format of 04, the same for months
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const day = ("0" + dateObj.getDate()).slice(-2);
        const year = dateObj.getFullYear();
      
        const shortDate = `${year}-${month}-${day}`;
      
        return shortDate;
      };

    useEffect(() => {
        findQuiz();
        findSettings();
    }, []);

    return (
        <div>
            Total Quiz Points: {quizSettings.points}
            {quiz.published ? <FaCheckCircle/> : <FcCancel />}
            <hr/>
         <QuizEditorNav/>
         
         
         <input value={quiz.title}/> <br/>
         Quiz Instructions:
         <Editor apiKey="gsnm8akbzb409mao7s6d7oyxeg6d2gq6tkhh5k88lmlp4018"/> <br/>
         Quiz Type
         <select value={quizSettings.quizType} onChange={(e) => setSettings({ ...quizSettings, quizType: e.target.value })}>
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
         </select> <br/>
         Assignment Group
         <select value={quizSettings.assignmentGroup} onChange={(e) => setSettings({ ...quizSettings, assignmentGroup: e.target.value })}>
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Projects</option>
         </select> <br/>
         Options 
         <input defaultChecked={quizSettings.shuffleAnswers} type="checkbox" onChange={(e) => setSettings({ ...quizSettings, shuffleAnswers: !quizSettings.shuffleAnswers })}/>Shuffle Answers
         <input defaultChecked={quizSettings.multipleAttempts} type="checkbox"onChange={(e) => setSettings({ ...quizSettings, multipleAttempts:  e.target.value })}/> Allow Multiple attemps
         <input value={quizSettings.timeLimit} onChange={(e) => setSettings({ ...quizSettings, timeLimit:  e.target.value })}/> Time Limit
         <br/>
         Assign 
         <div>
          Due 
          <input value={gettDateForInput(quizSettings.dueDate)} type="date" onChange={(e) => setSettings({ ...quizSettings, dueDate:  e.target.value })}/><br/>
          Available From
          <input value={quizSettings.availableDate} type="date"onChange={(e) => setSettings({ ...quizSettings, availableDate:  e.target.value })} /><br/>
          Until
          <input value={quizSettings.untilDate} type="date"onChange={(e) => setSettings({ ...quizSettings, untilDate:  e.target.value })}/><br/>
         </div>
         <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}><button>Cancel</button></Link>
         <button onClick={handleSaveAndPublish}>Save & Publish</button>
         <button onClick={handleSave}>Save</button>
        </div>
       
    )
} export default QuizDetailsEditor;