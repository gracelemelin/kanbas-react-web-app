import ModuleList from "../Modules/List";
import { FaRegCalendarAlt, FaChartBar } from "react-icons/fa";
import { GoXCircle } from "react-icons/go";
import { CiCircleCheck, CiImport, CiBellOn } from "react-icons/ci";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LuImport, LuTarget, LuBarChartHorizontal } from "react-icons/lu";
import { MdOutlineAssignment } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { courses } from "../../Database";


function Home() {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);
  return (
    <div className="container-fluid">

      <div className="row">

        <div className="col-9">
          <ModuleList />
        </div>

        <div className="col-3 ms-2 d-none d-xl-block pt-5" style={{ width: "250px" }}>
          <h4>Course Status</h4>

          <div className="btn-group" role="group" style={{ paddingBottom: "10px" }}>
            <button type="button" className="btn btn-outline-dark"><GoXCircle/>Unpublish</button>
            <button type="button" className="btn btn-outline-dark" style={{ color: "green" }}><CiCircleCheck style={{ color: "green" }}/>Published</button>
          </div>

          <div className="btn-group-vertical" style={{ paddingBottom: "15px" }}>
            <button type="button" className="btn btn-outline-secondary" style={{ textAlign: "left" }}><CiImport/> Import Existing Content</button>
            <button type="button" className="btn btn-outline-secondary" style={{ textAlign: "left" }}><LuImport/> Import from Commons</button>
            <button type="button" className="btn btn-outline-secondary" style={{ textAlign: "left" }}><LuTarget/> Choose Home Page</button>
            <button type="button" className="btn btn-outline-secondary" style={{ textAlign: "left" }}><FaChartBar/> View Course Stream</button>
            <button type="button" className="btn btn-outline-secondary" style={{ textAlign: "left" }}><HiOutlineSpeakerphone/> New Announcement</button>
            <button type="button" className="btn btn-outline-secondary" style={{ textAlign: "left" }}><LuBarChartHorizontal/> New Analytics</button>
            <button type="button" className="btn btn-outline-secondary" style={{ textAlign: "left", whiteSpace: "nowrap" }}><CiBellOn/> View Course Notifications</button>
          </div>

          <div style={{ paddingBottom: "20px" }}>
            <h4>To Do</h4>
            <hr/>
            <Link to="#" style={{ color: "red", textDecoration: "none" }}><MdOutlineAssignment/> Grade A1</Link>
            <br />
            <Link to="#" style={{ color: "red", textDecoration: "none" }}><MdOutlineAssignment/> Grade Quiz 1</Link>
          </div>

          <div>
            <h4>Coming Up</h4>
            <hr/>
            <FaRegCalendarAlt />
            <Link to="#" style={{ color: "red" }}> View Calendar</Link>

            <ul className="wd-navigation">
              <li>
                <FaRegCalendarAlt />
                <Link to="#"> {courseId} Lecture</Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
export default Home;