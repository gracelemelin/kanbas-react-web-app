import { Link, useLocation } from "react-router-dom";
import { FaBook, FaRegCalendarAlt, FaRegUserCircle, FaTachometerAlt } from "react-icons/fa";
import "./nav.css";

function KanbasNav() {

    const links = [
        { label: "Account", icon: <FaRegUserCircle className="fs-2" style={{ color: "red" }}/> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" style={{ color: "red" }} /> },
        { label: "Courses", icon: <FaBook className="fs-2" style={{ color: "red" }} /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" style={{ color: "red" }} /> }
    ];

    const { pathname } = useLocation();
    return (
        <div>
            <ul className="wd-nav">
                {links.map((link, index) => (
                    <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                        <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default KanbasNav;