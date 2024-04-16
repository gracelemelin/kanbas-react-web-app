import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import Account from "./Account";

axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE;

function Kanbas() {
  const { pathname } = useLocation();

  const [mycourses, setCourses] = useState<any[]>([]);
  const COURSES_API = `${API_BASE}/api/courses`;

  const [course, setCourse] = useState({
    _id: "0", id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "reactjs.webp"
  });

  const updateCourse = async () => {
    const response = await axios.put(
      `${COURSES_API}/${course.id}`,
      course
    );
    setCourses(
      mycourses.map((c) => {
        if (c.id === course.id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  const addNewCourse = async () => {
    mycourses.map((c) => {
      if (c.id === course.id) {
        return course;
      }
    })
    const newCourse = { ...course, id: new Date().getTime().toString() };
    const response = await axios.post(COURSES_API, newCourse);
    setCourses([...mycourses, response.data]);
  };

  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);


  const deleteCourse = async (courseId: any) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );
    setCourses(mycourses.filter((course) => course._id !== courseId));
  };




  return (
    <Provider store={store}>
      <div className="d-flex">
        <div className={pathname.includes("Home") ? "d-none d-md-block" : ""}>
          <KanbasNavigation />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="Dashboard" element={
              <Dashboard
                mycourses={mycourses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse} />
            } />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </Provider>

  );
}
export default Kanbas