import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";


import { register } from "../../actions/auth";

const Register = (props) => {
    
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch(); 

    const handleRegister = (e) => {
        e.preventDefault();

        //setloading
        setSuccessful(false);

        dispatch(register("peta", "g@b.com", "1234", "1234"))
        .then(() => {
            setSuccessful(true);
        })
        .catch(() => {
            setSuccessful(false);
        });
    };    
    return (
        <div>
          {console.log(message)}
          {successful && <span>Loading</span>}
          {/* {message && <p>{message.map((error)=>)}</p>} */}
          <button onClick={handleRegister}>
            Register
          </button>
        </div>
    );
}
export default Register;