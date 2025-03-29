import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Register.module.css";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; // A letter followed by 3 letters or numbers
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // Min 8, a small, a caps, a num, a special

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const isValid = EMAIL_REGEX.test(user);
    setValidName(isValid);
  }, [user]);

  useEffect(() => {
    const isValid = PWD_REGEX.test(pwd);
    setValidPwd(isValid);
    const isMatch = pwd === matchPwd;
    setValidMatch(isMatch);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validName || !validPwd || !validMatch) {
      setErrMsg("Invalid entry, please check your inputs.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user,
          password: pwd,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
  
      setUser("");
      setPwd("");
      setMatchPwd("");
      setErrMsg("");
      alert("Registration successful! You can now log in.");
    } catch (error) {
      setErrMsg(error.message);
    }
  };  

  return (
    <div className={styles.container}>
      <h1>Welcome to NewsHub!!!</h1>
      <p>Your daily source of news updates</p>
      <section className={styles.section}>
        <p ref={errRef} className={errMsg ? styles.errmsg : styles.none}>
          {errMsg}
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            Email:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={!validName && user ? styles.invalid : styles.hide}
            />
          </label>
          <input
            className={styles.input}
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            className={
              userFocus && user && !validName ? styles.instructions : styles.none
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Enter a valid e-mail address.
          </p>

          <label htmlFor="password" className={styles.label}>
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={!validPwd && pwd ? styles.invalid : styles.hide}
            />
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p className={pwdFocus && !validPwd ? styles.instructions : styles.none}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase, lowercase letters, a number and a special
            character(! @ # $ %)
          </p>

          <label htmlFor="cfm_password" className={styles.label}>
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={!validMatch && matchPwd ? styles.invalid : styles.hide}
            />
          </label>
          <input
            className={styles.input}
            type="password"
            id="cfm_password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p className={matchFocus && !validMatch ? styles.instructions : styles.none}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          <div className={styles["btn-container"]}>
            <button className={styles.btn} disabled={!validName || !validPwd || !validMatch}>
              Sign Up
            </button>
          </div>
        </form>
        <p className={styles.signInBox}>
          Already registered?
          <span className={styles.signIn}>
            <Link to="/auth/login">Sign In</Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Register;
