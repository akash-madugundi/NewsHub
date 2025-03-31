import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import styles from "./styles/SignUpIn.module.css";

const SignUp = () => {
  const handleSignUp = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:8081/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert(data.message);
      window.location.href = "/auth/sign-in";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to NewsHub!!!</h1>
      <p>Your daily source of news updates</p>

      <AuthForm onSubmit={handleSignUp} isSignUp={true} />

      <p className={styles.adminBox}>
        Admin?
        <span className={styles.admin}>
          <Link to="/auth/admin">Click Here</Link>
        </span>
      </p>
    </div>
  );
};

export default SignUp;