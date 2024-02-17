import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt } from "react-icons/fa";

function KanbasNavigation() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" style={{ color: "red" }} /> },
    { label: "Courses", icon: <FaBook className="fs-2" style={{ color: "red" }} /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" style={{ color: "red" }} /> }
  ];

  const { pathname } = useLocation();

  return (
    <ul className="wd-kanbas-navigation">
      <Link to="https://www.northeastern.edu/"><img src="/images/nulogo.png" style={{ height: 80 }}/></Link>
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
        </li>
      ))}
    </ul>
  );
}
export default KanbasNavigation;