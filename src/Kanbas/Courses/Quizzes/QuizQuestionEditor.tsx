import { useSelector } from "react-redux";
import { KanbasState } from "../../store";
import QuizEditorNav from "./QuizEditorNav";
import { FaCheckCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

function QuizQuestionEditor() {
    const quiz = useSelector((state: KanbasState) =>
        state.quizReducer.quiz);

    const quizSettings = useSelector((state: KanbasState) =>
        state.quizReducer.quizsettings);
    return (
        <div>
            Points {quizSettings.points}
            {quiz.published ? <FaCheckCircle /> : <FcCancel />}
            <hr />
            <QuizEditorNav />
            <button>+ New Question</button>
        </div>
    )
} export default QuizQuestionEditor;