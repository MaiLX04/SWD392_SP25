import React from "react";
import "../assets/css/user_management.css";
import { mockUsers } from "../utils/mockData";

const Users = ({username, password, email}) => {
  return (
    <div className="user">
      <p>Username: {username}</p>
      <p>Password: {password}</p>
      <p>Email: {email}</p>
      <button className="editBtn">Edit</button>
      <button className="deleteBtn">Delete</button>
    </div>
  );
}

const UserManagement = () => {
  return (
    <div>
      <h1>User Management</h1>
      <Users username="huy" password="pass111" email="  "></Users>
      <Users username="liem" password="pass222" email="  "></Users>
      <Users username="mai" password="pass333" email="  "></Users>
    </div>
    );
};

export default UserManagement;
