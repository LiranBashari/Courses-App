import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from "axios";
import { removeFromUserCourses } from "../routes";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Modal from 'react-modal';

function Courses(props) {
    const [userData, setUserData] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [courseToRemove, setCourseToRemove] = useState(null);
    const navigate = useNavigate()
    // convert the object to an array and sort alphabetically by course name
    // const userCourses = Object.values(props.userCourses).sort((a, b) => a.name.localeCompare(b.name));
    const userCourses = Object.values(props.userCourses)

    useEffect(() => {
        async function fetchUserData() {
            if (!localStorage.getItem("Courses")) navigate("/login");
            else setUserData(JSON.parse(localStorage.getItem("Courses")));
        }
        fetchUserData();
    }, [])


    async function handleRemove(course) {
        try {
            if (!course) {
                console.error('Course object is undefined');
                return;
            }
            setCourseToRemove(course);
            setShowModal(true);
        } catch (e) {
            console.error(e);
        }
    }

    async function handleConfirmRemove() {
        try {
            const data = await axios.post(removeFromUserCourses, { userID: userData._id, courseID: courseToRemove._id });
            if (data.data.status) {
                // update the list of user courses
                props.setUserCourses(prevUserCourses => prevUserCourses.filter((c) => c._id !== courseToRemove._id));
                // show a success message
                toast.success('Course removed successfully!', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500 });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setCourseToRemove(null);
            setShowModal(false);
        }
    }

    return (
        <>
            <Container>
                <table>
                    <thead>
                    <tr>
                        <th style={{ width: "30%" }}>Course Name</th>
                        <th style={{ width: "70%" }} colSpan={2}>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userCourses.map((course, index) => (
                        <tr key={index}>
                            <td style={{ width: "30%", fontWeight: "bold" }}>{course.name}</td>
                            <td style={{ width: "70%" }}>{course.description}</td>
                            <td>
                                <button onClick={() => handleRemove(course)} className="remove">Remove</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Container>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Confirmation Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.58)',
                    },
                    content: {
                        backgroundColor: 'rgba(255,255,255,0.85)',
                        width: '400px',
                        height: '200px',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '2rem',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'black transparent',

                    },
                }}>
                <h2>Are you sure you want to remove this course?</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '30px' }}>
                    <button
                        onClick={handleConfirmRemove}
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
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#599ef8'}
                    >Yes</button>
                    <button onClick={() => setShowModal(false)}
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
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#ea5647'}
                    >No</button>
                </div>
            </Modal>
            <ToastContainer />

        </>
    );
}
export default Courses;

const Container = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    
    tr {
      cursor: pointer;
      &:nth-child(even) {
        background-color: #a2cddc;
      }
      &:hover {
        background-color: rgb(85, 85, 157);
      }
    }

    tr, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid black;
    }
    th {
      background-color: #299fff;
      color: white;
      padding: 10px;
    }
  }
  .remove{
    display: inline-block;
    outline: 0;
    border: none;
    box-shadow: none;
    cursor: pointer;
    font-size: 16px;
    height: 25px;
    font-weight: 400;
    color: #fff;
    text-align: center;
    line-height: normal;
    background: linear-gradient(90deg, #299fff 0, #0074e4 100%);
    transition: color .2s ease, background-color .2s ease, box-shadow .2s ease;
    margin-right: 10px;
    :hover {
      box-shadow: 0 0 0 0.15rem #5ceace;
      transform: scale(1.04);
    }
  }

`