import { useRef, useState, useEffect } from "react";
import InputField from "./InputField";
import styles from "./styles/AuthForm.module.css";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const AuthForm = ({ onSubmit, isSignUp }) => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validEmail || !validPassword || (isSignUp && !validMatch)) {
      setErrMsg("Invalid entry, please check your inputs.");
      return;
    }

    onSubmit({ email, password });
  };

  return (
    <section className={`${styles.section} ${isSignUp ? styles.signUp : styles.signIn}`}>
      <p ref={errRef} className={errMsg ? styles.errmsg : styles.none}>{errMsg}</p>
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          label="Email:"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          isValid={validEmail}
          isFocused={emailFocus}
          validationMessage="Enter a valid email address."
          inputRef={userRef}
        />

        <InputField
          label="Password:"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          isValid={validPassword}
          isFocused={passwordFocus}
          validationMessage="8 to 24 characters. Must include uppercase, lowercase, a number & a special character (!@#$%)."
        />

        {isSignUp && (
          <InputField
            label="Confirm Password:"
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setConfirmFocus(true)}
            onBlur={() => setConfirmFocus(false)}
            isValid={validMatch}
            isFocused={confirmFocus}
            validationMessage="Must match the password field."
          />
        )}

        <div className={styles.btnContainer}>
          <button className={styles.btn} disabled={!validEmail || !validPassword || (isSignUp && !validMatch)}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;