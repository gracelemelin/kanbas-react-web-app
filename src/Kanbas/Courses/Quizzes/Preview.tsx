import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Preview.css"
import axios from "axios";
import * as client from "../../../Users/client";

function QuizPreview() {

  const [time, setTime] = useState(new Date(Number(new Date())))

  const {courseId, qid} = useParams();

  const [i, seti] = useState(0)

  const [user, setUser] = useState<any>()

  const [questions, setQuestions] = useState<any[]>([])

  const [quiz, setQuiz] = useState<any>({
    id: "0", title: "New Quiz", course: "", published: false, numQuestions: 0
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
    setQuestions(response.data);
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
  
  const updateAnswerQTF = async (q : any, tf : any) => {
    const newq = {...q}
    const uas = newq["userAnswers"].filter((ua : any) => ua.userId !== user.id)
    newq["userAnswers"] = [...uas, {"userId" : user.id, "answer": tf}]
    const response = await axios.put(
     `${COURSES_API}/${courseId}/quizzes/${qid}/questions/${q.id}`, newq
    );
  
  findCourseQuizQuestions()
  
  }

  
  const updateAnswerQMC = async (q : any, mc : any) => {
    const newq = {...q}
    console.log()
    const uas = newq["userAnswers"].filter((ua : any) => ua.userId !== user.id)
    newq["userAnswers"] = [...uas, {"userId" : user.id, "answer": mc}]
    const response = await axios.put(
     `${COURSES_API}/${courseId}/quizzes/${qid}/questions/${q.id}`, newq
    );
    console.log(newq)
  findCourseQuizQuestions()
  
  }

  
  const updateAnswerQB = async (q : any, b : any) => {
    const newq = {...q}
    const uas = newq["userAnswers"].filter((ua : any) => ua.userId !== user.id)
    newq["userAnswers"] = [...uas, {"userId" : user.id, "answer": b}]
    const response = await axios.put(
     `${COURSES_API}/${courseId}/quizzes/${qid}/questions/${q.id}`, newq
    );
    console.log(newq)
  
  findCourseQuizQuestions()
  
  }


  const previewQuestionsTF = (question: any) => {
    const userAnswers = question.userAnswers
    let bool = false
    let userAns = false
    if (user) {
      const userAnsObj = userAnswers.filter((ua : any) => ua.userId === user.id)[0]
      if (userAnsObj) {
        userAns = userAnsObj.answer
        bool = true
      }
    }
    return <>
    <hr/>
      <input className="question" id="T" type="radio" name='TF' onChange={(e) => updateAnswerQTF(question, e.target.checked)} defaultChecked={bool && userAns}/> <label htmlFor="T"> True </label><br/>
      <hr/>
      <input className="question" id="F" type="radio" name='TF' onChange={(e) => updateAnswerQTF(question, !e.target.checked)} defaultChecked={bool && !userAns}/> <label htmlFor="F"> False </label>
    </>
  }

  const previewQuestionsMCB = (question : any) => {
    const answers = question.answers
    const type = question.type
    const userAnswers = question.userAnswers

    let bool = false
    let userAns = "";
    if (user) {
      const userAnsObj = userAnswers.filter((ua : any) => ua.userId === user.id)[0]
      console.log(userAnsObj)
      if (userAnsObj) {
        userAns = userAnsObj.answer
        bool = true
      }
    }
    switch (type) {
      case "multipleChoice":
        return <>
          {answers?.map((qa: any, iii : any) => (
            <div>
              <hr/>
              <input type="radio" name={`q${qa.id}`} onChange={(e) => updateAnswerQMC(question, iii)} defaultChecked={bool && iii === Number(userAns)}/><label>{qa.text}</label>
            </div>
          ))}</>
      case "fillInBlank":
        return <>
          {answers?.map((qa: any) => (
            <div>
              <hr/>
              <input type="text" onChange={(e) => updateAnswerQB(question, e.target.value)} defaultValue={userAns}/>
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
        Quiz Started: {String(time)} <br />
        {questions.map((q, i) => (
          <div className="questionPreview">
            <div className="previewHeader">
              Question {i + 1} &nbsp;
              Points {q.points}
            </div>
            {q.question}
            {q.type === "trueFalse" ? previewQuestionsTF(q) : previewQuestionsMCB(q)}
          </div>
        ))}
      </div>
    )
  }


  const oneAtATime = () => {
    const tempqs = questions.filter((_, index) => index === i);

    return (
      <div style={{height : "50%", width : "50hx"}}>        
        {tempqs.map((q) => (
          <div className="questionPreview">
            <div>
              Quiz Started: {String(time)} <br />
                <div className="previewHeader">
                Question {i + 1} &nbsp;
                Points {q.points} <br />
                </div>
                {q.question}
                {q.type === "trueFalse" ? previewQuestionsTF(q) : previewQuestionsMCB(q)}
              </div>

              {i < 1 ? <div></div> : <button onClick={() => seti(i - 1)}> Prev </button>}
              {i >= questions.length-1 ? <div></div> : <button onClick={() => { seti(i + 1) }}> Next </button>}
          </div>
        ))}
      </div>
    )
  }

  const [error, setError] = useState("")

  const getUser = async () => {

    try {
      const currUser = await client.profile();
      setUser(currUser)
  } catch (err: any) {
      setError(err.response.data.message);
  }
  }

  useEffect(() => {
    getUser()
    getQuiz()
    getQuizSettings()
    findCourseQuizQuestions()
  },[])

  return (
    <div className="mt-4">
      <div className="questionPreviewMain">
      {settings.oneQuestionAtATime ? oneAtATime() : allAtOnce()}
      
      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${qid}/Details`}><button className="me-2" style={{borderRadius: "4px", backgroundColor: "red", color: "white"}}>Submit Quiz</button></Link> 
      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${qid}/Edit/Details`}><button style={{borderRadius: "4px"}}>Keep Editing This Quiz</button></Link> 
      </div>
      <div className="Questions_List">
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