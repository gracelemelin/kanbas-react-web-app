import ModuleList from "../Modules/List";
import {FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt} from "react-icons/fa";


function Home() {
  return (
    <div>
      <h2>Home</h2>
      <ModuleList />
      <div className="col ms-4 d-none d-xl-block" style={{width: "225px"}}>
      <h4>Course Status</h4>

      <div className="btn-group" role="group" style={{paddingBottom: "10px"}}>
        <button type="button" className="btn btn-outline-dark"><i className="fa fa-times-circle-o" aria-hidden="true"></i>
          Unpublish</button>
        <button type="button" className="btn btn-outline-dark" style={{color: "green"}}><i className="fa fa-check-circle-o"
            style={{color: "green"}}></i> Published</button>
      </div>

      <div className="btn-group-vertical" style={{paddingBottom: "10px"}}>
        <button type="button" className="btn btn-outline-secondary" style={{textAlign: "left"}}><i className="fa fa-sign-in"
            aria-hidden="true"></i> Import Existing Content</button>
        <button type="button" className="btn btn-outline-secondary" style={{textAlign: "left"}}><i className="fa fa-upload"
            aria-hidden="true"></i> Import from Commons</button>
        <button type="button" className="btn btn-outline-secondary" style={{textAlign: "left"}}><i className="fa fa-bullseye"
            aria-hidden="true"></i> Choose Home Page</button>
        <button type="button" className="btn btn-outline-secondary" style={{textAlign: "left"}}><i className="fa fa-bar-chart"
            aria-hidden="true"></i> View Course Stream</button>
        <button type="button" className="btn btn-outline-secondary" style={{textAlign: "left"}}><i className="fa fa-bullhorn"
            aria-hidden="true"></i> New Announcement</button>
        <button type="button" className="btn btn-outline-secondary" style={{textAlign: "left"}}><i className="fa fa-bar-chart"
            aria-hidden="true"></i> New Analytics</button>
        <button type="button" className="btn btn-outline-secondary" style={{textAlign: "left"}}><i className="fa fa-bell-o"
            aria-hidden="true"></i> View Course Notifications</button>
      </div>

      <div style={{paddingBottom: "15px"}}>
        <h4>To Do</h4>
        
        <a href="#" style={{color: "red", textDecoration: "none"}}><i className="fa fa-list-ol" aria-hidden="true"></i> Grade
          A1</a>
        <br />
        <a href="#" style={{color: "red", textDecoration: "none"}}><i className="fa fa-list-ol" aria-hidden="true"></i> Grade
          Quiz 1</a>
      </div>

      <div>
        <h4>Coming Up</h4>
        <FaRegCalendarAlt/>
        <a href="#" style={{color: "red"}}> View Calendar</a>
        
        <ul className="wd-navigation">
          <li>
            <FaRegCalendarAlt/>
            <a href="#">Lecture CS4550 Sep 7 at 11:45am</a>
          </li>
          <li>
          <FaRegCalendarAlt/>
            <a href="#">Lecture CS4550 Sep 11 at 11:45am</a>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
}
export default Home;