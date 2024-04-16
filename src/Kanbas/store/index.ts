import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import quizReducer from "../Courses/Quizzes/reducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  quizReducer: {
    quiz: any;
    quizsettings : any;
    questions : any[]
  }
}
const store = configureStore({
  reducer: {
    modulesReducer,
    quizReducer
  }
});


export default store;