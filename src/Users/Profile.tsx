import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {

  const [profile, setProfile] = useState({
    username: "", password: "",
    firstName: "", lastName: "", dob: "", email: "", role: "USER"
  });
  const navigate = useNavigate();

  const save = async () => {
    await client.updateUser(profile);
  };

  const [error, setError] = useState("")

  const fetchProfile = async () => {
    let currUser = null;

    try {
      currUser = await client.profile();
      setProfile(currUser);
  } catch (err: any) {
      setError(err.response.data.message);
  }

    
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <div style={{width: 300}}>
          <label>Username&nbsp;</label>
          <input className="mb-1" value={profile.username} onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })} /> <br />
            <label>Password&nbsp;</label>
          <input className="mb-1" value={profile.password} onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })} /> <br />
            <label>First Name&nbsp;</label>
          <input className="mb-1" value={profile.firstName} onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })} /> <br />
            <label>Last Name&nbsp;</label>
          <input className="mb-1" value={profile.lastName} onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })} /> <br />
            <label>Date of Birth&nbsp;</label>
          <input className="mb-1" value={profile.dob} type="date" onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })} /> <br />
            <label>Email&nbsp;</label>
          <input className="mb-1" value={profile.email} onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })} /> <br />
            <label>Role&nbsp;</label>
          <select onChange={(e) =>
            setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select> <br/>
          <button className="btn btn-primary mt-1 me-1" onClick={save}>
            Save
          </button> 
          <button className="btn btn-danger mt-1" onClick={signout}>
            Signout
          </button> <br/>
          <Link to="/Kanbas/Account/Admin/Users"
            className="btn btn-warning mt-1">
            Users
          </Link>
        </div>
      )}
    </div>
  );
}