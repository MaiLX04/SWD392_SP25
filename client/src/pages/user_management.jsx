import React, { useEffect, useState } from "react";
import "../assets/css/user_management.css";
import UserManagePopup from "../components/usermanage.jsx";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../context/adminauth.jsx";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let success;

      if (editingId) {
        success = await updateUser(editingId, formData);
      } else {
        success = await createUser(formData);
      }

      if (success) {
        setFormData({ username: "", email: "", password: "" });
        setEditingId(null);
        setShowPopup(false); // Đóng modal sau khi submit
        loadUsers();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const success = await deleteUser(id);
      if (success) {
        loadUsers();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      username: user.username,
      email: user.email,
      password: "", // Để trống password khi edit
    });
    setShowPopup(true); // Hiển thị modal khi nhấn Edit
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ username: "", email: "", password: "" });
    setShowPopup(true); // Hiển thị modal khi nhấn "+"
  };

  const closePopup = () => {
    setShowPopup(false);
    setEditingId(null);
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div>
      <h1>User Management</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="user_manage_page">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>
                  <button className="add_button" onClick={handleAdd}>
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="button">
                      <button
                        className="add_button"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete_button"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UserManagePopup
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              editingId={editingId}
              loading={loading}
              onClose={closePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
