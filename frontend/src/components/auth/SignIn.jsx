import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import styles from "./styles/SignUpIn.module.css";

const SignIn = () => {
  const handleSignIn = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:8081/auth/sign-in", {
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

      <p className={styles.signBox}>
        New here?
        <span className={styles.sign}>
          <Link to="/auth/sign-up">Sign Up</Link>
        </span>
      </p>
    </div>
  );
};

export default SignIn;