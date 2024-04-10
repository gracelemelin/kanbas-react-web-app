import { useSelector } from "react-redux";
import QuizEditorNav from "./QuizEditorNav";
import { KanbasState } from "../../store";
import { FcCancel } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";

function QuizDetailsEditor() {

    const quiz = useSelector((state: KanbasState) =>
    state.quizReducer.quiz);

    const quizSettings = useSelector((state: KanbasState) =>
        state.quizReducer.quizsettings);

    return (
        <div>
            Points {quizSettings.points}
            {quiz.published ? <FaCheckCircle/> : <FcCancel />}
            <hr/>
         <QuizEditorNav/>
         <input value={quiz.title}/> <br/>
         Quiz Instructions:
         <textarea/> <br/>
         Quiz Type
         <select>
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
         </select> <br/>
         Assignment Group
         <select>
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Projects</option>
         </select> <br/>
         Options 
         <input type="checkbox"/>Shuffle Answers
         <input type="checkbox"/>Time Limit
         <input type="checkbox"/>Allow Multiple attemps
         <input value={quizSettings.timeLimit}/> <br/>
         Assign 
         <div>
          Due 
          <input type="date"></input><br/>
          Available From
          <input type="date"></input><br/>
          Until
          <input type="date"></input><br/>
         </div>
         <button>Cancel</button>
         <button>Save & Publish</button>
         <button>Save</button>
        </div>
       
    )
} export default QuizDetailsEditor;