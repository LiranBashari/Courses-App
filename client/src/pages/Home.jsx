import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Logo from "../logo.svg"
import Courses from "../components/Courses";
import AllCourses from "../components/AllCourses"
import {getCourses, getUserCourses, addToAllCourses, addToUserCourses} from "../routes";
import axios from "axios";
import Modal from 'react-modal';
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button, AppBar, Toolbar, Typography} from '@material-ui/core';

function Home() {
    const [userData, setUserData] = useState({})
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const navigate = useNavigate()
    const [allCourses, setAllCourses] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const toastOptions = {position:"bottom-right", pauseOnHover:true, draggable:true}

    useEffect(()=>{
        async function fetchUserData(){
            if (!localStorage.getItem("Courses")) navigate("/login");
            else setUserData(JSON.parse(localStorage.getItem("Courses")));
        }
        fetchUserData();
    }, [])

    useEffect(() => {
        async function fetchCourses() {
            const courses = await axios.get(getCourses);
            setAllCourses(courses.data.courses);
        }
        fetchCourses();
    }, []);

    useEffect(() => {
        async function fetchUserCourses() {
            const userCourses = await axios.post(getUserCourses, {userData});
            if (userCourses.data.status){
                setUserCourses(userCourses.data.userCourses.courses);
            }
        }
        fetchUserCourses();
    }, [userData]);

    const handleCancelModal = () => {
        setCourseName("");
        setCourseDescription("");
        // close the modal
        setModalIsOpen(false);
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/login")
    }

    const handleCreateCourse = async () => {
        // check if the course name is not empty
        if (courseName.trim() !== "") {
            // create a new course object with the name and description
            const newCourse = {
                userID: userData._id,
                name: courseName,
                description: courseDescription,
            };
            try {
                // send to server for validation and save in DB
                const allData = await axios.post(addToAllCourses, newCourse);
                const userData = await axios.post(addToUserCourses, newCourse);
                if (allData.data.status && userData.data.status){
                    // update the list of user courses
                    setUserCourses([...userCourses, newCourse]);
                    // update the list of all courses
                    setAllCourses([...allCourses, newCourse]);
                    handleCancelModal()
                } else {
                    toast.error(allData.data.msg, toastOptions)
                    handleCancelModal()
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
            <>
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
                            <button onClick={()=> setModalIsOpen(true)} >Create Course</button>

                            <button onClick={() => setShowAllCourses(!showAllCourses)}>
                                {showAllCourses ? "Back to Home" : "All Courses"}
                            </button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    {showAllCourses ? (
                        <AllCourses allCourses={allCourses} userCourses={userCourses} setUserCourses={setUserCourses}/>
                    ) : (
                        <div className="body-container">
                            <Courses userCourses={userCourses} setUserCourses={setUserCourses}/>
                        </div>
                    )}
                    <Modal
                        appElement={document.getElementById('root')}
                        isOpen={modalIsOpen}
                        onRequestClose={() => handleCancelModal()}
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0,0,0,0.58)',
                            },
                            content: {
                                backgroundColor: 'rgba(255,255,255,0.85)',
                                width: '500px',
                                height: '300px',
                                margin: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: '2rem',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'black transparent',

                            },
                        }}>
                        <h2>Create a New Course</h2>
                        <form className="form">
                            <label style={{marginBottom: '10px'}}>
                                Course Name:
                                <input
                                    type="text"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    style={{
                                        border: "0.1rem solid black",
                                        borderBottom: '2px solid black',
                                        backgroundColor: 'transparent',
                                        padding: '5px',
                                        fontSize: '1.2rem',
                                        borderRadius: '0.5rem',
                                        width: '100%',
                                    }}

                                />
                            </label>
                            <label>
                                Course Description:
                                <textarea
                                    value={courseDescription}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                    style={{
                                        border: "0.1rem solid black",
                                        borderBottom: '2px solid black',
                                        backgroundColor: 'transparent',
                                        padding: '5px',
                                        fontSize: '1.2rem',
                                        borderRadius: '0.5rem',
                                        width: '100%',
                                        resize: 'vertical', /* set vertical resize only */
                                    }}
                                />
                            </label>
                            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '20px' }}>
                                <Button
                                    onClick={handleCreateCourse}
                                    style={{
                                        backgroundColor: '#599ef8',
                                        color: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#b1d2fc'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#599ef8'}>
                                    Create
                                </Button>
                                <Button
                                    onClick={handleCancelModal}
                                    style={{
                                        backgroundColor: '#ea5647',
                                        color: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        transition: 'background-color 0.3s ease-in-out', // add transition for smooth color change
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#fda498'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ea5647'}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Modal>
                </Container>
                <ToastContainer/>
            </>

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

    .button-container {
      button {
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
        background: linear-gradient(90deg, #299fff 0, #0074e4 100%);
        border-radius: 50px;
        transition: color .2s ease, background-color .2s ease, box-shadow .2s ease;
        margin-right: 10px;

        :hover {
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
    width: 100%;
  }

`;
