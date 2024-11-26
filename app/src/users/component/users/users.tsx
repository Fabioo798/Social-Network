import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../core/store/store";
import { ProtoUserStructure } from "../../model/user.model";
import { asyncLoadUsers } from "../../services/thunks";

function Profile() {
 const { users, userLogged } = useSelector((state: RootState) => state.users);
 const dispatch = useDispatch<AppDispatch>();

 const token = userLogged?.token as string;

 useEffect(() => {
  dispatch(asyncLoadUsers(token));
 }, [dispatch, token]);
 console.log(users);

 return (
  <div className="profile-container">
   <h2 className="profile-heading">Profile</h2>
   {users.map((user: ProtoUserStructure) => (
    <div key={user.id}>
     <p className="profile-data">Name: {user.name}</p>
     <p className="profile-data">Email: {user.email}</p>
    </div>
   ))}
  </div>
 );
}

export default Profile;
