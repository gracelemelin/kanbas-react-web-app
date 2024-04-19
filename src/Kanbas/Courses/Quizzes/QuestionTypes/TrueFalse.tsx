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
                <input className="question" id="T" type="checkbox" name='TF' onChange={(e) => switchTF(e.target.checked)} defaultChecked={tf}  /> <label htmlFor="T"> True </label> <br/>
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