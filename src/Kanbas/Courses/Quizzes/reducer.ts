import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [] as any,
    quiz: {
        _id: "0", title: "New Quiz", course: "", published: false
    },
    quizsettings: {
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
    }
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuiz2: (state, action) => {
            state.quiz = action.payload;
        },

        setQuizSettings2: (state, action) => {
            state.quizsettings = action.payload;
        },

        setQuestions2: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, action) => {
            state.questions = [
              { ...action.payload, _id: new Date().getTime().toString() },
                ...state.questions,
            ];
          },
    }
});

export const {
    setQuiz2,setQuizSettings2,setQuestions2, addQuestion
} = quizSlice.actions;
export default quizSlice.reducer;