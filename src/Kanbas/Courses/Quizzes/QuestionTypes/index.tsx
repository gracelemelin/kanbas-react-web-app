import { Editor } from "@tinymce/tinymce-react";
import MultChoice from "./MultChoice";
import TrueFalse from "./TrueFalse";
import Blank from "./Blank";
import "./index.css";
import { useState } from "react";
import { useParams } from "react-router";

function QuestionTypes(props: { question: any; updateQuestion: any; deleteQuestion : any}) {
    const {question, updateQuestion, deleteQuestion} = props
    const API_KEY = process.env.TINYMCE_API;

    const API_BASE = process.env.REACT_APP_API_BASE;
    const COURSES_API = `${API_BASE}/api/courses`;
  
    const [tempQuestion, setTempQuestion] = useState(question)
    const [editing, setEditing] = useState(false)

    const {courseId, qid} = useParams();

    const handleAnswerChange = (ans : any) => {
        switch(tempQuestion.type) {
            case "multipleChoice":
                const newqmc = {...tempQuestion}
                newqmc.answers = ans
                setTempQuestion(newqmc)
                return;
            case "trueFalse":
                const newqtf = {...tempQuestion}
                newqtf.answer = ans
                setTempQuestion(newqtf)
                return;
            case "fillInBlank":
                const newqb = {...tempQuestion}
                newqb.answers = ans
                setTempQuestion(newqb)
                return;
            default:
                return;
        }
    }

    const renderSwitch = (type : any) => {
        switch(type) {
            case "trueFalse":
                return <TrueFalse question={tempQuestion} sendBack={handleAnswerChange} editable={editing}/>;
            case "fillInBlank":
                return <Blank question={tempQuestion} sendBack={handleAnswerChange} editable={editing}/>;
            default:
                return <MultChoice question={tempQuestion} sendBack={handleAnswerChange} editable={editing}/>;
        }
    }

    const changeType = (type : String) => {
        const newq = {...tempQuestion};
        switch(type) {
            case "trueFalse":
                newq["type"] = "trueFalse"
                delete newq.answers
                newq["answer"] = true
                newq["userAnswers"] = []
                setTempQuestion(newq)
                console.log(newq)
                renderSwitch(newq["type"])
                return;
            case "fillInBlank":
                newq["type"] = "fillInBlank"
                delete newq.answers
                delete newq.answer
                newq["answers"] = []
                newq["userAnswers"] = []
                setTempQuestion(newq)
                console.log(newq)
                renderSwitch(newq["type"])
                return;
            default:
                newq["type"] = "multipleChoice"
                delete newq.answer
                delete newq.answers
                newq["answers"] = []
                newq["userAnswers"] = []
                setTempQuestion(newq)
                console.log(newq)
                renderSwitch(newq["type"])
                return;
        }
    }
    
    const update = async () => {
        updateQuestion(question.id, tempQuestion);
        setEditing(false);
    }

    const updateTitle = async (title : any) => {
        const newq = tempQuestion
        newq['title'] = title
        setTempQuestion(newq)
    }
    const updatePoints = async (points : any) => {
        const newq = tempQuestion
        newq['points'] = points
        setTempQuestion(newq)
    }

    const cancel = async () => {
        setEditing(false)
        console.log(question)
        setTempQuestion(question)
    }
    
    const handleDescChange = (content : any, editor : any) => {
        setTempQuestion({...tempQuestion, question: content.substring(3, content.length - 4)})
     }

    return (
        (editing ? 
            <div className="questionDisplay">
                Question Title: <input type="text" onChange={(e) => updateTitle(e.target.value)} defaultValue={tempQuestion.title} />
                <select onChange={(e) => changeType(e.target.value)} defaultValue={tempQuestion.type}>
                    <option value="multipleChoice">Multiple Choice</option>
                    <option value="trueFalse">True/False</option>
                    <option value="fillInBlank">Fill in the Blank</option>
                </select> 
                &nbsp;Points: <input type="number" onChange={(e) => updatePoints(e.target.value)} defaultValue={tempQuestion.points} />
                <hr/>
                Enter your question.
                <Editor apiKey="gsnm8akbzb409mao7s6d7oyxeg6d2gq6tkhh5k88lmlp4018" value={tempQuestion.question}
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
                {renderSwitch(tempQuestion.type)} 
                <button className="ms-1" style={{borderRadius: "4px"}} onClick={() => {cancel()}}>Cancel</button>
                <button className="ms-1" style={{borderRadius: "4px"}} onClick={() => {update()}}>Update Question</button>
                <button className="ms-1" style={{backgroundColor: "red", color: "white", borderRadius: "4px"}} onClick={() => {deleteQuestion(question.id)}}>Delete Question</button>
            </div>
            
             : 
            
             <div className="questionDisplay" style={{backgroundColor: "lightgray"}}>
             Question Type: {tempQuestion.type} <br/>
             Question Title: {tempQuestion.title}<br/>
             Points:{tempQuestion.points}
             <hr/>
             {tempQuestion.question}
             {renderSwitch(tempQuestion.type)} 
             <button className="ms-1" style={{borderRadius: "4px"}} onClick={() => {setEditing(true)}}>Edit Question</button>

         </div>)
    )
} export default QuestionTypes;