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

    const quiz = useSelector((state: KanbasState) =>
        state.quizReducer.quiz);

    const quizSettings = useSelector((state: KanbasState) =>
        state.quizReducer.quizsettings);


    const [q, setQ] = useState( {
        id: "0",
        qzid: "0",
        type: "multipleChoice",
        question: "",
        answers: []});

    const deleteQuestion = async (qqid : any) => {
      const response = await axios.delete(`${COURSES_API}/${cid}/quizzes/${qid}/questions/${qqid}`)
    } 

    const addNewQuestion = async () => {
      const response = await axios.post(`${COURSES_API}/${cid}/quizzes/${qid}/questions`, q)
      setQuestions([...questions, {...q, id: new Date().getTime().toString(), qzid: qid}])
    }

    const updateQuestion = async () => {
      console.log(questions)
      const response = await axios.put(
        `${COURSES_API}/${cid}/quizzes/${qid}/questions/${q.id}`, q)
      setQuestions(
        questions.map((tq : any) => {
          if (tq.id === q.id){
            return q
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
    
    useEffect(() => {
      findCourseQuizQuestions();
    },[])

    return (
        <div className="mt-5">
            Total Quiz Points: {quizSettings.points}
            {quiz.published ? <FaCheckCircle style={{color: "green"}}/> : <FcCancel />}
            <hr />
            <QuizEditorNav />
            <button className="mt-3 mb-2" style={{borderRadius: "4px"}} onClick={addNewQuestion}>+ New Question</button>
            {questions.map((q) => QuestionTypes(q, updateQuestion, deleteQuestion))}
        </div>
    )
} export default QuizQuestionEditor;
