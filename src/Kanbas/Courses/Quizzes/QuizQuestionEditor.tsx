import { useSelector } from "react-redux";
import { KanbasState } from "../../store";
import QuizEditorNav from "./QuizEditorNav";
import { FaCheckCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import QuestionTypes from "./QuestionTypes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "./reducer"
import axios from "axios";
import { useParams } from "react-router-dom";

function QuizQuestionEditor(){

  const API_BASE = process.env.REACT_APP_API_BASE;
  const COURSES_API = `${API_BASE}/api/courses`;

    const {cid, qid} = useParams()

    const [questions, setQuestions] = useState<any[]>([])

    const [quiz, setQuiz] = useState({
      id: "0", title: "New Quiz", course: "", published: false});

    const [quizSettings, setSettings] = useState({
      id: "0",
      quizType: "Graded Quiz",
      points: 100,
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      showCorrectAnswers: true,
      accessCode: "1234",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "2024-05-15",
      availableDate: "2024-04-10",
      untilDate: "2024-05-31"
  });

    const deleteQuestion = async (qqid : any) => {
      const response = await axios.delete(`${COURSES_API}/${cid}/quizzes/${qid}/questions/${qqid}`)
      setQuestions(
        questions.filter((tq : any) => {
          if (tq._id !== qqid){
            return tq;
        }})
      )
    } 

    const addNewQuestion = async () => {
      const q = {
            id: "0",
            qzid: "0",
            type: "multipleChoice",
            question: "",
            answers: []};
      const response = await axios.post(`${COURSES_API}/${cid}/quizzes/${qid}/questions`, q)
      setQuestions([...questions, {...q, id: new Date().getTime().toString(), qzid: qid}])
    }

    const updateQuestion = async (qqid : any, questionToUpdate : any) => {
      console.log(questions)
      const response = await axios.put(
        `${COURSES_API}/${cid}/quizzes/${qid}/questions/${qqid}`, questionToUpdate)
      setQuestions(
        questions.map((tq : any) => {
          if (tq._id === qqid){
            return questionToUpdate
          }
          else{
            return tq
          }
        })
      )
    }


    const findCourseQuizQuestions = async () => {
      const response = await axios.get(
          `${COURSES_API}/${cid}/quizzes/${qid}/questions`
      );
      setQuestions(response.data);
  };
  
  const getQuizSettings = async () =>{
    const response = await axios.get(
      `${COURSES_API}/${cid}/quizzes/${qid}/settings`
  );
  setSettings(response.data);
  }
  
  const getQuiz = async () => {
    const response = await axios.get(
        `${COURSES_API}/${cid}/quizzes/${qid}`
    );
    setQuiz(response.data);
  }
  
    useEffect(() => {
      getQuiz();
      getQuizSettings();
      findCourseQuizQuestions();
    },[])

    return (
        <div className="mt-5">
            Total Quiz Points: {quizSettings.points}
            {quiz.published ? <FaCheckCircle style={{color: "green"}}/> : <FcCancel />}
            <hr />
            <QuizEditorNav />
            <button className="mt-3 mb-2" style={{borderRadius: "4px"}} onClick={addNewQuestion}>+ New Question</button>
            <>
            {questions.map((q) => <QuestionTypes question={q} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion}/>)}</>
            <button>Cancel</button>
            <button>Save & Publish</button>
            <button>Save</button>
        </div>
    )
} export default QuizQuestionEditor;
