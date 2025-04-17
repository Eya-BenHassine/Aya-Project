import React, { useState } from "react";
import { 
  FiSearch, 
  FiFilter, 
  FiPlus, 
  FiCalendar, 
  FiCheck, 
  FiX,
  FiClock,
  FiEye,
  FiSave
} from "react-icons/fi";
import "./LeaveRequests.scss";

export default function LeaveRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [showRequestDetails, setShowRequestDetails] = useState(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  
  // New request form data
  const [newRequest, setNewRequest] = useState({
    employeeId: "",
    employeeName: "",
    department: "",
    type: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({});
  
  // Mock leave request data
  const [leaveRequests, setLeaveRequests] = useState([
    { 
      id: 1, 
      employeeId: "EMP001", 
      employeeName: "Ali Ben Salah", 
      department: "IT",
      type: "Annual Leave", 
      startDate: "2023-06-15", 
      endDate: "2023-06-20", 
      duration: "6 days", 
      reason: "Family vacation",
      status: "approved", 
      submitDate: "2023-05-28",
      approver: "Michael Brown",
      approvedDate: "2023-06-01" 
    },
    { 
      id: 2, 
      employeeId: "EMP002", 
      employeeName: "Sarah Johnson", 
      department: "Human Resources",
      type: "Sick Leave", 
      startDate: "2023-06-10", 
      endDate: "2023-06-12", 
      duration: "3 days", 
      reason: "Medical appointment and recovery",
      status: "approved", 
      submitDate: "2023-06-05",
      approver: "David Wilson",
      approvedDate: "2023-06-07" 
    },
    { 
      id: 3, 
      employeeId: "EMP003", 
      employeeName: "Michael Brown", 
      department: "Management",
      type: "Personal Leave", 
      startDate: "2023-06-25", 
      endDate: "2023-06-27", 
      duration: "3 days", 
      reason: "Personal matters",
      status: "pending", 
      submitDate: "2023-06-10" 
    },
    { 
      id: 4, 
      employeeId: "EMP004", 
      employeeName: "Emily Davis", 
      department: "Marketing",
      type: "Maternity Leave", 
      startDate: "2023-07-15", 
      endDate: "2023-10-15", 
      duration: "3 months", 
      reason: "Maternity leave",
      status: "pending", 
      submitDate: "2023-06-01" 
    },
    { 
      id: 5, 
      employeeId: "EMP005", 
      employeeName: "David Wilson", 
      department: "Finance",
      type: "Annual Leave", 
      startDate: "2023-06-18", 
      endDate: "2023-06-24", 
      duration: "7 days", 
      reason: "Summer vacation",
      status: "rejected", 
      submitDate: "2023-06-02",
      approver: "Michael Brown",
      approvedDate: "2023-06-05",
      rejectionReason: "Critical project deadline during the requested period" 
    }
  ]);

  // Filter leave requests based on search and status filter
  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = 
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === "all" || request.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Function to handle status changes
  const handleStatusChange = (id, newStatus, rejectionReason = null) => {
    setLeaveRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id
          ? {
              ...request,
              status: newStatus,
              approver: "Admin",
              approvedDate: new Date().toISOString().split('T')[0],
              ...(rejectionReason && { rejectionReason })
            }
          : request
      )
    );
    setShowRequestDetails(null);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get status badge color
  const getStatusInfo = (status) => {
    switch(status) {
      case "approved":
        return { color: "#22c55e", icon: <FiCheck /> };
      case "rejected":
        return { color: "#ef4444", icon: <FiX /> };
      case "pending":
        return { color: "#f59e0b", icon: <FiClock /> };
      default:
        return { color: "#9ca3af", icon: null };
    }
  };

  // Function to handle filter status change
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setIsFilterDropdownOpen(false);
  };

  // Function to handle new request form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({
      ...newRequest,
      [name]: value
    });
  };

  // Function to validate form
  const validateForm = () => {
    const errors = {};
    
    if (!newRequest.employeeName.trim()) {
      errors.employeeName = "Employee name is required";
    }
    
    if (!newRequest.employeeId.trim()) {
      errors.employeeId = "Employee ID is required";
    }
    
    if (!newRequest.department.trim()) {
      errors.department = "Department is required";
    }
    
    if (!newRequest.type.trim()) {
      errors.type = "Leave type is required";
    }
    
    if (!newRequest.startDate) {
      errors.startDate = "Start date is required";
    }
    
    if (!newRequest.endDate) {
      errors.endDate = "End date is required";
    }
    
    if (newRequest.startDate && newRequest.endDate && new Date(newRequest.startDate) > new Date(newRequest.endDate)) {
      errors.endDate = "End date must be after start date";
    }
    
    if (!newRequest.reason.trim()) {
      errors.reason = "Reason is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to submit new leave request
  const handleSubmitRequest = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Calculate duration
      const start = new Date(newRequest.startDate);
      const end = new Date(newRequest.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      // Create new request object
      const newLeaveRequest = {
        id: leaveRequests.length + 1,
        employeeId: newRequest.employeeId,
        employeeName: newRequest.employeeName,
        department: newRequest.department,
        type: newRequest.type,
        startDate: newRequest.startDate,
        endDate: newRequest.endDate,
        duration: `${diffDays} days`,
        reason: newRequest.reason,
        status: "pending",
        submitDate: new Date().toISOString().split('T')[0]
      };
      
      // Add to requests
      setLeaveRequests([...leaveRequests, newLeaveRequest]);
      
      // Reset form and close modal
      setNewRequest({
        employeeId: "",
        employeeName: "",
        department: "",
        type: "Annual Leave",
        startDate: "",
        endDate: "",
        reason: "",
      });
      setIsNewRequestOpen(false);
    }
  };

  return (
    <div className="leave-requests-page">
      <header className="page-header">
        <h1>Leave Requests</h1>
        <div className="leave-summary">
          <div className="summary-item">
            <h3>Pending</h3>
            <p>{leaveRequests.filter(r => r.status === "pending").length}</p>
          </div>
          <div className="summary-item">
            <h3>Approved</h3>
            <p>{leaveRequests.filter(r => r.status === "approved").length}</p>
          </div>
          <div className="summary-item">
            <h3>Rejected</h3>
            <p>{leaveRequests.filter(r => r.status === "rejected").length}</p>
          </div>
        </div>
      </header>

      <div className="actions-bar">
        <div className="search-container">
          <FiSearch />
          <input
            type="text"
            placeholder="Search employee, leave type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="action-buttons">
          <div className="filter-dropdown">
            <button 
              className="filter-button"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            >
              <FiFilter />
              <span>Filter</span>
            </button>
            <div className="dropdown-content" style={{ display: isFilterDropdownOpen ? 'block' : 'none' }}>
              <button 
                className={filterStatus === "all" ? "active" : ""} 
                onClick={() => handleFilterChange("all")}
              >
                All Requests
              </button>
              <button 
                className={filterStatus === "pending" ? "active" : ""} 
                onClick={() => handleFilterChange("pending")}
              >
                Pending
              </button>
              <button 
                className={filterStatus === "approved" ? "active" : ""} 
                onClick={() => handleFilterChange("approved")}
              >
                Approved
              </button>
              <button 
                className={filterStatus === "rejected" ? "active" : ""} 
                onClick={() => handleFilterChange("rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
          
          <button className="new-request-button" onClick={() => setIsNewRequestOpen(true)}>
            <FiPlus />
            <span>New Request</span>
          </button>
        </div>
      </div>

      <div className="leave-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Date Range</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => {
              const statusInfo = getStatusInfo(request.status);
              
              return (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.department}</td>
                  <td>{request.type}</td>
                  <td>{request.duration}</td>
                  <td>
                    <div className="date-range">
                      <FiCalendar className="icon" />
                      <span>{formatDate(request.startDate)} - {formatDate(request.endDate)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="status-cell">
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: statusInfo.color }}
                      >
                        {statusInfo.icon}
                      </span>
                      <span className="status-text">{request.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="request-actions">
                      <button className="view-button" onClick={() => setShowRequestDetails(request)}>
                        <FiEye />
                      </button>
                      {request.status === "pending" && (
                        <>
                          <button 
                            className="approve-button" 
                            onClick={() => handleStatusChange(request.id, "approved")}
                          >
                            <FiCheck />
                          </button>
                          <button 
                            className="reject-button" 
                            onClick={() => {
                              const reason = window.prompt("Reason for rejection:");
                              if (reason) handleStatusChange(request.id, "rejected", reason);
                            }}
                          >
                            <FiX />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* New Request Modal */}
      {isNewRequestOpen && (
        <div className="request-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>New Leave Request</h3>
              <button className="close-button" onClick={() => setIsNewRequestOpen(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmitRequest}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="employeeName">Employee Name</label>
                  <input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    value={newRequest.employeeName}
                    onChange={handleInputChange}
                    className={formErrors.employeeName ? "error" : ""}
                  />
                  {formErrors.employeeName && <div className="error-message">{formErrors.employeeName}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="employeeId">Employee ID</label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={newRequest.employeeId}
                    onChange={handleInputChange}
                    className={formErrors.employeeId ? "error" : ""}
                  />
                  {formErrors.employeeId && <div className="error-message">{formErrors.employeeId}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select
                    id="department"
                    name="department"
                    value={newRequest.department}
                    onChange={handleInputChange}
                    className={formErrors.department ? "error" : ""}
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Management">Management</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                  </select>
                  {formErrors.department && <div className="error-message">{formErrors.department}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="type">Leave Type</label>
                  <select
                    id="type"
                    name="type"
                    value={newRequest.type}
                    onChange={handleInputChange}
                    className={formErrors.type ? "error" : ""}
                  >
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Personal Leave">Personal Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                  </select>
                  {formErrors.type && <div className="error-message">{formErrors.type}</div>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={newRequest.startDate}
                      onChange={handleInputChange}
                      className={formErrors.startDate ? "error" : ""}
                    />
                    {formErrors.startDate && <div className="error-message">{formErrors.startDate}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={newRequest.endDate}
                      onChange={handleInputChange}
                      className={formErrors.endDate ? "error" : ""}
                    />
                    {formErrors.endDate && <div className="error-message">{formErrors.endDate}</div>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="reason">Reason</label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={newRequest.reason}
                    onChange={handleInputChange}
                    rows="4"
                    className={formErrors.reason ? "error" : ""}
                  ></textarea>
                  {formErrors.reason && <div className="error-message">{formErrors.reason}</div>}
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setIsNewRequestOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <FiSave />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {showRequestDetails && (
        <div className="request-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Leave Request Details</h3>
              <button className="close-button" onClick={() => setShowRequestDetails(null)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="label">Employee:</span>
                <span className="value">{showRequestDetails.employeeName} ({showRequestDetails.employeeId})</span>
              </div>
              <div className="detail-row">
                <span className="label">Department:</span>
                <span className="value">{showRequestDetails.department}</span>
              </div>
              <div className="detail-row">
                <span className="label">Leave Type:</span>
                <span className="value">{showRequestDetails.type}</span>
              </div>
              <div className="detail-row">
                <span className="label">Duration:</span>
                <span className="value">{showRequestDetails.duration}</span>
              </div>
              <div className="detail-row">
                <span className="label">From:</span>
                <span className="value">{formatDate(showRequestDetails.startDate)}</span>
              </div>
              <div className="detail-row">
                <span className="label">To:</span>
                <span className="value">{formatDate(showRequestDetails.endDate)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Reason:</span>
                <span className="value">{showRequestDetails.reason}</span>
              </div>
              <div className="detail-row">
                <span className="label">Submitted On:</span>
                <span className="value">{formatDate(showRequestDetails.submitDate)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className={`value status-${showRequestDetails.status}`}>
                  {showRequestDetails.status.charAt(0).toUpperCase() + showRequestDetails.status.slice(1)}
                </span>
              </div>
              
              {showRequestDetails.approver && (
                <div className="detail-row">
                  <span className="label">Processed By:</span>
                  <span className="value">{showRequestDetails.approver}</span>
                </div>
              )}
              
              {showRequestDetails.approvedDate && (
                <div className="detail-row">
                  <span className="label">Processed On:</span>
                  <span className="value">{formatDate(showRequestDetails.approvedDate)}</span>
                </div>
              )}
              
              {showRequestDetails.rejectionReason && (
                <div className="detail-row">
                  <span className="label">Rejection Reason:</span>
                  <span className="value rejection-reason">{showRequestDetails.rejectionReason}</span>
                </div>
              )}
            </div>
            
            {showRequestDetails.status === "pending" && (
              <div className="modal-footer">
                <button 
                  className="approve-btn" 
                  onClick={() => handleStatusChange(showRequestDetails.id, "approved")}
                >
                  Approve Request
                </button>
                <button 
                  className="reject-btn" 
                  onClick={() => {
                    const reason = window.prompt("Reason for rejection:");
                    if (reason) handleStatusChange(showRequestDetails.id, "rejected", reason);
                  }}
                >
                  Reject Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 