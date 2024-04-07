import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <div>
      <h1>Sign In</h1>
      <label>Username</label>
      <input value={credentials.username} onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })}/> <br/>
      <label>Password</label>
      <input value={credentials.password} onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })}/> <br/>
      <button className="btn btn-primary" onClick={signin}> Sign In </button>
    </div>
  );
}
