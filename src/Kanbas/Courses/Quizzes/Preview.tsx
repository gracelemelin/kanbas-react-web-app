import { useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MultChoice from "./QuestionTypes/MultChoice";
import "./Preview.css"
import axios from "axios";

function QuizPreview() {

  let time = new Date().getTime().toString()

  const {courseId, qid} = useParams();

  const [i, seti] = useState(0)

  const [questions, setQuestions] = useState<any[]>([])

  const [quiz, setQuiz] = useState<any>({
    id: "0", title: "New Quiz", course: "", published: false
  });

  const API_BASE = process.env.REACT_APP_API_BASE;
  const COURSES_API = `${API_BASE}/api/courses`;

  const [settings, setSettings] = useState<any>({
    id: "0",
    quizType: "Graded Quiz",
    points: 100,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 30,
    multipleAttempts: false,
    showCorrectAnswers: true,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2024-05-15",
    availableDate: "2024-04-10",
    untilDate: "2024-05-31"
  })

  

  const findCourseQuizQuestions = async () => {
    console.log(`${COURSES_API}/${courseId}/quizzes/${qid}/questions`)
    const response = await axios.get(
        `${COURSES_API}/${courseId}/quizzes/${qid}/questions`
    );
    console.log(response.data)
    setQuestions(response.data);
    console.log(questions)
    setWait(true)
};

  const getQuizSettings = async () =>{
    const response = await axios.get(
      `${COURSES_API}/${courseId}/quizzes/${qid}/settings`
  );
  setSettings(response.data);
  }
  
  const getQuiz = async () => {
    const response = await axios.get(
        `${COURSES_API}/${courseId}/quizzes/${qid}`
    );
    setQuiz(response.data);
  }
  
 
  

  const previewQuestionsTF = () => {
    return <>
    <hr/>
      <input className="question" id="T" type="radio" name='TF' /> <label htmlFor="T"> True </label><br/>
      <hr/>
      <input className="question" id="F" type="radio" name='TF' /> <label htmlFor="F"> False </label>
    </>
  }

  const previewQuestionsMCB = (qas: any, type: any) => {
    switch (type) {
      case "multipleChoice":
        return <>
          {qas?.map((qa: any) => (
            <div>
              <hr/>
              <input type="checkbox" /><label>{qa.text}</label>
            </div>
          ))}</>
      case "fillInBlank":
        return <>
          {qas?.map((qa: any) => (
            <div>
              <hr/>
              <input type="text" />
            </div>
          ))}
        </>
      default:
        return;
    }
  }

  const allAtOnce = () => {
    return (
      <div>
        {questions.map((q, i) => (
          <div>
            Question {i}
            Points 1
            {q.question}
            {q.type === "trueFalse" ? previewQuestionsTF() : previewQuestionsMCB(q.answers, q.type)}
          </div>
        ))}
      </div>
    )
  }


  const oneAtATime = () => {
    let q = questions[i]
    return (
      <div style={{height : "50%", width : "50hx"}}>
        <div>
        Quiz Started: {time} <br />
          <div style={{backgroundColor: "lightgray"}}>
          Question {i + 1}
          Points 1 <br />
          </div>
          {q.question}
          {q.type === "trueFalse" ? previewQuestionsTF() : previewQuestionsMCB(q.answers, q.type)}
        </div>
        {i >= questions.length ? <div></div> : <button onClick={() => { seti(i + 1) }}> Next </button>}
        {i < 1 ? <div></div> : <button onClick={() => seti(i - 1)}> Prev </button>}
      </div>
    )
  }

  const [wait, setWait] = useState(false)

  useEffect(() => {
    getQuiz()
    getQuizSettings()
    findCourseQuizQuestions()
  },[])

  return (
    <div className="mt-4">
      <div>
      ({wait} ? {settings.oneQuestionAtATime ? oneAtATime() : allAtOnce()} : <div></div>)
      <button>Submit Quiz</button>
      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${qid}/Edit/Details`}><button>Keep Editing This Quiz</button></Link> 
      </div>
      <div className="Questions_List" style={{float: "right"}}>
      Questions
      <ul>{
        questions.map((q, ii) => (
          <ol className={ii === i ? "bold" : ""} onClick={() => { seti(ii) }}>
            Question {ii + 1}
          </ol>
        )
        )}</ul>
        </div>
    </div>
  )
}
export default QuizPreview