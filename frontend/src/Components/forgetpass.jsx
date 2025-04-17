import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './forgetpass.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [step, setStep] = useState(1); // Step 1: Email form, Step 2: Success message
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Track user activity for security
  useEffect(() => {
    const handleActivity = () => {
      // Reset session timeout on user activity
      localStorage.setItem('lastActive', Date.now().toString());
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (countdown > 0) {
      toast.warning(`Please wait ${countdown} seconds before trying again`);
      return;
    }

    setIsLoading(true);

    try {
      // Replace this with your actual API call
      // const response = await api.sendPasswordResetEmail(formData.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message and move to step 2
      setStep(2);
      setCountdown(60); // Set cooldown period
    } catch (error) {
      toast.error(error.message || 'Failed to send reset link. Please try again.');
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setFormData({ email: '' });
    setStep(1);
    setIsLoading(false);
  };

  const renderEmailForm = () => (
    <>
      <div>
        <h2 className="form-title">Forgot Password?</h2>
        <p className="form-subtitle">
          No worries! Enter your email and we'll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <div className="input-wrapper">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            <div className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </div>
          </div>
          {errors.email && (
            <p className="error-message">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || countdown > 0}
          className="submit-button"
        >
          {isLoading ? (
            <span className="button-content">
              <span className="spinner"></span>
              <span>Sending...</span>
            </span>
          ) : countdown > 0 ? (
            <span className="button-content">
              <span>Resend in {countdown}s</span>
            </span>
          ) : (
            <span className="button-content">
              <span>Send Reset Link</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </button>

        <div className="back-to-login">
          <button type="button" onClick={() => navigate('/login')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
            <span>Back to Login</span>
          </button>
        </div>
      </form>
    </>
  );

  const renderSuccessMessage = () => (
    <div className="success-container">
      <div className="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
      </div>
      <h2 className="success-title">Check Your Email</h2>
      <p className="success-message">
        We've sent a password reset link to<br />
        <strong>{formData.email}</strong>
      </p>
      <p className="instructions">
        The link will expire in 30 minutes. If you don't see the email, check your spam folder.
      </p>
      
      <div className="action-buttons">
        {countdown > 0 ? (
          <button disabled className="secondary-button">
            Resend in {countdown}s
          </button>
        ) : (
          <button onClick={handleTryAgain} className="secondary-button">
            Try Another Email
          </button>
        )}
        <button onClick={() => navigate('/login')} className="primary-button">
          Back to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="forgot-password-container">
      <div className="form-container">
        {step === 1 ? renderEmailForm() : renderSuccessMessage()}

        <div className="footer">
          <p>
            By continuing, you agree to our{' '}
            <a href="/terms">Terms of Service</a> and{' '}
            <a href="/privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;



