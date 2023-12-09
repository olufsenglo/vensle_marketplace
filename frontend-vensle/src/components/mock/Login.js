import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";




import { login } from "../../actions/auth";

const Login = (props) => {
    
    const [loading, setLoading] = useState(false);
  
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
  
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
    
        setLoading(true);

	      dispatch(login("b@b.com", "1234"))
        .then(() => {
	        console.log("LoggedIn");
          //navigate("/profile");
          //window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    };

  if (isLoggedIn) {
    console.log("loggedIn");
  }
  return (
    <div>






      {loading && <span>Loading</span>}
      {message && <p>{message}</p>}
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;