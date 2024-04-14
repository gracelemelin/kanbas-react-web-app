import {Link, useLocation} from "react-router-dom";

function QuizEditorNav() {
    const {pathname} = useLocation();
    const loc = window.location.href;
    const l = pathname?.substring(0, pathname.lastIndexOf('/'));
    return (
        <nav className="nav nav-tabs">
            <Link className={`nav-link ${pathname.includes("Details") ? "active" : ""}`} to={`${l}/Details`}>Details</Link>
            <Link className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`} to={`${l}/Questions`}>Questions</Link>
        </nav>
    )
} export default QuizEditorNav;