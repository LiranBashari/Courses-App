import React from 'react';
import styled from "styled-components";

function Courses(props) {
    // convert the object to an array
    const userCourses = Object.values(props.userCourses);
    return (
        <Container>
            <ul>
                {userCourses.map((course, index) => (
                    <li key={index}>{course.name}: {course.description}</li>
                ))}
            </ul>
        </Container>
    );
}

export default Courses;
const Container = styled.div`
`