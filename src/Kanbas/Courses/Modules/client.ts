import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
  withCredentials: true
});

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;

export const updateModule = async (module : any) => {
    const response = await api.
      put(`${MODULES_API}/${module._id}`, module);
    return response.data;
  };  

export const deleteModule = async (moduleId : any) => {
  const response = await api
    .delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};


export const createModule = async (courseId : any, module : any) => {
    const response = await api.post(
      `${COURSES_API}/${courseId}/modules`,
      module
    );
    return response.data;
  };
  

export const findModulesForCourse = async (courseId : any) => {
  const response = await api
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
