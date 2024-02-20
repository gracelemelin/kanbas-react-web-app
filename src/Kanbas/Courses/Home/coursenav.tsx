import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import "./nav.css";
import { FaHome, FaLink, FaClipboardList, FaBook } from "react-icons/fa";
import { MdOutlineViewModule } from "react-icons/md";
import { courses } from "../../Database";

function CourseNav() {
    const { courseId } = useParams();
    const course = courses.find((course) => course._id === courseId);

    const links = [
        { label: "Home", icon: <FaHome className="fs-2"/> },
        { label: "Modules", icon: <MdOutlineViewModule className="fs-2" /> },
        { label: "Piazza", icon: <FaLink className="fs-2" /> },
        { label: "Grades", icon: <FaClipboardList className="fs-2" /> },
        { label: "Assignments", icon: <FaBook className="fs-2" /> }
    ];
    const { pathname } = useLocation();
    return (
        <div>
            <ul className="wd-nav">
                {links.map((link, index) => (
                    <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                        <Link to={`/Kanbas/Courses/${courseId}/${link.label}`}> {link.icon} {link.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseNav;