import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Eye, EyeOff } from "lucide-react";
import styles from "./styles/InputField.module.css";

const InputField = ({ 
  label, id, type, value, onChange, onFocus, onBlur, 
  isValid, isFocused, validationMessage, isRequired = true, inputRef
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
        <FontAwesomeIcon icon={faCheck} className={isValid && value ? styles.valid : styles.hide} />
        <FontAwesomeIcon icon={faTimes} className={!isValid && value ? styles.invalid : styles.hide} />
      </label>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          value={value}
          onChange={onChange}
          required={isRequired}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
        />
        {type === "password" && (
          <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        )}
      </div>
      {isFocused && value && !isValid && (
        <p className={styles.instructions}>
          <FontAwesomeIcon icon={faInfoCircle} /> {validationMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;