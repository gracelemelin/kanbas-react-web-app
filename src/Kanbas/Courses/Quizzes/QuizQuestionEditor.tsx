import QuizEditorNav from "./QuizEditorNav";
import { FaCheckCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import QuestionTypes from "./QuestionTypes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function QuizQuestionEditor() {
  const navigate = useNavigate()

  const API_BASE = process.env.REACT_APP_API_BASE;
  const COURSES_API = `${API_BASE}/api/courses`;

  const { courseId, qid } = useParams()

  const [questions, setQuestions] = useState<any[]>([])

  const [quiz, setQuiz] = useState({
    id: "0", title: "New Quiz", course: "", published: false, numQuestions: 0
  });

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

  const deleteQuestion = async (qqid: any) => {
    setQuestions(
      questions.filter((tq: any) => {
        if (tq.id !== qqid) {
          return tq;
        }
      })
    )
  }

  const addNewQuestion = async () => {
    const q = {
      id: "0",
      qzid: "0",
      title: "New Question",
      type: "multipleChoice",
      question: "",
      points: 0,
      answers: [],
      userAnswers: []
    };
    setQuestions([...questions, { ...q, id: new Date().getTime().toString(), qzid: qid }])
  }

  const updateQuestion = async (qqid: any, questionToUpdate: any) => {
    console.log(questions)
    setQuestions(
      questions.map((tq: any) => {
        if (tq.id === qqid) {
          return questionToUpdate
        }
        else {
          return tq
        }
      })
    )
  }


  const findCourseQuizQuestions = async () => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}/quizzes/${qid}/questions`
    );
    setQuestions(response.data);
  };

  const getQuizSettings = async () => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}/quizzes/${qid}/settings`
    );
    setSettings(response.data);
  }

  const handleSaveQuestions = async () => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}/quizzes/${qid}/questions`
    );

    const allBackEndQuestions = response.data

    const deletedQuestions = allBackEndQuestions.filter((q : any) => {
      return !questions.find(element => {
      return element.id === q.id;})})

    deletedQuestions.forEach(async(q : any) => {
      const response = await axios.delete(`${COURSES_API}/${courseId}/quizzes/${qid}/questions/${q.id}`)
    })
    
    questions.forEach(async(q) => {
      if (q._id) {
      const response = await axios.put(
        `${COURSES_API}/${courseId}/quizzes/${qid}/questions/${q.id}`, q)
      }
      else {
        const response = await axios.post(
          `${COURSES_API}/${courseId}/quizzes/${qid}/questions`, q)
      }

    })
  }

  
  const handleSave = async () => {
    const newQuiz = { ...quiz, numQuestions: questions.length }
    const qresponse = await axios.post(
        `${COURSES_API}/${courseId}/quizzes/${qid}`, newQuiz
    );

    // save quiz settings
    const pts = questions.reduce((sum, el) => sum += Number(el.points), 0);
    const newSetting = { ...quizSettings, points: Number(pts)}
    const sresponse = await axios.post(
        `${COURSES_API}/${courseId}/quizzes/${qid}/settings`, newSetting
    );

    setQuiz(newQuiz)
    setSettings(newSetting)
    await handleSaveQuestions()
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${qid}/Details`)
  };


  const cancel = async () => {
    findCourseQuizQuestions()
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
  }


  const handleSaveAndPublish = async () => {
    // save quiz
    const newQuiz = { ...quiz, published: true, numQuestions: questions.length }
    const qresponse = await axios.post(
      `${COURSES_API}/${courseId}/quizzes/${qid}`, newQuiz
    );

    // save quiz settings
    const pts = questions.reduce((sum, el) => sum += Number(el.points), 0);
    const newSetting = { ...quizSettings, points: Number(pts)}
    const sresponse = await axios.post(
        `${COURSES_API}/${courseId}/quizzes/${qid}/settings`, newSetting
    );


    setQuiz(newQuiz)
    setSettings(newSetting)
    await handleSaveQuestions()
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
  };

  const getQuiz = async () => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}/quizzes/${qid}`
    );
    setQuiz(response.data);
  }

  useEffect(() => {
    getQuiz();
    getQuizSettings();
    findCourseQuizQuestions();
  }, [])

  return (
    <div className="mt-5">
      Total Quiz Points: {quizSettings.points}
      {quiz.published ? <FaCheckCircle style={{ color: "green" }} /> : <FcCancel />}
      <hr />
      <QuizEditorNav />
      <button className="mt-3 mb-2" style={{ borderRadius: "4px" }} onClick={addNewQuestion}>+ New Question</button>
      <>
        {questions.map((q) => <QuestionTypes question={q} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} />)}</>
      <button className="mb-2 me-2" style={{ borderRadius: "4px" }} onClick={() => cancel()}>Cancel</button>
      <button style={{ borderRadius: "4px" }} className="mb-2 me-1" onClick={() => handleSaveAndPublish()}>Save & Publish</button>
      <button className="mb-2" style={{ backgroundColor: "red", color: "white", borderRadius: "4px" }} onClick={() => handleSave()}>Save</button>
    </div>
  )
} export default QuizQuestionEditor;
