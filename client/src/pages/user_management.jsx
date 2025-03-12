import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import "../assets/css/Navbar.css";
import { useAuth } from "../context/auth.jsx";

const user_management = () => {
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleEdit = (user) => {
        setEditingUser(user);
        setNewUsername(user.username);
        setNewPassword(user.password);
    };

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleSave = () => {
        setUsers(users.map(user => 
            user.id === editingUser.id ? { ...user, username: newUsername, password: newPassword } : user
        ));
        setEditingUser(null);
        setNewUsername('');
        setNewPassword('');
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Profile Picture</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>
                                <img src={user.profilePicture} alt="Profile" width="50" height="50" />
                            </td>
                            <td>{user.password}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete user</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingUser && (
                <div>
                    <h2>Edit User</h2>
                    <label>
                        Username:
                        <input 
                            type="text" 
                            value={newUsername} 
                            onChange={(e) => setNewUsername(e.target.value)} 
                        />
                    </label>
                    <label>
                        Password:
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />
                    </label>
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </div>
    );
};

export default user_management;
