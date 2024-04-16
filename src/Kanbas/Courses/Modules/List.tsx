import React, { useState, useEffect } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaGlasses } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./modulesReducer";
import { KanbasState } from "../../store";
import * as client from "./client";


function ModuleList() {
  const { courseId } = useParams();
  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const moduleList = useSelector((state: KanbasState) =>
    state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) =>
    state.modulesReducer.module);
  const dispatch = useDispatch();

  const modulesList = modules.filter((module) => module.course === courseId);

  const [selectedModule, setSelectedModule] = useState(modulesList[0]);

  return (
    <div className="ps-1 pe-2 pt-5">
      <button className="button">Collapse All</button>
      <button className="button">View Progress</button>
      <select>
        <option>Publish All</option>
        <option>Publish All Modules and Items</option>
        <option>Publish Modules Only</option>
        <option>Unpublish All Modules</option>
      </select>
      <button className="button ms-1" style={{ color: "white", backgroundColor: "red" }}>+ Module</button>
      <FaEllipsisV />
      <button className="float-end" style={{ borderRadius: "4px" }}><FaGlasses /> Student View</button>
      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <input value={module.name} className="mb-1 ms-1 mt-1" style={{ width: "99%" }}
            onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}
          />
          <br />
          <textarea value={module.description} className="ms-1" style={{ width: "99%" }}
            onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))
            }
          />
          <br />
          <button className="btn btn-success ms-1 me-1 mb-1 p-1" style={{ borderRadius: "4px" }} onClick={handleAddModule}>Add</button>
          <button className="btn btn-info mb-1 p-1" style={{ borderRadius: "4px", color: "white" }} onClick={handleUpdateModule}>Update</button>
        </li>

        {moduleList
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => setSelectedModule(module)}>
              <button
                className="btn btn-success float-end p-1 mt-1 me-1"
                style={{ borderRadius: "4px" }}
                onClick={() => dispatch(setModule(module))}>
                Edit
              </button>
              <button
                className="btn btn-danger float-end p-1 mt-1 me-1"
                style={{ borderRadius: "4px" }}
                onClick={() => handleDeleteModule(module.id)}>
                Delete
              </button>
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {selectedModule._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson: any) => (
                    <li key={lesson.id} className="list-group-item">
                      <FaEllipsisV className="me-2" />
                      {lesson.name}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
export default ModuleList;