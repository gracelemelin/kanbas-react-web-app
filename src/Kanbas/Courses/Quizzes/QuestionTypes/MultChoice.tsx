import { useState } from "react";

function MultChoice(props: { question: any; sendBack: any; editable : any}) {
    const { question, sendBack, editable } = props;
    const [anss, setAnss] = useState<any[]>(question.answers);

    const addAns = () => {
        setAnss([...anss, {text:"", isCorrect:false}]);
        sendBack(anss)
    }
    
    const deleteAns = (i : any) => {
        const tempanss = anss.filter((_, index) => index !== i);
        setAnss(tempanss);
        sendBack(tempanss)
    }


    const setOneAnssText = (index : any, value : any) => {
        const updateAnss = [...anss];
        updateAnss[index] = {...updateAnss[index], text: value};
        setAnss(updateAnss); 
        sendBack(updateAnss)
    }
    
    const setOneAnssCorr = (index : any) => {
        const updateAnss = [...anss];
        for (let i = 0; i < updateAnss.length; i++) {
            if (i === index) {
                updateAnss[i] = {...updateAnss[i], isCorrect: true};
            }
            else {
                updateAnss[i] = {...updateAnss[i], isCorrect: false};
            }
        }
        setAnss(updateAnss); 
        sendBack(updateAnss)
    }

    return (
        (editable ? 
            <div>
                Answers:
                <br/>
                {anss?.map((a, i) => <div><input onChange={(e) => setOneAnssText(i, e.target.value)} value={a.text}/> 
                                            &nbsp; <input type="radio" name={`mc${question._id}`} defaultChecked={a.isCorrect} onClick={() => setOneAnssCorr(i)} />
                                            <button onClick={() => deleteAns(i)}>Delete Answer</button>
                                            <br/></div>)}        
                <button className="mt-2 mb-1 ms-1" onClick={addAns} style={{borderRadius: "4px", backgroundColor: "green", color: "white"}}>+ Add Answer </button>
            </div>
            
        :
            
        <div>
            Answers:
            <br/>
            {anss?.map((a, i) => <div> {a.text} <input type="radio" disabled defaultChecked={a.isCorrect}/><br/></div>)}
        </div>
    )
    )
} export default MultChoice;