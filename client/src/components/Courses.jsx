import React, {useEffect,useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {removeFromUserCourses} from "../routes";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Courses(props) {
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    // convert the object to an array and sort alphabetically by course name
    // const userCourses = Object.values(props.userCourses).sort((a, b) => a.name.localeCompare(b.name));
    const userCourses = Object.values(props.userCourses)

    useEffect(()=>{
        async function fetchUserData(){
            if (!localStorage.getItem("Courses")) navigate("/login");
            else setUserData(JSON.parse(localStorage.getItem("Courses")));
        }
        fetchUserData();
    }, [])


    async function handleRemove(course) {
        try {
            const data = await axios.post(removeFromUserCourses, { userID: userData._id, courseID: course._id });
            if (data.data.status) {
                // update the list of user courses
                props.setUserCourses(prevUserCourses => prevUserCourses.filter((c) => c._id !== course._id));
                // show a success message
                toast.success('Course removed successfully!', { position: toast.POSITION.BOTTOM_RIGHT,autoClose:1500 });
            }
        } catch (e) {
            console.error(e);
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
                            <td> <button onClick={() => handleRemove(course)} className="remove">Remove</button> </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Container>
            <ToastContainer/>
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