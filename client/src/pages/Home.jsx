import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Logo from "../logo.svg"

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
                <div className="details">
                    <img src={Logo}/>
                    <h1>{userData.username}</h1>
                </div>
                <div className="search-container">
                    <input className="search" type="text" placeholder="Search for courses..."/>
                </div>
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
  background-color: #b7edfc;

  .header {
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    flex-direction: row;
    align-items: center;


    .details {
      font-size: small;
      display: flex;
      flex-direction: row;
      color: #299fff;

      img {
        height: 2rem;
        padding-top: 1.3rem;
        padding-right: 0.3rem;
      }
    }

    .search-container {
      margin: 0 auto; /* center the container horizontally */
      .search {
        border-radius: 2rem;
        padding: 0.8rem 2rem 0.8rem 3rem;
        font-size: larger;
      }
    }
  }


`;
