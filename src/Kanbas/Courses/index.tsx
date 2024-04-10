import { useParams, Navigate, Route, Routes } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import Quizzes from "./Quizzes";
import { useState, useEffect } from "react";
import axios from "axios";
import Details from "./Quizzes/Details";

function Courses() {
  const { courseId } = useParams();
  const loc = window.location.href;
  const API_BASE = process.env.REACT_APP_API_BASE;

  const l = loc?.substring(loc.lastIndexOf('/') + 1);
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}`
    );
    setCourse(response.data);
  };

  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);



  return (
    <div>
      <div className="flex-row-container d-none d-md-block">
        <div className="col ps-4 pt-1">
          <nav aria-label="breadcrumb">
            <h1>
              <p>
                <HiMiniBars3 /><span className="ps-3" style={{ color: "red" }}>Course: {course?.name} {courseId}</span> <span style={{ color: "darkgray" }}> {">"} </span> {l}
              </p>
            </h1>
          </nav>
        </div>
        <hr />
      </div>
      <p className="ps-3 d-none d-md-block" style={{ color: "gray" }}>{courseId}</p>
      <div className="d-none d-md-block">
        <CourseNavigation />
      </div>
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "200px", top: "50px" }} >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Grades" element={<h1>Grades</h1>} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qId/Details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;