import React from 'react';
import styled from "styled-components";
function Courses(props) {
    // convert the object to an array and sort alphabetically by course name
    const userCourses = Object.values(props.userCourses).sort((a, b) => a.name.localeCompare(b.name));

    function handleRemove(event) {
        console.log(event)
    }

    return (
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
                        <td> <button onClick={(event => handleRemove(event))} className="remove">Remove</button> </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Container>
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