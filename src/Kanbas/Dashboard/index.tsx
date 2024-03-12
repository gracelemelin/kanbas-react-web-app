import React from "react";
import { Link } from "react-router-dom";

function Dashboard(
  { mycourses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
      mycourses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
    }
) {

  return (
    <div className="p-4">
      <h1>Dashboard</h1>              <hr />
      <h5>Course</h5>
      <input value={course.name} className="form-control"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <input value={course.number} className="form-control"
        onChange={(e) => setCourse({ ...course, number: e.target.value })} />
      <input value={course.startDate} className="form-control" type="date"
        onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
      <input value={course.endDate} className="form-control" type="date"
        onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
      <div className="pt-2">
        <button onClick={addNewCourse} style={{ borderRadius: "4px", backgroundColor: "green", color: "white" }}>
          Add
        </button>
        <button className="ms-1" onClick={updateCourse} style={{ borderRadius: "4px" }}>
          Update
        </button>
      </div>

      <h2>Published Courses (3)</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {mycourses.map((course: any) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">
                <img src={`/images/${course.image}`} className="card-img-top"
                  style={{ height: 150 }} />
                <div className="card-body">
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                    {course.name} </Link>
                  <br />
                  <p className="card-text">{course._id} {course.name}</p>
                  <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                    Go </Link>

                  <button className="ms-1" style={{ borderRadius: "4px", backgroundColor: "red", color: "white", float: "right" }} onClick={(event) => {
                    event.preventDefault();
                    deleteCourse(course._id);
                  }}>
                    Delete
                  </button>

                  <button className="ms-1" style={{ borderRadius: "4px", float: "right" }} onClick={(event) => {
                    event.preventDefault();
                    setCourse(course);
                  }}>
                    Edit
                  </button>



                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
export default Dashboard;