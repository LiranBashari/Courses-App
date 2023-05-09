import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {addToUserCourses} from "../routes";
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {useNavigate} from "react-router-dom";


function AllCourses(props) {
    const [userData, setUserData] = useState({})
    const allCourses = Object.values(props.allCourses);
    const userCourses = Object.values(props.userCourses)//.sort((a, b) => a.name.localeCompare(b.name));
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchUserData(){
            if (!localStorage.getItem("Courses")) navigate("/login");
            else setUserData(JSON.parse(localStorage.getItem("Courses")));
        }
        fetchUserData();
    }, [])

    function sortAllCourses() {
        const diff = allCourses.filter(course => !userCourses.some(userCourse => userCourse.name === course.name));
        return userCourses.concat(diff.sort((a, b) => a.name.localeCompare(b.name)));
    }


    async function handleAdd(course) {
        if (!course) {
            console.error('Course object is undefined');
            return;
        }
        const newCourse = {
            userID: userData._id,
            name: course.name,
            description: course.description,
        };
        const data = await axios.post(addToUserCourses, newCourse);
        if (data.data.status) {
            // update the list of user courses
            props.setUserCourses([...userCourses, {_id: course._id, name:course.name, description: course.description}]);
            toast.success('Course added successfully!', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000});
        }
    }

    return (
        <>
            <Container>
                <table>
                    <thead>
                    <tr>
                        <th style={{width: "30%"}}>Course Name</th>
                        <th style={{width: "70%"}} colSpan={2} >Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortAllCourses(allCourses).map((course, index) => (
                        userCourses.some(userCourse => userCourse._id === course._id) ? (
                            <tr key={index}>
                                <td style={{width: "30%", fontWeight: "bold"}}>{course.name}</td>
                                <td style={{width: "70%"}} colSpan={2}>{course.description}</td>
                            </tr>
                        ) : (
                            <tr key={index}>
                                <td style={{width: "30%", fontWeight: "bold"}}>{course.name}</td>
                                <td style={{width: "70%"}}>{course.description}</td>
                                <td> <button onClick={() => handleAdd(course)} className="add">ADD</button> </td>
                            </tr>
                        )
                    ))}
                    </tbody>
                </table>
            </Container>
            <ToastContainer/>
        </>
    );
}

export default AllCourses;

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
  .add{
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
`;
