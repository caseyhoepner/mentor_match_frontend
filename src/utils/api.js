import { cleanData, cleanRelationshipData } from './helper';

//need new fetch call for landing page to fetch mentors

export const fetchMentors = async (token) => {
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/mentors';
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/admin/mentors';
  const response = await fetch(url, {
    method: "GET",
    headers: {"Authorization": token }
  });
  const mentors = await response.json();
  return cleanData(mentors);
};

export const postMentor = async (mentor, token) => {
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/mentors';
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": token }, 
    accept: "application/json",
    body: JSON.stringify(mentor)
  });
  console.log(JSON.stringify(mentor))
  const status = await response.json();
  console.log(status);
};

export const patchMentor = async (mentor, token) => {
  //  const url = `https://mentor-match-api.herokuapp.com/api/v1/mentors/${mentor.id}`;
   const url = `https://mentor-match-api.herokuapp.com/api/v1/admin/mentors/${mentor.id}`;
   const response = await fetch(url, {
    method: "PATCH",
     headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token },
     body: JSON.stringify(mentor)
   });
   const status = await response.json();
   console.log(status);
 };

export const fetchStudents = async (token) => {
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/students';
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/admin/students';
  const response = await fetch(url, {
    method: "GET",
    headers: { "Authorization": token }
  });
  const students = await response.json();
  return cleanData(students);
};

export const postStudent = async (student, token) => {
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/students';
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/admin/students';
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": token }, 
    accept: "application/json",
    body: JSON.stringify(student)
  });
  const status = await response.json();
  console.log(status);
};

export const patchStudent = async (student, token) => {
  //  const url = `https://mentor-match-api.herokuapp.com/api/v1/students/${student.id}`;
   const url = `https://mentor-match-api.herokuapp.com/api/v1/admin/students/${student.id}`;
   const response = await fetch(url, {
    method: "PATCH",
     headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token },
     body: JSON.stringify(student)
   });
   const status = await response.json();
   console.log(status);
 };

export const fetchRelationships = async (token) => {
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/student_mentors';
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/admin/student_mentors';
  const response = await fetch(url, {
    method: "GET",
    headers: { "Authorization": token }
  });
  const relationships = await response.json();
  return cleanRelationshipData(relationships);
};

export const postRelationship = async (studentId, mentorId, token) => {
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/student_mentors';
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/admin/student_mentors';
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": token }, 
    accept: "application/json",
    body: JSON.stringify({
      student_id: studentId,
      mentor_id: mentorId
    })
  });
  const status = await response.json();
  console.log(status);
};

export const patchRelationship = async (studentId, mentorId, relationshipId, token) => {
  //  const url = `https://mentor-match-api.herokuapp.com/api/v1/student_mentors/${relationshipId}}`;
   const url = `https://mentor-match-api.herokuapp.com/api/v1/admin/student_mentors/${relationshipId}}`;
   const response = await fetch(url, {
    method: "PATCH",
     headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token },
    body: JSON.stringify({
      student_id: studentId,
      mentor_id: mentorId,
      active: false
    })
  });
   const status = await response.json();
   console.log(status);
 };