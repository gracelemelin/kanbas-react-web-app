import { Editor } from "@tinymce/tinymce-react";
import MultChoice from "./MultChoice";
import TrueFalse from "./TrueFalse";
import Blank from "./Blank";
import "./index.css";
import { useState } from "react";

function QuestionTypes(question : any, setQuestions: any, updateQuestion : any) {
    const API_KEY = process.env.TINYMCE_API;

    const [q, setQ] = useState(question);

    const handleAnswerChange = (ans : any) => {
        switch(question.type) {
            case "multipleChoice":
                const newqmc = q
                newqmc.answers = ans
                updateQuestion()
                console.log(q)
                return;
            case "trueFalse":
                const newqtf = q
                newqtf.answer = ans
                updateQuestion()
                console.log(q)
                return;
            case "fillInBlank":
                const newqb = q
                newqb.answers = ans
                updateQuestion()
                console.log(q)
                return;
            default:
                return;
        }
    }

    const renderSwitch = (type : any) => {
        switch(type) {
            case "multipleChoice":
                console.log(q)
                return <MultChoice question={question} sendBack={handleAnswerChange}/>;
            case "trueFalse":
                console.log(q)
                return <TrueFalse question={question} sendBack={handleAnswerChange}/>;
            case "fillInBlank":
                console.log(q)
                return <Blank question={question} sendBack={handleAnswerChange}/>;
            default:
                return;
        }
    }

    const changeType = (type : String) => {
        const newq = q;
        switch(type) {
            case "multipleChoice":
                newq["type"] = "multipleChoice"
                delete q.answer
                // newq["answers"] = []
                updateQuestion()
                renderSwitch(newq["type"])
                return;
            case "trueFalse":
                newq["type"] = "trueFalse"
                delete q.answers
                newq["answer"] = true
                updateQuestion()
                renderSwitch(newq["type"])
                return;
            case "fillInBlank":
                newq["type"] = "fillInBlank"
                delete q.answer
                // newq["answers"] = []
                updateQuestion()
                renderSwitch(newq["type"])
                return;
            default:
                return;
        }
    }


    return (
        <div className="questionDisplay">
            <select onChange={(e) => changeType(e.target.value)} defaultValue={q.type}>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="trueFalse">True/False</option>
                <option value="fillInBlank">Fill in the Blank</option>
            </select>
            Points: <input type="number" defaultValue={1} />
            <hr/>
            Enter your question.
            <Editor apiKey="gsnm8akbzb409mao7s6d7oyxeg6d2gq6tkhh5k88lmlp4018" value={q.question} init={{height: 200, width: 600}}/>
            {renderSwitch(q.type)}
        </div>
    )
} export default QuestionTypes;