import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

function Home() {
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchUserData(){
            if (!localStorage.getItem("Courses")) navigate("/login");
            else {
                setUserData(JSON.parse(localStorage.getItem("Courses")))
            }
        }
        fetchUserData();
    }, [])
    return (
        <Container >
            <div className="header">
                <h1>
                    Welcome {userData.username}!
                </h1>
            </div>
            <div className="courses">

            </div>
        </Container>
    );
}

export default Home;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color:#b7edfc;
  
  .header{
    

  }
  
  .courses{
    
  }
    `;