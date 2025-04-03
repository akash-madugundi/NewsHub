import AuthForm from "./AuthForm";
import styles from "./styles/SignUpIn.module.css";

const AdminSignIn = () => {
  const handleAdminSignIn = async ({ email, password }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/admin`, {
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
      window.location.href = "/admin";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to NewsHub!!!</h1>
      <p>Your daily source of news updates</p>
      
      <AuthForm onSubmit={handleAdminSignIn} isSignUp={false} isAdmin={true}/>

    </div>
  );
};

export default AdminSignIn;