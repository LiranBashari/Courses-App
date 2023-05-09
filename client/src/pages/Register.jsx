import React, {useState} from 'react';
import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom";
import Logo from "../logo.svg"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {register} from "../routes";
import axios from "axios"

function Register() {

    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const toastOptions = {position:"bottom-right", pauseOnHover:true, draggable:true}
    const navigate = useNavigate()

    function handleChange(event) {
        setValues({...values, [event.target.name]: event.target.value});
    }

    function isValid() {
        if (values.username.length < 3){
            toast.error("User name must have more than 3 characters",toastOptions)
            return false;
        } else if (values.email === ""){
            toast.error("Email is required",toastOptions)
            return false;
        } else if (values.password.length < 6){
            toast.error("Password must have more than 8 characters",toastOptions)
            return false;
        } else if (values.password !== values.confirmPassword){
            toast.error("Password and Confirm Password must be the same",toastOptions)
            return false;
        }
        return true
    }

    async function handelSubmit(event) {
        event.preventDefault();
        if (isValid()){
            // send it to the server for saving the data in DB
            const data = await axios.post(register, values)
            if (data.data.status === false) toast.error(data.data.msg, toastOptions);
            else {
                localStorage.setItem('Courses', JSON.stringify(data.data.newUser));
                navigate('/');
            }
        }
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event => handelSubmit(event))}>
                    <div className="header">
                        <img src={Logo} alt="logo"/>
                        <h1>Courses App</h1>
                    </div>
                    <input className="input" type="text" name="username" placeholder="User name" onChange={(event)=> handleChange(event)}/>
                    <input className="input" type="text" name="email" placeholder="Email" onChange={(event)=> handleChange(event)}/>
                    <input className="input" type="password" name="password" placeholder="Password" onChange={(event)=> handleChange(event)}/>
                    <input className="input" type="password" name="confirmPassword" placeholder="Confirmed Password" onChange={(event)=> handleChange(event)}/>
                    <button type="submit"> Create User</button>
                    <p>ALREADY HAVE AN ACCOUNT ? <Link className="link" to="/login"> Login</Link></p>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>

    );
}

export default Register;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(31, 31, 45);
  
  .header{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    img{
      height: 4rem;
    }
    h1{
      color: white;
    }
  }
  form {
    background-color: rgb(50, 50, 65);
    padding: 3rem 5rem 3rem 5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 2rem;
  }
  input{
    background-color: transparent;
    padding: 0.8rem;
    border: 0.1rem solid #b7edfc;
    border-radius: 0.5rem;
    font-size: 1rem;
    color: white;
  }
  button {
    background-color: #b7edfc;
    cursor: pointer;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight : bold;
    &:hover {
      background-color: rgb(31, 31, 45);
      color: #b7edfc;
    }
  }
  p{
    color: white;
    font-family: Cursive,serif;
  }
  .link{
    color: #61dafb;
    &:hover {
      color: red;
    }
  }
`;