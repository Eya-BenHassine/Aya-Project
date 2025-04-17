import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Payroll from '../pages/Payroll';

describe('Payroll Component', () => {
  test('renders payroll page with header', () => {
    render(<Payroll />);
    expect(screen.getByText('Payroll Management')).toBeInTheDocument();
  });

  test('displays statistics cards', () => {
    render(<Payroll />);
    expect(screen.getByText('Total Paid')).toBeInTheDocument();
    expect(screen.getByText('Pending Payments')).toBeInTheDocument();
    expect(screen.getByText('Processed Payslips')).toBeInTheDocument();
    expect(screen.getByText('Average Salary')).toBeInTheDocument();
  });

  test('displays payroll table with headers', () => {
    render(<Payroll />);
    expect(screen.getByText('Employee')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Position')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Net Pay')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('search functionality filters employees', () => {
    render(<Payroll />);
    const searchInput = screen.getByPlaceholderText('Search employee...');
    
    // Check initial state (all employees shown)
    expect(screen.getAllByText(/EMP-/i).length).toBeGreaterThan(1);
    
    // Search for specific employee
    fireEvent.change(searchInput, { target: { value: 'John Doe' } });
    
    // Check filtered results
    const employeeElements = screen.getAllByText(/John Doe/i);
    expect(employeeElements.length).toBe(1);
  });

  test('department filter works correctly', () => {
    render(<Payroll />);
    
    // Open filter dropdown
    const filterButton = screen.getByText('Department');
    fireEvent.click(filterButton);
    
    // Select IT department
    const itDeptButton = screen.getByText('IT');
    fireEvent.click(itDeptButton);
    
    // Check that only IT department employees are shown
    const departmentCells = screen.getAllByText('IT');
    expect(departmentCells.length).toBeGreaterThan(0);
    expect(screen.queryByText('Marketing')).not.toBeInTheDocument();
  });

  test('modal opens when view details is clicked', () => {
    render(<Payroll />);
    
    // Find and click the first view details button
    const viewButtons = screen.getAllByTitle('View Details');
    fireEvent.click(viewButtons[0]);
    
    // Check that the modal is displayed
    expect(screen.getByText('Payroll Details')).toBeInTheDocument();
    expect(screen.getByText('Employee Information')).toBeInTheDocument();
    expect(screen.getByText('Earnings & Deductions')).toBeInTheDocument();
  });
}); 