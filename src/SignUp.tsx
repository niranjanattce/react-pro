import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");

  const [confirmPassword,setConfirmPassword,] = useState("");
  const [error, setError] =useState<{name?: string; email?: string;password?: string;confirmPassword?: string;general?: string;}>({});

  function validate()
   {
    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const localErrors: {name?: string;email?: string;password?: string; confirmPassword?: string;} = {};
    let isValid = true;

    if (!name.trim())
      {
        localErrors.name ="Name is required";
        isValid = false;
      }

    if (!email.trim())
       {
        localErrors.email = "Email is required";
        isValid = false;
      } 
      else if (!emailRegex.test(email)) 
        {
           localErrors.email ="Enter valid email";
             isValid = false;
       }

    if (!password.trim())
       {
          localErrors.password = "Password is required";
          isValid = false;
       } 
       else if (password.length < 8 )
         {
            localErrors.password = "Password must be 8 characters";
             isValid = false;
         }

    if (!confirmPassword.trim())
       {
            localErrors.confirmPassword ="Confirm password required";
            isValid = false;
       } 
       else if (password !==confirmPassword)
         {
             localErrors.confirmPassword = "Passwords do not match";
              isValid = false;
         }
    if (!isValid) 
      {
        setError(localErrors);
        return;
      }
    
    const userData = {name, email: email.toLowerCase().trim(), password};
    localStorage.setItem( "registeredUser",JSON.stringify(userData));

    alert( "Registration Successful");
    navigate("/login");
  }

  return (
  <div className="login-container">
    <div className="login">
      <h1>Register</h1>

      <div className="input-group">
        {error.name && (<p>{error.name}</p>)}

        <input type="text"  placeholder="Enter Name" value={name} onChange={(e) => {
            setName(e.target.value);
            setError((prev) => ({...prev,name: "" }));}} />
      </div>

      <div className="input-group">
        {error.email && (<p>{error.email}</p> )}

        <input type="email"placeholder="Enter Email"value={email}  onChange={(e) => {
            setEmail(e.target.value);
            setError((prev) => ({...prev, email: "" }));}}/>
      </div>

      <div className="input-group">
        {error.password && ( <p>{error.password}</p>)}

        <input type="password" placeholder="Password"value={password} onChange={(e) => {
            setPassword(e.target.value);
            setError((prev) => ({ ...prev, password: "" })); }} />
      </div>

      <div className="input-group">
        {error.confirmPassword && (<p>{error.confirmPassword}</p>)}

        <input  type="password" placeholder="Confirm Password" value={ confirmPassword }onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError((prev) => ({...prev, confirmPassword: ""}));}}  />
      </div>

      <button onClick={validate}> Signup</button>

      <p className="login-text"> Already have an account?</p>

      <button className="link-btn"onClick={() =>  navigate("/login") }>Login</button>
    </div>
  </div>
);
}

export default SignUp;