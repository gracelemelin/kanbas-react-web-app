import { useState } from "react";

function Blank(props: { question: any; sendBack: any; }) {
    const { question, sendBack } = props;
    const [anss, setAnss] = useState<any[]>([question.answers][0]);
    
    const addAns = () => {
        setAnss([...anss, ""]);
    }

    const setOneAnssText = (index : any, value : any) => {
        const updateAnss = [...anss];
        updateAnss[index] = value;
        setAnss(updateAnss); 
    }
    
    return (
        <div>
            Answers:
            <br/>
            {anss?.map((a, i) => <div><input onChange={(e) => setOneAnssText(i, e.target.value)} value={a.text}/><br/></div>)}
            <button className="mt-2 mb-1 ms-1" onClick={addAns} style={{borderRadius: "4px", backgroundColor: "green", color: "white"}}>+ Add Answer </button>
        </div>
    )
} export default Blank;