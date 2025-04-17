import React, { useState } from "react";
import { 
  FiSearch, 
  FiCalendar, 
  FiClock, 
  FiFilter, 
  FiDownload, 
  FiCheck, 
  FiX,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import "./Attendance.scss";

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("daily"); // daily, weekly, monthly
  const [filterStatus, setFilterStatus] = useState("all"); // all, present, absent, late

  // Mock data for attendance records
  const attendanceRecords = [
    { id: 1, employeeId: "EMP001", name: "Ali Ben Salah", status: "present", checkIn: "08:45", checkOut: "17:30", department: "IT" },
    { id: 2, employeeId: "EMP002", name: "Sarah Johnson", status: "present", checkIn: "09:05", checkOut: "18:15", department: "Human Resources" },
    { id: 3, employeeId: "EMP003", name: "Michael Brown", status: "absent", checkIn: "-", checkOut: "-", department: "Management" },
    { id: 4, employeeId: "EMP004", name: "Emily Davis", status: "late", checkIn: "10:20", checkOut: "18:30", department: "Marketing" },
    { id: 5, employeeId: "EMP005", name: "David Wilson", status: "present", checkIn: "08:50", checkOut: "17:45", department: "Finance" },
    { id: 6, employeeId: "EMP006", name: "Lisa Wang", status: "half-day", checkIn: "08:30", checkOut: "13:00", department: "IT" },
    { id: 7, employeeId: "EMP007", name: "John Smith", status: "present", checkIn: "09:00", checkOut: "18:00", department: "Operations" },
    { id: 8, employeeId: "EMP008", name: "Amanda Martinez", status: "absent", checkIn: "-", checkOut: "-", department: "Marketing" }
  ];

  // Filter records based on search term and status filter
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || record.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Handle date navigation
  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    if (viewMode === "daily") {
      newDate.setDate(newDate.getDate() + direction);
    } else if (viewMode === "weekly") {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else if (viewMode === "monthly") {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setSelectedDate(newDate);
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch(status) {
      case "present":
        return { color: "#22c55e", icon: <FiCheck /> };
      case "absent":
        return { color: "#ef4444", icon: <FiX /> };
      case "late":
        return { color: "#f59e0b", icon: <FiClock /> };
      case "half-day":
        return { color: "#6366f1", icon: <FiClock /> };
      default:
        return { color: "#9ca3af", icon: null };
    }
  };

  return (
    <div className="attendance-page">
      <header className="page-header">
        <h1>Attendance Management</h1>
        <div className="view-selector">
          <button 
            className={viewMode === "daily" ? "active" : ""} 
            onClick={() => setViewMode("daily")}
          >
            Daily
          </button>
          <button 
            className={viewMode === "weekly" ? "active" : ""} 
            onClick={() => setViewMode("weekly")}
          >
            Weekly
          </button>
          <button 
            className={viewMode === "monthly" ? "active" : ""} 
            onClick={() => setViewMode("monthly")}
          >
            Monthly
          </button>
        </div>
      </header>

      <div className="date-navigation">
        <button className="nav-button" onClick={() => navigateDate(-1)}>
          <FiChevronLeft />
        </button>
        <div className="date-display">
          <FiCalendar />
          <span>{formatDate(selectedDate)}</span>
        </div>
        <button className="nav-button" onClick={() => navigateDate(1)}>
          <FiChevronRight />
        </button>
      </div>

      <div className="attendance-stats">
        <div className="stat-card">
          <div className="stat-content">
            <h3>Present</h3>
            <p className="stat-value">82%</p>
          </div>
          <div className="stat-indicator" style={{ backgroundColor: "#22c55e" }}></div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <h3>Absent</h3>
            <p className="stat-value">10%</p>
          </div>
          <div className="stat-indicator" style={{ backgroundColor: "#ef4444" }}></div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <h3>Late</h3>
            <p className="stat-value">5%</p>
          </div>
          <div className="stat-indicator" style={{ backgroundColor: "#f59e0b" }}></div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <h3>Half Day</h3>
            <p className="stat-value">3%</p>
          </div>
          <div className="stat-indicator" style={{ backgroundColor: "#6366f1" }}></div>
        </div>
      </div>

      <div className="attendance-actions">
        <div className="search-container">
          <FiSearch />
          <input
            type="text"
            placeholder="Search employee name, ID, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="action-buttons">
          <div className="filter-dropdown">
            <button className="filter-button">
              <FiFilter />
              <span>Filter</span>
            </button>
            <div className="dropdown-content">
              <button 
                className={filterStatus === "all" ? "active" : ""} 
                onClick={() => setFilterStatus("all")}
              >
                All
              </button>
              <button 
                className={filterStatus === "present" ? "active" : ""} 
                onClick={() => setFilterStatus("present")}
              >
                Present
              </button>
              <button 
                className={filterStatus === "absent" ? "active" : ""} 
                onClick={() => setFilterStatus("absent")}
              >
                Absent
              </button>
              <button 
                className={filterStatus === "late" ? "active" : ""} 
                onClick={() => setFilterStatus("late")}
              >
                Late
              </button>
            </div>
          </div>
          <button className="export-button">
            <FiDownload />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => {
              const statusInfo = getStatusInfo(record.status);
              const workingHours = record.status === "absent" ? "-" : 
                (record.checkIn !== "-" && record.checkOut !== "-") ? 
                calculateHours(record.checkIn, record.checkOut) : "-";
              
              return (
                <tr key={record.id}>
                  <td>{record.employeeId}</td>
                  <td>{record.name}</td>
                  <td>{record.department}</td>
                  <td>
                    <div className="status-cell">
                      <span 
                        className="status-indicator" 
                        style={{ backgroundColor: statusInfo.color }}
                      >
                        {statusInfo.icon}
                      </span>
                      <span className="status-text">{record.status}</span>
                    </div>
                  </td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut}</td>
                  <td>{workingHours}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Utility function to calculate working hours
function calculateHours(checkIn, checkOut) {
  if (checkIn === "-" || checkOut === "-") return "-";
  
  const [inHour, inMin] = checkIn.split(":").map(Number);
  const [outHour, outMin] = checkOut.split(":").map(Number);
  
  let hours = outHour - inHour;
  let mins = outMin - inMin;
  
  if (mins < 0) {
    hours -= 1;
    mins += 60;
  }
  
  return `${hours}h ${mins}m`;
}
