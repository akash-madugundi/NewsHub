import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import styles from "./styles/SignUpIn.module.css";

const SignIn = () => {
  const handleSignIn = async ({ email, password }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      alert(data.message);
      window.location.href = "/news";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to NewsHub!!!</h1>
      <p>Your daily source of news updates</p>
      
      <AuthForm onSubmit={handleSignIn} isSignUp={false} />

      <p className={styles.adminBox}>
        Admin?
        <span className={styles.admin}>
          <Link to="/auth/admin">Click Here</Link>
        </span>
      </p>
    </div>
  );
};

export default SignIn;