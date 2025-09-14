import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, provider } from "../../Firebase/Firebase.js";
import { FcGoogle } from "react-icons/fc";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import coreal8Logo from "../../Assets/login-logo.png";

const LoginPage = () => {
  const navigate = useNavigate();

  // Modal open/close state
  const [isOpen, setIsOpen] = useState(true);

  // form states
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // close modal handler
  const handleClose = () => navigate("/");

  // email input change + validation
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    setIsEmailValid(emailRegex.test(value));
  };

  // password input change + validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    setIsPasswordValid(passwordRegex.test(value));
  };

  // Email/Password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isEmailValid) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage(
        "Password must be at least 6 characters and include both letters and numbers."
      );
      return;
    }

    try {
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;

      await setPersistence(auth, persistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User logged in:", userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      let customError = "Login failed. Please try again.";
      if (error.code === "auth/user-not-found") {
        customError = "We couldn't find an account with that email.";
      } else if (error.code === "auth/wrong-password") {
        customError = "Incorrect password. Please try again.";
      } else if (error.code === "auth/too-many-requests") {
        customError = "Too many failed attempts. Try again later.";
      }
      setErrorMessage(customError);
      console.error("Error logging in with email:", error.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setErrorMessage("");
    try {
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;

      await setPersistence(auth, persistence);

      const result = await signInWithPopup(auth, provider);
      console.log("User logged in with Google:", result.user);

      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Google login failed. Please try again.");
      console.error("Error logging in with Google:", error.message);
    }
  };

  // ✅ Don't render modal if closed
  if (!isOpen) return null;

  return (
    <div className="login-container">
      <div className="modal-backdrop" id="login-main">
        {/* Close button */}
        <button
          className="close-btn"
          id="partner-close-btn"
          style={{ color: "white" }}
          onClick={handleClose}
        >
          ✕
        </button>

        <div
          className="modal-content fade-in login-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo */}
          <img src={coreal8Logo} alt="Coreal8 Logo" className="login-logo" />

          {/* Intro text */}
          <div className="modal-intro-text">
            <h2>Welcome Back!</h2>
            <p>
              Log in to access your courses, dashboard, and exclusive content.
            </p>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="google-login w-full flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <FcGoogle size={20} />
            <span>Log in with Google</span>
          </button>

          {/* Divider */}
          <div className="separatOR">
            <span>OR</span>
          </div>

          {/* Email/Password Login */}
          <form onSubmit={handleEmailLogin} id="email-login">
            <div className="form-fields">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="e.g johndoe@gmail.com"
                value={email}
                onChange={handleChange}
                required
                className={isEmailValid ? "right-email" : "wrong-email"}
              />
              {!isEmailValid && email.length > 0 && (
                <p className="error-text">
                  That doesn't look like a valid email address
                </p>
              )}

              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className={
                    isPasswordValid ? "right-password" : "wrong-password"
                  }
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {!isPasswordValid && password.length > 0 && (
                <p className="error-text">
                  Password must be at least 6 characters and include both
                  letters and numbers
                </p>
              )}
            </div>

            <div className="form-options">
              <div>
                <label htmlFor="remember-me" className="remember-me">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />{" "}
                  Remember Me
                </label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            {errorMessage && <p className="error-text">{errorMessage}</p>}

            <button
              type="submit"
              className="modal-submit-button"
              id="login-button"
            >
              Login
            </button>
          </form>

          <Link to="/register" className="register-link">
            New User? Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
