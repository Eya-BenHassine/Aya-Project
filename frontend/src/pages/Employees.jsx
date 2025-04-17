import React, { useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import EmployeeForm from "../Components/EmployeeForm";
import "./Employees.scss";

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employees, setEmployees] = useState([
    { id: 1, name: "Ali Ben Salah", age: 28, email: "ali@example.com", phone: "+1 234 567 890", occupation: "Software Engineer", department: "IT", joinDate: "2022-01-15", salary: "75000", address: "123 Tech Street, Silicon Valley", status: "active" },
    { id: 2, name: "Sarah Johnson", age: 32, email: "sarah@example.com", phone: "+1 987 654 321", occupation: "HR Manager", department: "Human Resources", joinDate: "2021-06-10", salary: "85000", address: "456 HR Avenue, Business District", status: "active" },
    { id: 3, name: "Michael Brown", age: 45, email: "michael@example.com", phone: "+1 567 890 123", occupation: "Project Manager", department: "Management", joinDate: "2020-03-22", salary: "95000", address: "789 Management Road, Corporate Park", status: "active" },
    { id: 4, name: "Emily Davis", age: 26, email: "emily@example.com", phone: "+1 345 678 901", occupation: "Marketing Specialist", department: "Marketing", joinDate: "2022-04-05", salary: "70000", address: "567 Creative Lane, Market Square", status: "active" },
    { id: 5, name: "David Wilson", age: 38, email: "david@example.com", phone: "+1 890 123 456", occupation: "Financial Analyst", department: "Finance", joinDate: "2021-11-18", salary: "80000", address: "890 Money Street, Financial District", status: "active" }
  ]);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees(prevEmployees => 
        prevEmployees.map(emp => 
          emp.id === editingEmployee.id ? { ...formData, id: emp.id } : emp
        )
      );
    } else {
      // Add new employee
      const newEmployee = {
        ...formData,
        id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1
      };
      setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="employees-page">
      <div className="page-header">
        <h1>Employees</h1>
        <div className="actions">
          <div className="search-container">
            <FiSearch />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-button" onClick={handleAddEmployee}>
            <FiPlus />
            Add Employee
          </button>
        </div>
      </div>

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Job Title</th>
              <th>Department</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.age}</td>
                <td>{employee.occupation}</td>
                <td>{employee.department}</td>
                <td>{employee.email}</td>
                <td>
                  <span className={`status-badge ${employee.status}`}>
                    {employee.status === 'active' ? 'Active' : 
                     employee.status === 'on-leave' ? 'On Leave' : 'Terminated'}
                  </span>
                </td>
                <td>
                  <div className="employee-actions">
                    <button className="edit" onClick={() => handleEditEmployee(employee)}>
                      <FiEdit2 />
                    </button>
                    <button className="delete" onClick={() => handleDeleteEmployee(employee.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Employee Form Modal */}
      <EmployeeForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingEmployee}
      />
    </div>
  );
}
