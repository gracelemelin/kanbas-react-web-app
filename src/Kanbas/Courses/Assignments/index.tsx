import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId);
  return (
    <div className="ps-1 pe-2 pt-2"
      style={{ left: "200px", top: "50px" }}>
      <div className="pt-5">
        <input type="text" placeholder="Search for Assignment" />
        <div className="float-end">
          <button className="m-1" style={{ borderRadius: "4px" }}>+Group</button>
          <button style={{ borderRadius: "4px", color: "white", backgroundColor: "red" }}>+Assignment</button>
          <FaEllipsisV className="ms-2" />
        </div>
        <hr />
      </div>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <span className="me-2 p-1" style={{ borderStyle: "solid", borderRadius: "20px", borderColor: "gray" }}>40% of Total</span>
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <FaEllipsisV className="me-2" />
                <Link
                  to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
              </li>))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
export default Assignments;