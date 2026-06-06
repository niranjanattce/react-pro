import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ email?: string; password?: string;general?: string;}>({});

  function validateLogin()
   {
    const localErrors: { email?: string; password?: string;} = {};
    let isValid = true;
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim())
       {
         localErrors.email = "Email is required";
          isValid = false;
        }
     else if (!emailRegex.test(email))
       {
        localErrors.email = "Enter valid email";
         isValid = false;
       }



    if (!password.trim()) 
      {
        localErrors.password = "Password required";
         isValid = false;
      }
    if (!isValid) 
      {
      setError(localErrors);
      return;
      }


    const storedUser = localStorage.getItem( "registeredUser" );
    if (!storedUser) {
      setError({ general:"No account found. Register first",});
      return;
    }
    const user = JSON.parse(storedUser);
    if (email.toLowerCase().trim() ===user.email &&password === user.password)
       {
          navigate("/product");
       } 
      else 
        {
            setError({ general:"Invalid email or password",});
        }
  }
return (
  <div className="login-container">
    <div className="login">
      <h1>Login</h1>

      {error.general && (
        <p className="general-error">
          {error.general}
        </p>
      )}

      <div className="input-group">
        {error.email && (<p>{error.email}</p>)}

        <input type="email" placeholder="Enter Email"value={email} onChange={(e) => {
            setEmail(e.target.value);
            setError((prev) => ({...prev,email: "",})); }}/>
      </div>

      <div className="input-group">
        {error.password && ( <p>{error.password}</p> )}

        <input type="password" placeholder="Enter Password"value={password} onChange={(e) => {
            setPassword(e.target.value);
            setError((prev) => ({...prev,password: "",})); }} />
      </div>

      <button onClick={validateLogin}>
        Login
      </button>

      <p className="login-text"> Don't have an account?</p>

      <button  className="link-btn" onClick={() =>navigate("/signup")}> Register</button>
    </div>
  </div>
);
}

export default Login;