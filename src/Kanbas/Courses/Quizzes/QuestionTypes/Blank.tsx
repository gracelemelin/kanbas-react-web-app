import { useState } from "react";

function Blank(props: { question: any; sendBack: any; editable: any;}) {
    const { question, sendBack, editable } = props;
    const [anss, setAnss] = useState<any[]>([question.answers][0]);
    
    const addAns = () => {
        setAnss([...anss, ""]);
        sendBack(anss)
    }

    const setOneAnssText = async (index : any, value : any) => {
        const updateAnss = [...anss];
        updateAnss[index] = value;
        setAnss(updateAnss); 
        sendBack(updateAnss)
    }
    
    return (
        (editable ? 
        <div>
            Answers:
            <br/>
            {anss?.map((a, i) => <div><input onChange={(e) => setOneAnssText(i, e.target.value)} value={a}/><br/></div>)}
            <button className="mt-2 mb-1 ms-1" onClick={addAns} style={{borderRadius: "4px", backgroundColor: "green", color: "white"}}>+ Add Answer </button>
        </div>
        : 
        <div>
        Answers:
        <br/>
        {anss?.map((a, i) => <div>{a}</div>)}
    </div>)
        
    )
} export default Blank;