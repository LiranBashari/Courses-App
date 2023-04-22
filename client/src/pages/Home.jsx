import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Logo from "../logo.svg"
import Courses from "../components/Courses";
import Updates from "../components/Updates";
import AllCourses from "../components/AllCourses"

function Home() {
    const [userData, setUserData] = useState({})
    const [showAllCourses, setShowAllCourses] = useState(false);
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
                <div className="button-container">
                    <button>Create Course</button>
                    <button onClick={() => setShowAllCourses(!showAllCourses)}>
                        {showAllCourses ? "Back to Home" : "All Courses"}
                    </button>
                    <button>Logout</button>
                </div>
            </div>

            {showAllCourses ? (
                <AllCourses />
            ) : (
                <div className="body-container">
                    <Courses />
                    <Updates />
                </div>
            )}

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
      margin: 0 auto;
      .search {
        border-radius: 2rem;
        border-color: #61dafb;
        padding: 0.8rem 1.5rem 0.8rem 3rem;
        font-size: larger;
        background-color: transparent;
      }
    }
    .button-container{
      button{
        display: inline-block;
        outline: 0;
        border: none;
        box-shadow: none;
        cursor: pointer;
        padding: 7px 16px;
        font-size: 18px;
        height: 45px;
        font-weight: 400;
        color: #fff;
        text-align: center;
        line-height: normal;
        background: linear-gradient(90deg,#299fff 0,#0074e4 100%);
        border-radius: 50px;
        transition: color .2s ease,background-color .2s ease,box-shadow .2s ease;
        margin-right: 10px;
        :hover{
          box-shadow: 0 0 0 0.15rem #5ceace;
          transform: scale(1.04);
        } 
      }
    }
  }

  .body-container {
    display: flex;
    flex-direction: row;
  }

  .body-container > :first-child {
    width: 65%;
  }

  .body-container > :last-child {
    width: 35%;
  }

`;

