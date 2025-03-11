import React, { useState } from 'react';

const Admin = () => {
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleEdit = (user) => {
        setEditingUser(user);
        setNewName(user.name);
        setNewEmail(user.email);
    };

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleSave = () => {
        setUsers(users.map(user => 
            user.id === editingUser.id ? { ...user, name: newName, email: newEmail } : user
        ));
        setEditingUser(null);
        setNewName('');
        setNewEmail('');
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingUser && (
                <div>
                    <h2>Edit User</h2>
                    <label>
                        Name:
                        <input 
                            type="text" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                        />
                    </label>
                    <label>
                        Email:
                        <input 
                            type="email" 
                            value={newEmail} 
                            onChange={(e) => setNewEmail(e.target.value)} 
                        />
                    </label>
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </div>
    );
};

export default Admin;
