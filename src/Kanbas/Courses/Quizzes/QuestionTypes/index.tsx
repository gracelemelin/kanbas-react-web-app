import { Editor } from "@tinymce/tinymce-react";
import MultChoice from "./MultChoice";
import TrueFalse from "./TrueFalse";
import Blank from "./Blank";
import "./index.css";
import { useState } from "react";

function QuestionTypes(question : any) {
    const [q, setQ] = useState(question);

    const renderSwitch = (type : any) => {
        switch(type) {
            case "multipleChoice":
                return <MultChoice element={type}/>;
            case "trueFalse":
                return <TrueFalse element={type} />;
            case "fillInBlank":
                return <Blank element={type}/>;
            default:
                return;
        }
    }
    return (
        <div className="questionDisplay">
            <input value="Question Title"/>
            <select>
                <option>Multiple Choice</option>
                <option>True/False</option>
                <option>Fill in the Blank</option>
            </select>
            pts: <input type="number" value={1}/>
            <hr/>
            Enter your question.
            <Editor apiKey="gsnm8akbzb409mao7s6d7oyxeg6d2gq6tkhh5k88lmlp4018" value={question.question} init={{height: 200, width: 600}}/>
            {renderSwitch(question.type)}
           
        </div>
    )
} export default QuestionTypes;