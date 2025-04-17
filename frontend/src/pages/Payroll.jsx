import React, { useState } from "react";
import { 
  FiSearch, 
  FiDownload, 
  FiCalendar, 
  FiFilter, 
  FiEye,
  FiChevronLeft, 
  FiChevronRight,
  FiDollarSign,
  FiFileText,
  FiCreditCard,
  FiPieChart
} from "react-icons/fi";
import "./Payroll.scss";

export default function Payroll() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [showPayrollDetails, setShowPayrollDetails] = useState(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  
  // Mock payroll data
  const payrollData = [
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "Ali Ben Salah",
      department: "IT",
      position: "Software Engineer",
      basicSalary: 5000,
      overtimePay: 350,
      bonuses: 500,
      taxDeductions: 1025,
      insuranceDeductions: 250,
      otherDeductions: 75,
      netPay: 4500,
      status: "processed",
      paymentDate: "2023-06-28",
      paymentMethod: "Bank Transfer",
      accountNumber: "XXXX-XXXX-7845"
    },
    {
      id: 2,
      employeeId: "EMP002",
      employeeName: "Sarah Johnson",
      department: "Human Resources",
      position: "HR Manager",
      basicSalary: 6000,
      overtimePay: 0,
      bonuses: 800,
      taxDeductions: 1220,
      insuranceDeductions: 300,
      otherDeductions: 0,
      netPay: 5280,
      status: "processed",
      paymentDate: "2023-06-28",
      paymentMethod: "Bank Transfer",
      accountNumber: "XXXX-XXXX-9123"
    },
    {
      id: 3,
      employeeId: "EMP003",
      employeeName: "Michael Brown",
      department: "Management",
      position: "Project Manager",
      basicSalary: 7500,
      overtimePay: 0,
      bonuses: 1000,
      taxDeductions: 1700,
      insuranceDeductions: 400,
      otherDeductions: 100,
      netPay: 6300,
      status: "pending",
      paymentMethod: "Bank Transfer",
      accountNumber: "XXXX-XXXX-5678"
    },
    {
      id: 4,
      employeeId: "EMP004",
      employeeName: "Emily Davis",
      department: "Marketing",
      position: "Marketing Specialist",
      basicSalary: 4800,
      overtimePay: 200,
      bonuses: 350,
      taxDeductions: 950,
      insuranceDeductions: 240,
      otherDeductions: 50,
      netPay: 4110,
      status: "processed",
      paymentDate: "2023-06-28",
      paymentMethod: "Bank Transfer",
      accountNumber: "XXXX-XXXX-2345"
    },
    {
      id: 5,
      employeeId: "EMP005",
      employeeName: "David Wilson",
      department: "Finance",
      position: "Financial Analyst",
      basicSalary: 5500,
      overtimePay: 0,
      bonuses: 400,
      taxDeductions: 1060,
      insuranceDeductions: 275,
      otherDeductions: 0,
      netPay: 4565,
      status: "pending",
      paymentMethod: "Bank Transfer",
      accountNumber: "XXXX-XXXX-4567"
    }
  ];

  // Filter payroll data based on search and filter
  const filteredPayroll = payrollData.filter(record => {
    const matchesSearch = 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterDepartment === "all" || record.department === filterDepartment;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate payroll statistics
  const calculatePayrollStats = () => {
    const totalPaid = payrollData
      .filter(record => record.status === "processed")
      .reduce((sum, record) => sum + record.netPay, 0);
    
    const totalPending = payrollData
      .filter(record => record.status === "pending")
      .reduce((sum, record) => sum + record.netPay, 0);
    
    const totalEmployees = payrollData.length;
    const processedEmployees = payrollData.filter(record => record.status === "processed").length;
    
    return {
      totalPaid,
      totalPending,
      totalEmployees,
      processedEmployees
    };
  };

  const stats = calculatePayrollStats();

  // Format currency
  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format month
  const formatMonth = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Handle month navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  // Get unique departments for filter
  const departments = [...new Set(payrollData.map(record => record.department))];

  // Handle filter change
  const handleFilterChange = (department) => {
    setFilterDepartment(department);
    setIsFilterDropdownOpen(false);
  };

  return (
    <div className="payroll-page">
      <header className="page-header">
        <h1>Payroll Management</h1>
        <div className="month-navigator">
          <button className="nav-button" onClick={() => navigateMonth(-1)}>
            <FiChevronLeft />
          </button>
          <div className="current-month">
            <FiCalendar />
            <span>{formatMonth(currentMonth)}</span>
          </div>
          <button className="nav-button" onClick={() => navigateMonth(1)}>
            <FiChevronRight />
          </button>
        </div>
      </header>

      <div className="payroll-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <h3>Total Paid</h3>
            <p>{formatCurrency(stats.totalPaid)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiCreditCard />
          </div>
          <div className="stat-content">
            <h3>Pending Payments</h3>
            <p>{formatCurrency(stats.totalPending)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiFileText />
          </div>
          <div className="stat-content">
            <h3>Processed Payslips</h3>
            <p>{stats.processedEmployees} / {stats.totalEmployees}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiPieChart />
          </div>
          <div className="stat-content">
            <h3>Average Salary</h3>
            <p>{formatCurrency(payrollData.reduce((sum, record) => sum + record.netPay, 0) / payrollData.length)}</p>
          </div>
        </div>
      </div>

      <div className="actions-bar">
        <div className="search-container">
          <FiSearch />
          <input
            type="text"
            placeholder="Search employee, ID, position..."
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
              <span>Department</span>
            </button>
            <div className="dropdown-content" style={{ display: isFilterDropdownOpen ? 'block' : 'none' }}>
              <button 
                className={filterDepartment === "all" ? "active" : ""} 
                onClick={() => handleFilterChange("all")}
              >
                All Departments
              </button>
              {departments.map(dept => (
                <button
                  key={dept}
                  className={filterDepartment === dept ? "active" : ""}
                  onClick={() => handleFilterChange(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
          
          <button className="export-button">
            <FiDownload />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="payroll-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Position</th>
              <th>Department</th>
              <th>Basic Salary</th>
              <th>Overtime</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayroll.map((record) => (
              <tr key={record.id}>
                <td className="employee-cell">
                  <span className="employee-name">{record.employeeName}</span>
                  <span className="employee-id">{record.employeeId}</span>
                </td>
                <td>{record.position}</td>
                <td>{record.department}</td>
                <td>{formatCurrency(record.basicSalary)}</td>
                <td>{formatCurrency(record.overtimePay)}</td>
                <td>{formatCurrency(record.taxDeductions + record.insuranceDeductions + record.otherDeductions)}</td>
                <td className="net-pay">{formatCurrency(record.netPay)}</td>
                <td>
                  <span className={`status-badge ${record.status}`}>
                    {record.status === "processed" ? "Processed" : "Pending"}
                  </span>
                </td>
                <td>
                  <div className="record-actions">
                    <button 
                      className="view-button" 
                      onClick={() => setShowPayrollDetails(record)}
                    >
                      <FiEye />
                    </button>
                    <button className="download-button">
                      <FiDownload />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payroll Details Modal */}
      {showPayrollDetails && (
        <div className="payroll-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Payroll Details - {formatMonth(currentMonth)}</h3>
              <button 
                className="close-button" 
                onClick={() => setShowPayrollDetails(null)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="employee-info">
                <h4>{showPayrollDetails.employeeName}</h4>
                <p>
                  {showPayrollDetails.position} • {showPayrollDetails.department} • 
                  <span className="employee-id">{showPayrollDetails.employeeId}</span>
                </p>
              </div>

              <div className="payslip-section">
                <h5>Earnings</h5>
                <div className="payslip-row">
                  <span className="label">Basic Salary</span>
                  <span className="value">{formatCurrency(showPayrollDetails.basicSalary)}</span>
                </div>
                <div className="payslip-row">
                  <span className="label">Overtime Pay</span>
                  <span className="value">{formatCurrency(showPayrollDetails.overtimePay)}</span>
                </div>
                <div className="payslip-row">
                  <span className="label">Bonuses</span>
                  <span className="value">{formatCurrency(showPayrollDetails.bonuses)}</span>
                </div>
                <div className="payslip-row total">
                  <span className="label">Total Earnings</span>
                  <span className="value">
                    {formatCurrency(showPayrollDetails.basicSalary + showPayrollDetails.overtimePay + showPayrollDetails.bonuses)}
                  </span>
                </div>
              </div>

              <div className="payslip-section">
                <h5>Deductions</h5>
                <div className="payslip-row">
                  <span className="label">Tax</span>
                  <span className="value">{formatCurrency(showPayrollDetails.taxDeductions)}</span>
                </div>
                <div className="payslip-row">
                  <span className="label">Insurance</span>
                  <span className="value">{formatCurrency(showPayrollDetails.insuranceDeductions)}</span>
                </div>
                <div className="payslip-row">
                  <span className="label">Other Deductions</span>
                  <span className="value">{formatCurrency(showPayrollDetails.otherDeductions)}</span>
                </div>
                <div className="payslip-row total">
                  <span className="label">Total Deductions</span>
                  <span className="value">
                    {formatCurrency(showPayrollDetails.taxDeductions + showPayrollDetails.insuranceDeductions + showPayrollDetails.otherDeductions)}
                  </span>
                </div>
              </div>

              <div className="payslip-section">
                <div className="payslip-row grand-total">
                  <span className="label">Net Pay</span>
                  <span className="value">{formatCurrency(showPayrollDetails.netPay)}</span>
                </div>
              </div>

              <div className="payment-info">
                <h5>Payment Information</h5>
                <div className="detail-row">
                  <span className="label">Payment Method:</span>
                  <span className="value">{showPayrollDetails.paymentMethod}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Account:</span>
                  <span className="value">{showPayrollDetails.accountNumber}</span>
                </div>
                {showPayrollDetails.status === "processed" && (
                  <div className="detail-row">
                    <span className="label">Payment Date:</span>
                    <span className="value">{new Date(showPayrollDetails.paymentDate).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="label">Status:</span>
                  <span className={`value status-${showPayrollDetails.status}`}>
                    {showPayrollDetails.status === "processed" ? "Processed" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="download-btn">
                <FiDownload /> Download Payslip
              </button>
              {showPayrollDetails.status === "pending" && (
                <button className="process-btn">Process Payment</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
