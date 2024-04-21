import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };

  const [error, setError] = useState("")
  
  const ifProfile = async() => {
    let currUser = null;

    try {
      currUser = await client.profile();
  } catch (err: any) {
      setError(err.response.data.message);
  }
    if (currUser) 
      {
        navigate("/Kanbas/Account/Profile");
      }
  }

  useEffect( ()=> {
    ifProfile()
  })

  return (
    <div>
      <h1>Sign In</h1>
      <div style={{width: 100}}>
        <label>Username &nbsp;</label>
        <input className="mb-1" value={credentials.username} onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })} /> <br />
        <label>Password &nbsp;</label>
        <input value={credentials.password} onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })} /> <br />
        <button className="btn btn-primary mt-1" style={{float: "right"}} onClick={signin}> Sign In </button> <br />
        <Link to="/Kanbas/Account/Signup"><button className="btn btn-warning mt-1" style={{float: "right"}}>Sign Up</button></Link>
      </div>
    </div>
  );
}