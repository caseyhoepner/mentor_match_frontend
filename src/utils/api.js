import { cleanData, cleanRelationshipData } from './helper';

export const fetchMentors = async () => {
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/mentors';
  const response = await fetch(url);
  const mentors = await response.json();
  return cleanData(mentors);
};

export const postMentor = async (mentor) => {
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/mentors';
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    accept: "application/json",
    body: JSON.stringify(mentor)
  });
  console.log(JSON.stringify(mentor))
  const status = await response.json();
  console.log(status);
};

export const patchMentor = async (mentor) => {
   const url = `https://mentor-match-api.herokuapp.com/api/v1/mentors/${mentor.id}`;
   const response = await fetch(url, {
    method: "PATCH",
     headers: { "Content-Type": "application/json", "Accept": "application/json" },
     body: JSON.stringify(mentor)
   });
   const status = await response.json();
   console.log(status);
 };

export const fetchStudents = async () => {
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/students';
  const response = await fetch(url);
  const students = await response.json();
  return cleanData(students);
};

export const postStudent = async (student) => {
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/students';
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    accept: "application/json",
    body: JSON.stringify(student)
  });
  const status = await response.json();
  console.log(status);
};

export const patchStudent = async (student) => {
   const url = `https://mentor-match-api.herokuapp.com/api/v1/students/${student.id}`;
   const response = await fetch(url, {
    method: "PATCH",
     headers: { "Content-Type": "application/json", "Accept": "application/json" },
     body: JSON.stringify(student)
   });
   const status = await response.json();
   console.log(status);
 };

export const fetchRelationships = async () => {
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/student_mentors';
  const response = await fetch(url);
  const relationships = await response.json();
  return cleanRelationshipData(relationships);
};

export const postRelationship = async (studentId, mentorId) => {
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/student_mentors';
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    accept: "application/json",
    body: JSON.stringify({
      student_id: studentId,
      mentor_id: mentorId
    })
  });
  const status = await response.json();
  console.log(status);
};

export const patchRelationship = async (studentId, mentorId, relationshipId) => {
   const url = `https://mentor-match-api.herokuapp.com/api/v1/student_mentors/${relationshipId}}`;
   const response = await fetch(url, {
    method: "PATCH",
     headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      student_id: studentId,
      mentor_id: mentorId,
      active: false
    })
  });
   const status = await response.json();
   console.log(status);
 };