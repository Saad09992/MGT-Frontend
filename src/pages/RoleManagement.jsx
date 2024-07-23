import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SET_ROLES, SET_ERROR, SET_SUCCESS } from "../store/Types/RoleTypes";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";

function RoleManagement() {
  const dispatch = useDispatch();
  const { roles, loading, error } = useSelector((state) => state.RoleReducer);
  const [roleData, setRoleData] = useState({ name: "" });
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/roles");
        dispatch({ type: SET_ROLES, payload: response.data });
      } catch (err) {
        dispatch({ type: SET_ERROR, payload: err.response?.data?.error?.msg });
      }
    };
    fetchRoles();
  }, [dispatch]);

  const handleChange = (e) => {
    setRoleData({ ...roleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRole) {
        await axios.put(`/api/roles/${editingRole.id}`, roleData);
        dispatch({ type: SET_SUCCESS, payload: "Role updated successfully" });
      } else {
        await axios.post("/api/roles", roleData);
        dispatch({ type: SET_SUCCESS, payload: "Role added successfully" });
      }
      setRoleData({ name: "" });
      setEditingRole(null);
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response?.data?.error?.msg });
    }
  };

  const handleEdit = (role) => {
    setRoleData(role);
    setEditingRole(role);
  };

  const handleDelete = async (roleId) => {
    try {
      await axios.delete(`/api/roles/${roleId}`);
      dispatch({ type: SET_SUCCESS, payload: "Role deleted successfully" });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response?.data?.error?.msg });
    }
  };

  return (
    <div className="mx-4">
      <div>
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          className="p-button-secondary"
          onClick={() => navigate(-1)}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="card shadow-md rounded-lg p-4 mt-4"
      >
        <Divider>
          <span className="text-2xl font-bold text-center text-primary mx-1">
            {editingRole ? "Edit Role" : "Add Role"}
          </span>
        </Divider>
        <div className="flex items-center mb-2">
          <InputText
            type="text"
            name="name"
            value={roleData.name}
            onChange={handleChange}
            placeholder="Role Name"
            className="w-full"
          />
          <Button
            label={editingRole ? "Update Role" : "Add Role"}
            icon="pi pi-check"
            className="p-button-primary ml-2"
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul className="list-disc pl-5">
        {Array.isArray(roles) &&
          roles.map((role) => (
            <li key={role.id} className="mb-2">
              <span className="mr-2">{role.name}</span>
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-warning mr-2"
                onClick={() => handleEdit(role)}
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                className="p-button-danger"
                onClick={() => handleDelete(role.id)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default RoleManagement;
