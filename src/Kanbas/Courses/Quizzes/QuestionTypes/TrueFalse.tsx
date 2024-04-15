import { useState } from "react";

function TrueFalse(props: { question: any; sendBack: any; }) {
    const { question, sendBack } = props;
    const [tf, settf] = useState(question.answer);

    return (
        <div>
            Answer:
            <br />
            {tf ? "True" : "False"} <br/>
            <input className="question" id="T" type="radio" name='TF' onClick={() => settf(true)}/> <label htmlFor="T"> True </label>
            <input className="question" id="F" type="radio" name='TF' onClick={() => settf(false)} /> <label htmlFor="F"> False </label>
        </div>
    )
} export default TrueFalse;