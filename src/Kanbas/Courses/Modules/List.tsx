import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaGlasses } from "react-icons/fa";
import { useParams } from "react-router";

function ModuleList() {
  const { courseId } = useParams();

  const [moduleList, setModuleList] = useState(modules);

  const modulesList = modules.filter((module) => module.course === courseId);

  const [module, setModule] = useState({
    name: "New Module",
    description: "New Description",
    course: courseId || "",
  });

  const [selectedModule, setSelectedModule] = useState(modulesList[0]);

  const addModule = (module: any) => {
    const newModule = { ...module,
      _id: new Date().getTime().toString() };
    const newModuleList = [newModule, ...moduleList];
    setModuleList(newModuleList);
  };

  const deleteModule = (moduleId: string) => {
    const newModuleList = moduleList.filter(
      (module) => module._id !== moduleId);
      setModuleList(newModuleList);
  };

  // const updateModule = () => {
  //   const newModuleList = moduleList.map((m) => {
  //     if (m._id === module._id) {
  //       return module;
  //     } else {
  //       return m;
  //     }
  //   });
  //   setModuleList(newModuleList);
  // };

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
          <button onClick={() => {addModule(module)}}>Add</button>
          <input value={module.name}
            onChange={(e) => setModule({
              ...module, name: e.target.value
            })}
          />
          <textarea value={module.description}
            onChange={(e) => setModule({
              ...module, description: e.target.value
            })}
          />
        </li>

        {moduleList
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => setSelectedModule(module)}>
                <button
                onClick={() => deleteModule(module._id)}>
                  Delete
                </button>
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <br/>
                {module.description}
                <br/>
                {module._id}
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {selectedModule._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson) => (
                    <li className="list-group-item">
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