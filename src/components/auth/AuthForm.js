import React, { useState } from "react";
import {
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { Input, Button } from "antd"; // Import Ant Design components
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"; // Import Ant Design icons
import classes from "./AuthForm.module.css";

function AuthForm({ onAuthentication, error }) {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!formData.email.includes("@")) {
      errors.email = "Email must be valid";
    }

    // Validate password
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one capital letter";
    } else if (!/\d/.test(formData.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least one special character";
    }

    // Validate confirm password if signing up
    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Call the onAuthentication callback with form data
      onAuthentication(
        formData.email,
        formData.password,
        isLogin ? "login" : "register"
      );
      alert("Registration Successful")
    } else {
      alert("Authentication Failed");
    }
  };

  return (
    <>
      <form method="post" className={classes.form} onSubmit={handleSubmit}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {error && <p className={classes.error}>{error}</p>}
        {data && data.errors && (
          <ul className={classes.errorList}>
            {Object.values(data.errors).map((err, index) => (
              <li key={index} className={classes.error}>
                {err}
              </li>
            ))}
          </ul>
        )}
        {data && data.message && (
          <p className={classes.message}>{data.message}</p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {formErrors.email && (
            <span className={classes.error}>{formErrors.email}</span>
          )}
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <Input.Password
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            required
          />
          {formErrors.password && (
            <span className={classes.error}>{formErrors.password}</span>
          )}
        </p>
        {!isLogin && (
          <p>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input.Password
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              required
            />
            {formErrors.confirmPassword && (
              <span className={classes.error}>
                {formErrors.confirmPassword}
              </span>
            )}
          </p>
        )}
        <div className={classes.actions}>
          <Link
            to={`?mode=${isLogin ? "register" : "login"}`}
            className={classes.customLink}
          >
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
