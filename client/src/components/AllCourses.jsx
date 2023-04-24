import React from 'react';
import styled from "styled-components";

function AllCourses(props) {
    const allCourses = Object.values(props.allCourses);

    return (
        <Container>
            <ul>
                {allCourses.map((course, index) => (
                    <li key={index}>{course.name}: {course.description}</li>
                ))}
            </ul>
        </Container>
    );
}

export default AllCourses;
const Container = styled.div`
`