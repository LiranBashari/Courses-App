import React from 'react';
import styled from "styled-components";

function Courses(props) {
    // convert the object to an array
    const userCourses = Object.values(props.userCourses);

    return (
        <Container>
            <table>
                <thead>
                <tr>
                    <th style={{width: "30%"}}>Course Name</th>
                    <th style={{width: "70%"}}>Description</th>
                </tr>
                </thead>
                <tbody>
                {userCourses.map((course, index) => (
                    <tr key={index}>
                        <td style={{width: "30%", fontWeight: "bold"}}>{course.name}</td>
                        <td style={{width: "70%"}}>{course.description}</td>
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
`