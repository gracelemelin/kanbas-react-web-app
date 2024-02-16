import { useParams } from "react-router-dom";
import ModuleList from "./List";
import { courses } from "../../Database";
function Modules() {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);
  return (
    <div>
      <ModuleList />
    </div>
  );
}
export default Modules;