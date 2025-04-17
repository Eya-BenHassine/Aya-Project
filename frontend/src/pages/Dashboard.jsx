import React from "react";
import { FiUsers, FiCalendar, FiClock, FiBriefcase, FiDollarSign, FiBarChart2 } from "react-icons/fi";
import "./Dashboard.scss";

export default function Dashboard() {
  // Mock data for dashboard statistics
  const stats = [
    { id: 1, title: 'Total Employees', value: '128', icon: <FiUsers />, color: '#3498db' },
    { id: 2, title: 'Departments', value: '8', icon: <FiBriefcase />, color: '#2ecc71' },
    { id: 3, title: 'Present Today', value: '105', icon: <FiCalendar />, color: '#9b59b6' },
    { id: 4, title: 'On Leave', value: '12', icon: <FiClock />, color: '#e74c3c' },
    { id: 5, title: 'Open Positions', value: '5', icon: <FiBriefcase />, color: '#f39c12' },
    { id: 6, title: 'Monthly Budget', value: '$28,500', icon: <FiDollarSign />, color: '#1abc9c' }
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: 'Sarah Johnson', action: 'updated the attendance record', time: '10 minutes ago', avatar: 'https://ui-avatars.com/api/?name=SJ&background=9b59b6&color=fff' },
    { id: 2, user: 'Michael Brown', action: 'submitted a leave request', time: '2 hours ago', avatar: 'https://ui-avatars.com/api/?name=MB&background=3498db&color=fff' },
    { id: 3, user: 'Emily Davis', action: 'completed quarterly report', time: 'Yesterday at 4:30 PM', avatar: 'https://ui-avatars.com/api/?name=ED&background=e74c3c&color=fff' },
    { id: 4, user: 'David Wilson', action: 'approved budget for Q3', time: 'Yesterday at 1:20 PM', avatar: 'https://ui-avatars.com/api/?name=DW&background=f39c12&color=fff' },
    { id: 5, user: 'Lisa Wang', action: 'onboarded 3 new employees', time: '2 days ago', avatar: 'https://ui-avatars.com/api/?name=LW&background=1abc9c&color=fff' }
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="date-picker">
          <span>June 2023</span>
          <button className="refresh-button">
            <FiBarChart2 /> Reports
          </button>
        </div>
      </header>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map(stat => (
            <div className="stat-card" key={stat.id}>
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3 className="stat-title">{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-card attendance-overview">
          <h2>Attendance Overview</h2>
          <div className="attendance-chart">
            <div className="chart-placeholder">
              <div className="chart-bar" style={{ height: '70%', backgroundColor: '#3498db' }}></div>
              <div className="chart-bar" style={{ height: '65%', backgroundColor: '#3498db' }}></div>
              <div className="chart-bar" style={{ height: '80%', backgroundColor: '#3498db' }}></div>
              <div className="chart-bar" style={{ height: '75%', backgroundColor: '#3498db' }}></div>
              <div className="chart-bar" style={{ height: '85%', backgroundColor: '#3498db' }}></div>
              <div className="chart-bar" style={{ height: '60%', backgroundColor: '#3498db' }}></div>
              <div className="chart-bar" style={{ height: '90%', backgroundColor: '#3498db' }}></div>
            </div>
            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
          <div className="attendance-summary">
            <div className="summary-item">
              <span className="label">Present</span>
              <span className="value">82%</span>
            </div>
            <div className="summary-item">
              <span className="label">Absent</span>
              <span className="value">10%</span>
            </div>
            <div className="summary-item">
              <span className="label">Leave</span>
              <span className="value">8%</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card recent-activities">
          <h2>Recent Activities</h2>
          <ul className="activities-list">
            {recentActivities.map(activity => (
              <li key={activity.id} className="activity-item">
                <img 
                  src={activity.avatar} 
                  alt={activity.user} 
                  className="activity-avatar"
                />
                <div className="activity-content">
                  <p className="activity-text">
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
          <button className="view-all-btn">View All Activities</button>
        </div>
      </section>
      
      <section className="quick-actions">
        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-button">
              <FiUsers /> Manage Employees
            </button>
            <button className="action-button">
              <FiCalendar /> View Attendance
            </button>
            <button className="action-button">
              <FiDollarSign /> Process Payroll
            </button>
            <button className="action-button">
              <FiBriefcase /> Manage Departments
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
