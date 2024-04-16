import { useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MultChoice from "./QuestionTypes/MultChoice";
import "./Preview.css"

function QuizPreview() {

  let time = new Date().getTime().toString()

  // const quiz = useSelector((state: KanbasState) =>
  //     state.quizReducer.quiz);
  // const settings = useSelector((state: KanbasState) =>
  //     state.quizReducer.quizsettings);
  // const questions = useSelector((state: KanbasState) =>
  //     state.quizReducer.questions);

  const [i, seti] = useState(0)

  const [quiz, setQuiz] = useState<any>({
    _id: "0", title: "New Quiz", course: "", published: false
  });

  const [settings, setSettings] = useState<any>({
    _id: "0",
    quizType: "Graded Quiz",
    points: 100,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 30,
    multipleAttempts: false,
    showCorrectAnswers: true,
    accessCode: "1234",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2024-05-15",
    availableDate: "2024-04-10",
    untilDate: "2024-05-31"
  })

  const questions = [
    {
      id: 1,
      type: "multipleChoice",
      question: "What is React?",
      answers: [
        { text: "A JavaScript framework", isCorrect: false },
        { text: "A JavaScript library for building user interfaces", isCorrect: true },
        { text: "A programming language", isCorrect: false },
        { text: "A database management system", isCorrect: false }
      ]
    },
    {
      id: 2,
      type: "trueFalse",
      question: "JSX is a syntax extension for JavaScript used with React.",
      answer: true
    },
    {
      id: 3,
      type: "fillInBlank",
      question: "React is a _____ library for building user interfaces, developed by Facebook.",
      answers: ["JavaScript"]
    },
    {
      id: 4,
      type: "multipleChoice",
      question: "What are the key features of React?",
      answers: [
        { text: "Virtual DOM", isCorrect: true },
        { text: "One-way data flow", isCorrect: true },
        { text: "Two-way data binding", isCorrect: false },
        { text: "SQL database integration", isCorrect: false }
      ]
    },
    {
      id: 5,
      type: "trueFalse",
      question: "Components in React are reusable pieces of code that describe how a part of the user interface should look.",
      answer: true
    },
    {
      id: 6,
      type: "fillInBlank",
      question: "_____ is a built-in object used to store data that affects a component's behavior and appearance in React.",
      answers: ["State"]
    },
    {
      id: 7,
      type: "trueFalse",
      question: "Props in React are read-only and passed from child to parent components.",
      answer: false
    }
    // Add more questions as needed
  ];

  // const {cid, qid} = useParams();

  const oaat = settings.oneQuestionAtATime;

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
              <input type="checkbox" /><label>{qa}</label>
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

  useEffect(() => {

  })

  return (
    <div>
      <div >
      {oaat ? oneAtATime() : allAtOnce()}
      <button>Submit Quiz</button>
      <button>Keep Editing This Quiz</button>
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