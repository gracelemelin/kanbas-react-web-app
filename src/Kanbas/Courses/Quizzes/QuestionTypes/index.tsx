import { Editor } from "@tinymce/tinymce-react";
import MultChoice from "./MultChoice";
import TrueFalse from "./TrueFalse";
import Blank from "./Blank";
import "./index.css";
import { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function QuestionTypes(props: { question: any; updateQuestion: any; deleteQuestion : any}) {
    const {question, updateQuestion, deleteQuestion} = props
    const API_KEY = process.env.TINYMCE_API;

    const API_BASE = process.env.REACT_APP_API_BASE;
    const COURSES_API = `${API_BASE}/api/courses`;
  

    const [tempQuestion, setTempQuestion] = useState(question)
    const [editing, setEditing] = useState(false)

    const {courseId, qid} = useParams();

    const handleAnswerChange = (ans : any) => {
        switch(question.type) {
            case "multipleChoice":
                const newqmc = question
                console.log(ans)
                newqmc.answers = ans
                setTempQuestion(newqmc)
                // updateQuestion(tempQuestion.id, tempQuestion)
                return;
            case "trueFalse":
                const newqtf = question
                newqtf.answer = ans
                setTempQuestion(newqtf)
                // updateQuestion()
                return;
            case "fillInBlank":
                const newqb = question
                newqb.answers = ans
                setTempQuestion(newqb)
                // updateQuestion()
                return;
            default:
                return;
        }
    }

    const renderSwitch = (type : any) => {
        switch(type) {
            case "trueFalse":
                return <TrueFalse question={question} sendBack={handleAnswerChange} editable={editing}/>;
            case "fillInBlank":
                return <Blank question={question} sendBack={handleAnswerChange} editable={editing}/>;
            default:
                return <MultChoice question={question} sendBack={handleAnswerChange} editable={editing}/>;
        }
    }

    const changeType = (type : String) => {
        const newq = question;
        switch(type) {
            case "trueFalse":
                newq["type"] = "trueFalse"
                delete question.answers
                newq["answer"] = true
                setTempQuestion(newq)
                renderSwitch(newq["type"])
                return;
            case "fillInBlank":
                newq["type"] = "fillInBlank"
                delete question.answers
                setTempQuestion(newq)
                // updateQuestion()
                renderSwitch(newq["type"])
                return;
            default:
                newq["type"] = "multipleChoice"
                delete question.answer
                setTempQuestion(newq)
                renderSwitch(newq["type"])
                return;
        }
    }
    
    const save = async () => {
        console.log(tempQuestion)
        console.log(`${COURSES_API}/api/courses/${courseId}/quizzes/${qid}/questions/${question._id}`)
        const response = await axios.put(
            `${COURSES_API}/${courseId}/quizzes/${qid}/questions/${question._id}`, tempQuestion
        )
        updateQuestion(question._id, tempQuestion);
        setEditing(false);
    }


    return (
        (editing ? 
            <div className="questionDisplay">
                <select onChange={(e) => changeType(e.target.value)} defaultValue={question.type}>
                    <option value="multipleChoice">Multiple Choice</option>
                    <option value="trueFalse">True/False</option>
                    <option value="fillInBlank">Fill in the Blank</option>
                </select> 
                &nbsp;Points: <input type="number" defaultValue={1} />
                <hr/>
                Enter your question.
                <Editor apiKey="gsnm8akbzb409mao7s6d7oyxeg6d2gq6tkhh5k88lmlp4018" value={question.question} init={{height: 200, width: 600}}/>
                {renderSwitch(question.type)} 
                <button className="ms-1" style={{borderRadius: "4px"}} onClick={() => {setEditing(false)}}>Cancel</button>
                <button className="ms-1" style={{borderRadius: "4px"}} onClick={() => {save()}}>Update Question</button>
                <button className="ms-1" style={{backgroundColor: "red", color: "white", borderRadius: "4px"}} onClick={() => {deleteQuestion(question._id)}}>Delete Question</button>
            </div>
            
             : 
            
             <div className="questionDisplay">
             <select onChange={(e) => changeType(e.target.value)} defaultValue={question.type}>
                 <option value="multipleChoice">Multiple Choice</option>
                 <option value="trueFalse">True/False</option>
                 <option value="fillInBlank">Fill in the Blank</option>
             </select> 
             &nbsp;Points: <input type="number" defaultValue={1} />
             <hr/>
             Enter your question.
             <Editor apiKey="gsnm8akbzb409mao7s6d7oyxeg6d2gq6tkhh5k88lmlp4018" value={question.question} init={{height: 200, width: 600}}/>
             {renderSwitch(question.type)} 
             <button className="ms-1" style={{borderRadius: "4px"}} onClick={() => {setEditing(true)}}>Edit Question</button>

         </div>)
    )
} export default QuestionTypes;