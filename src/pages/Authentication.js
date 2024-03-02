import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../components/auth/FirebaseConfig";
import AuthForm from "../components/auth/AuthForm";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
function Authentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuthentication = async (email, password, mode) => {
    try {
      if (mode === "login") {
        // await signInWithEmailAndPassword(auth, email, password);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());
      } else if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setIsAuthenticated(true);

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return <AuthForm onAuthentication={handleAuthentication} error={error} />;
}

export default Authentication;
