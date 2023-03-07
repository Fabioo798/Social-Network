import { useEffect, useState } from "react";
import { UserApiRepo } from "../../api.repo";
import { UserStructure } from "../../model/user.model";
import "./users.css";

const userApiRepo = new UserApiRepo();


function Profile() {
  const [userData, setUserData] = useState<UserStructure[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token") as string;

    const fetchData = async () => {
      const data = await userApiRepo.loadUsers(token);
      setUserData(data.results);
    };

    fetchData();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      {userData.map((user) => (
        <div key={user.email}>
          <p className="profile-data">Name: {user.name}</p>
          <p className="profile-data">Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;
