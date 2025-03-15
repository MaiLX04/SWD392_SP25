import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import '../assets/css/user_management.css';

const API_URL = 'https://67c7faf7c19eb8753e7bae06.mockapi.io/api/huy/users';

function user_management() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSubmit = async (userData) => {
    try {
      if (editingUser) {
        // Update
        await axios.put(`${API_URL}/${editingUser.id}`, userData);
      } else {
        // Create
        await axios.post(API_URL, {
          ...userData,
          createdAt: new Date().toISOString()
        });
      }
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className='user-list'>
      <caption>User Management</caption>
      <table className='user-table'>
        
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
            <th>
            <Popup modal trigger={<button>Click Me</button>}>
              <UserForm onSubmit={handleSubmit} initialData={editingUser} />
            </Popup>  
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default user_management;
