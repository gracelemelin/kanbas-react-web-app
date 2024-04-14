import { useSelector } from "react-redux";
import { KanbasState } from "../../store";
import QuizEditorNav from "./QuizEditorNav";
import { FaCheckCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import QuestionTypes from "./QuestionTypes";

function QuizQuestionEditor() {
    const quiz = useSelector((state: KanbasState) =>
        state.quizReducer.quiz);

    const quizSettings = useSelector((state: KanbasState) =>
        state.quizReducer.quizsettings);

    const tempQuestions = [
        {
          id: 1,
          type: "multipleChoice",
          question: "What is React?",
          options: [
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
          answer: "JavaScript"
        },
        {
          id: 4,
          type: "multipleChoice",
          question: "What are the key features of React?",
          options: [
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
          answer: "State"
        },
        {
          id: 7,
          type: "trueFalse",
          question: "Props in React are read-only and passed from child to parent components.",
          answer: false
        }
        // Add more questions as needed
      ];

    return (
        <div>
            Points {quizSettings.points}
            {quiz.published ? <FaCheckCircle /> : <FcCancel />}
            <hr />
            <QuizEditorNav />
            <button>+ New Question</button>
            {tempQuestions.map((q) => QuestionTypes(q))}
        </div>
    )
} export default QuizQuestionEditor;