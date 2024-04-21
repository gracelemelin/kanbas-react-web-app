import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
    const [error, setError] = useState("");
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(user);
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };
    return (
        <div>
            <h1>Sign Up</h1>
            {error && <div>{error}</div>}
            <div style={{width: 100}}>
                <label>Username&nbsp;</label>
                <input className="mb-1" value={user.username} onChange={(e) => setUser({
                    ...user, username: e.target.value
                })} /> <br />
                <label>Password&nbsp;</label>
                <input value={user.password} onChange={(e) => setUser({
                    ...user, password: e.target.value
                })} /> <br />
                <button className="btn btn-primary mt-1" style={{float: "right"}} onClick={signup}> Sign Up </button>
            </div>
        </div>
    );
}