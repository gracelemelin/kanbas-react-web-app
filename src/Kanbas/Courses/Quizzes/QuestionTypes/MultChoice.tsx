import { useState } from "react";

function MultChoice(props: { question: any; sendBack: any; }) {
    const { question, sendBack } = props;
    const [anss, setAnss] = useState<any[]>([question.answers][0]);

    const addAns = () => {
        setAnss([...anss, {}]);
        sendBack(anss)
    }

    const setOneAnssText = (index : any, value : any) => {
        const updateAnss = [...anss];
        updateAnss[index] = {...updateAnss[index], text: value};
        setAnss(updateAnss); 
        sendBack(anss)
    }
    
    const setOneAnssCorr = (index : any, value : any) => {
        const updateAnss = [...anss];
        updateAnss[index] = {...updateAnss[index], isCorrect: value};
        setAnss(updateAnss); 
        sendBack(anss)
    }

    return (
        <div>
            Answers:
            <br/>
            {anss?.map((a, i) => <div><input onChange={(e) => setOneAnssText(i, e.target.value)} value={a.text}/> 
                                        <input type="checkbox" onChange={(e) => setOneAnssCorr(i, e.target.value)} defaultChecked={a.isCorrect}/><br/></div>)}
            <button onClick={addAns}>Add Answer + </button>
        </div>
    )
} export default MultChoice;