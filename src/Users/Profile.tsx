import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile() {

  const LOG_IN_PAGE = "/Kanbas/Account/Signin";
    
  const [profile, setProfile] = useState({ username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER" });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const profile = await client.profile();
      console.log("current profile:", profile);
      setProfile(profile);
    } catch (err) {
      navigate(LOG_IN_PAGE);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    const save = async () => {
      await client.updateUser(profile);
    };
  }, []);
 
  return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <div>
          <label>Username</label> 
          <input value={profile.username} onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })}/> <br/>
          <input value={profile.password} onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })}/> <br/>
          <input value={profile.firstName} onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })}/> <br/>
          <input value={profile.lastName} onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })}/> <br/>
          <input value={profile.dob} type="date" onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })}/> <br/>
          <input value={profile.email} onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })}/> <br/>
          <select onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}> 
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      )}
    </div>
  );
}