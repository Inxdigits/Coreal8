import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../../../Firebase/Firebase.js";
import { FcGoogle } from "react-icons/fc";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import coreal8Logo from "../../../Assets/login-logo.png";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    return emailRegex.test(value);
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const setAuthPersistence = async () => {
    const persistence = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;
    await setPersistence(auth, persistence);
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Agree to the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);
      await setAuthPersistence();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      console.log("User signed up:", userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up with email:", error);

      // Custom error messages
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (error.code === "auth/operation-not-allowed") {
        setError(
          "Email/Password sign-up is not enabled. Please contact support."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignup = async () => {
    setError("");
    try {
      setLoading(true);
      await setAuthPersistence();

      const result = await signInWithPopup(auth, provider);
      console.log("User signed up with Google:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up with Google:", error);

      // Custom error messages for Google signup
      if (error.code === "auth/popup-closed-by-user") {
        setError("The sign-in popup was closed before completing the process.");
      } else if (error.code === "auth/cancelled-popup-request") {
        setError("Sign-in request was canceled. Please try again.");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        setError(
          "An account already exists with the same email but different sign-in credentials."
        );
      } else if (error.code === "auth/operation-not-allowed") {
        setError(
          "Google sign-up is currently disabled. Please contact support."
        );
      } else {
        setError("Something went wrong with Google signup. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="signup-container">
      <div className="modal-backdrop" id="login-main">
        <button className="close-btn">
          <Link to="/">X</Link>
        </button>
        <div
          className="modal-content fade-in login-modal-content register-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={coreal8Logo} alt="Coreal8 Logo" className="login-logo" />
          <div className="modal-intro-text">
            <h2>Create Your Account</h2>
            <p>
              Sign in to access your courses, dashboard, and exclusive content.
            </p>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignup}
            className="google-login w-full flex items-center justify-center gap-2 hover:bg-gray-100"
            disabled={loading}
          >
            <FcGoogle size={20} />
            <span>{loading ? "Processing..." : "Sign Up with Google"}</span>
          </button>

          <div className="separatOR">
            <span>OR</span>
          </div>

          <form onSubmit={handleEmailSignup} className="email-login">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="e.g John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e.g johndoe@gmail.com"
              value={email}
              onChange={handleChangeEmail}
              required
              className={`border ${
                isEmailValid
                  ? "border-yellow-300 focus:ring-yellow-300"
                  : "border-red-500 focus:ring-red-300"
              }`}
            />

            {!isEmailValid && email.length > 0 && (
              <p className="text-red-500 text-sm">
                That doesn't look like a valid email address
              </p>
            )}

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="e.g +2348012345789"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="form-options">
              {/* <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div> */}

              <div className="remember-me terms">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                />
                <label htmlFor="terms">
                  By signing up you agree to Coreal8 Terms of Service and
                  Privacy Policy
                </label>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="modal-submit-button"
              id="login-button"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <Link
            to="/login"
            className="register-link"
            style={{ cursor: "pointer" }}
          >
            Already a User? Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
