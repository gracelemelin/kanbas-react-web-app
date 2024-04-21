import { useDispatch, useSelector } from "react-redux";
import QuizEditorNav from "./QuizEditorNav";
import { KanbasState } from "../../store";
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
        const qresponse = await axios.post(
            `${COURSES_API}/${courseId}/quizzes/${qid}`, quiz
        );

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

    const handleDescChange = (content : any, editor : any) => {
        setSettings({...setSettings, description: content.substring(3, content.length - 4)})
     }

    return (
        <div className="mt-5">
    
         <QuizEditorNav/>
         
         Quiz Title: <input defaultValue={quiz.title} className="mt-2" onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}/> <br/>
         Total Quiz Points: <input type="Number" min={0} max={100} defaultValue={quizSettings.points} onChange={(e) => setSettings({ ...quizSettings, points:  e.target.value })}/>
         <br/>
         Quiz Instructions:
         <Editor apiKey="gsnm8akbzb409mao7s6d7oyxeg6d2gq6tkhh5k88lmlp4018" value={quizSettings.description}
         init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help'
          }}
          onEditorChange={handleDescChange}/>
         <br/>
         Quiz Type &nbsp;
         <select value={quizSettings.quizType} onChange={(e) => setSettings({ ...quizSettings, quizType: e.target.value })}>
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
         </select> <br/>
         Assignment Group &nbsp;
         <select className="mt-2 mb-2" value={quizSettings.assignmentGroup} onChange={(e) => setSettings({ ...quizSettings, assignmentGroup: e.target.value })}>
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Projects</option>
         </select> <br/>
         Options <br/>
         <input defaultChecked={quizSettings.shuffleAnswers} type="checkbox" onChange={(e) => setSettings({ ...quizSettings, shuffleAnswers: e.target.checked })}/>Shuffle Answers <br/>
         <input defaultChecked={quizSettings.multipleAttempts} type="checkbox"onChange={(e) => setSettings({ ...quizSettings, multipleAttempts:  e.target.checked })}/> Allow Multiple Attempts <br/>
         <input className="mb-2" type="checkbox"/> Time Limit &nbsp;<input type="Number" min={0} max={240} defaultValue={quizSettings.timeLimit} onChange={(e) => setSettings({ ...quizSettings, timeLimit:  e.target.value })}/> Minutes
         <br/>
         <input defaultChecked={quizSettings.showCorrectAnswers} type="checkbox" onChange={(e) => setSettings({ ...quizSettings, showCorrectAnswers: e.target.checked })}/>Show Correct Answers <br/>
         <input defaultValue={quizSettings.accessCode} type="text" onChange={(e) => setSettings({ ...quizSettings, accessCode: e.target.value })}/>Access Code <br/>
         <input defaultChecked={quizSettings.oneQuestionAtATime} type="checkbox" onChange={(e) => setSettings({ ...quizSettings, oneQuestionAtATime: e.target.checked })}/>One Question At A Time <br/>
         <input defaultChecked={quizSettings.webcamRequired} type="checkbox" onChange={(e) => setSettings({ ...quizSettings, webcamRequired: e.target.checked })}/>Webcam Required<br/>
         <input defaultChecked={quizSettings.lockQuestionsAfterAnswering} type="checkbox" onChange={(e) => setSettings({ ...quizSettings, lockQuestionsAfterAnswering: e.target.checked })}/>Lock Questions After Answering<br/>
         <div>
          Due <br/>
          <input value={gettDateForInput(quizSettings.dueDate)} type="date" onChange={(e) => setSettings({ ...quizSettings, dueDate: e.target.value })}/><br/>
          Available From <br/>
          <input value={quizSettings.availableDate} type="date"onChange={(e) => setSettings({ ...quizSettings, availableDate:  e.target.value })} /><br/>
          Until <br/>
          <input className="mb-2" value={quizSettings.untilDate} type="date"onChange={(e) => setSettings({ ...quizSettings, untilDate:  e.target.value })}/><br/>
         </div>
         <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}><button className="mb-2 me-2" style={{borderRadius: "4px"}}>Cancel</button></Link>
         <button style={{borderRadius: "4px"}} className="mb-2 me-1" onClick={handleSaveAndPublish}>Save & Publish</button>
         <button className="mb-2" style={{backgroundColor: "red", color: "white", borderRadius: "4px"}} onClick={handleSave}>Save</button>
        </div>
       
    )
} export default QuizDetailsEditor;