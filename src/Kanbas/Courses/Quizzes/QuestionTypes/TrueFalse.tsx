import { useState } from "react";

function TrueFalse(props: { question: any; sendBack: any; editable : any}) {
    const { question, sendBack, editable } = props;
    const [tf, settf] = useState(question.answer);

    const switchTF = async (b : any) => {
        settf(b)
        sendBack(b)
    }

    return (
        (editable ? 
            <div>
                Answer:
                <br />
                {tf ? "True" : "False"} <br/>
                <input className="question" id="T" type="radio" name='TF' onClick={() => switchTF(true)}  /> <label htmlFor="T"> True </label> <br/>
                <input className="question" id="F" type="radio" name='TF' onClick={() => switchTF(false)} defaultChecked/> <label htmlFor="F"> False </label>
            </div> 
            :
            
        <div>
            Answer:
            <br />
            {tf ? "True" : "False"} <br/>
        </div>
        )
    )
} export default TrueFalse;