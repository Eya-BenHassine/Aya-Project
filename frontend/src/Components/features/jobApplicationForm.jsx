import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/jobApplicationForm.scss';

const JobApplicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId;
  const jobTitle = location.state?.jobTitle;

  // Redirect if no job info was provided
  if (!jobId || !jobTitle) {
    setTimeout(() => {
      navigate('/features/job-offers');
    }, 100);
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    degree: '',
    cv: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        cv: file
      }));
      
      // Clear CV error
      if (errors.cv) {
        setErrors(prev => ({ ...prev, cv: null }));
      }
    } else {
      setErrors(prev => ({
        ...prev,
        cv: 'Please upload a PDF file'
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.degree) newErrors.degree = 'Degree is required';
    if (!formData.cv) newErrors.cv = 'CV is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('firstName', formData.firstName);
        formDataToSend.append('lastName', formData.lastName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('degree', formData.degree);
        formDataToSend.append('cv', formData.cv);
        formDataToSend.append('jobId', jobId);

        const response = await fetch('http://localhost:5000/api/jobs/apply', {
          method: 'POST',
          body: formDataToSend, // Don't set Content-Type header with FormData
        });

        if (response.ok) {
          setSubmitSuccess(true);
          setTimeout(() => {
            navigate('/features/job-offers');
          }, 2000);
        } else {
          const errorData = await response.json();
          alert(`Failed to submit application: ${errorData.message || 'Please try again.'}`);
        }
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('An error occurred while submitting your application. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitSuccess) {
    return (
      <div className="job-application-container">
        <div className="job-application-success">
          <h1>Application Submitted Successfully!</h1>
          <p>Thank you for applying for {jobTitle}.</p>
          <p>We will review your application and get back to you soon.</p>
          <button 
            className="return-button" 
            onClick={() => navigate('/features/job-offers')}
          >
            Return to Job Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-application-container">
      <div className="job-application-form">
        <h1>Apply for {jobTitle || 'Job Position'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="degree">Degree</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className={errors.degree ? 'error' : ''}
            />
            {errors.degree && <span className="error-message">{errors.degree}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cv">Upload CV (PDF only)</label>
            <input
              type="file"
              id="cv"
              name="cv"
              accept=".pdf"
              onChange={handleFileChange}
              className={errors.cv ? 'error' : ''}
            />
            {errors.cv && <span className="error-message">{errors.cv}</span>}
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
            <button 
              type="button" 
              className="cancel-button" 
              onClick={() => navigate('/features/job-offers')}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;