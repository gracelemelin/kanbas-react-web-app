import { Editor } from "@tinymce/tinymce-react";
import MultChoice from "./MultChoice";
import TrueFalse from "./TrueFalse";
import Blank from "./Blank";
import "./index.css";
import { useState } from "react";

function QuestionTypes(question : any, updateQuestion : any, deleteQuestion : any) {
    const API_KEY = process.env.TINYMCE_API;


    const handleAnswerChange = (ans : any) => {
        switch(question.type) {
            case "multipleChoice":
                const newqmc = question
                newqmc.answers = ans
                updateQuestion()
                return;
            case "trueFalse":
                const newqtf = question
                newqtf.answer = ans
                updateQuestion()
                return;
            case "fillInBlank":
                const newqb = question
                newqb.answers = ans
                updateQuestion()
                return;
            default:
                return;
        }
    }

    const renderSwitch = (type : any) => {
        switch(type) {
            case "trueFalse":
                return <TrueFalse question={question} sendBack={handleAnswerChange}/>;
            case "fillInBlank":
                return <Blank question={question} sendBack={handleAnswerChange}/>;
            default:
                return <MultChoice question={question} sendBack={handleAnswerChange}/>;
        }
    }

    const changeType = (type : String) => {
        const newq = question;
        switch(type) {
            case "trueFalse":
                newq["type"] = "trueFalse"
                delete question.answers
                newq["answer"] = true
                updateQuestion()
                renderSwitch(newq["type"])
                return;
            case "fillInBlank":
                newq["type"] = "fillInBlank"
                delete question.answer
                // newq["answers"] = []
                updateQuestion()
                renderSwitch(newq["type"])
                return;
            default:
                newq["type"] = "multipleChoice"
                delete question.answer
                // newq["answers"] = []
                updateQuestion()
                renderSwitch(newq["type"])
                return;
        }
    }


    return (
        <div className="questionDisplay">
            <select onChange={(e) => changeType(e.target.value)} defaultValue={question.type}>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="trueFalse">True/False</option>
                <option value="fillInBlank">Fill in the Blank</option>
            </select>
            Points: <input type="number" defaultValue={1} />
            <hr/>
            Enter your question.
            <Editor apiKey="gsnm8akbzb409mao7s6d7oyxeg6d2gq6tkhh5k88lmlp4018" value={question.question} init={{height: 200, width: 600}}/>
            {renderSwitch(question.type)} 
            <button onClick={() => {deleteQuestion(question.id)}}>Delete Question</button>
        </div>
    )
} export default QuestionTypes;