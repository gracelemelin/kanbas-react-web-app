import { Link } from "react-router-dom";

function HelloWorld() {
    return (
        <>
            <Link to="/Labs/a3">A3</Link> |
            <Link to="/Kanbas">Kanbas</Link> |
            <Link to="/hello">Hello</Link> |
            <h1>Hello World!</h1>
        </>
    )
};
export default HelloWorld;