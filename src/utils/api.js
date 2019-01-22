import { cleanData, cleanRelationshipData } from './helper';

//need new fetch call for landing page to fetch mentors

export const fetchMentors = async () => {
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/mentors';
  const url = 'https://quiet-bastion-15603.herokuapp.com/api/v1/mentors'
  const response = await fetch(url);
  const mentors = await response.json();
  return cleanData(mentors);
};

export const adminFetchMentors = async (token) => {
  const url = 'https://quiet-bastion-15603.herokuapp.com/api/v1/admin/mentors'
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token }
  });
  const mentors = await response.json();
  return cleanData(mentors);
}

export const postMentor = async (mentor, token) => {
  console.log(mentor, 'mentor')
  console.log(token, 'token')
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/mentors';
  // const url = 'https://quiet-bastion-15603.herokuapp.com/api/v1/admin/mentors';
  const url = 'https://quiet-bastion-15603.herokuapp.com/api/v1/mentors';
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token }, 
    accept: "application/json",
    body: JSON.stringify(mentor)
  });
  console.log(JSON.stringify(mentor))
  const status = await response.json();
  console.log(status);
};

export const patchMentor = async (mentor, token) => {
  //  const url = `https://mentor-match-api.herokuapp.com/api/v1/mentors/${mentor.id}`;
  //  const url = `https://mentor-match-api.herokuapp.com/api/v1/admin/mentors/${mentor.id}`;
   const url = `https://quiet-bastion-15603.herokuapp.com/api/v1/admin/mentors/${mentor.id}`;
   const response = await fetch(url, {
    method: "PATCH",
     headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token },
     body: JSON.stringify(mentor)
   });
   const status = await response.json();
   console.log(status);
 };

export const fetchStudents = async (token) => {
  console.log(token, 'student token')
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/students';
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/admin/students';
  const url = 'https://quiet-bastion-15603.herokuapp.com/api/v1/admin/students';
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token }
  });
  const students = await response.json();
  return cleanData(students);
};

export const postStudent = async (student, token) => {
  console.log(student, 'student')
  console.log(token, 'token')
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/students';
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/admin/students';
  const url = 'https://quiet-bastion-15603.herokuapp.com/api/v1/admin/students';
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token }, 
    accept: "application/json",
    body: JSON.stringify(student)
  });
  const status = await response.json();
  console.log(status);
};

export const patchStudent = async (student, token) => {
  //  const url = `https://mentor-match-api.herokuapp.com/api/v1/students/${student.id}`;
  //  const url = `https://mentor-match-api.herokuapp.com/api/v1/admin/students/${student.id}`;
   const url = `https://quiet-bastion-15603.herokuapp.com/api/v1/admin/students/${student.id}`;
   const response = await fetch(url, {
    method: "PATCH",
     headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token },
     body: JSON.stringify(student)
   });
   const status = await response.json();
   console.log(status);
 };

export const fetchRelationships = async (token) => {
  console.log(token, 'relationship token')
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/student_mentors';
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/admin/student_mentors';
  const url = 'https://quiet-bastion-15603.herokuapp.com/api/v1/admin/student_mentors';
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token }
  });
  const relationships = await response.json();
  return cleanRelationshipData(relationships);
};

export const postRelationship = async (studentId, mentorId, token) => {
  console.log(studentId, 'studentId')
  console.log(mentorId, 'mentorId')
  console.log(token, 'token')
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/student_mentors';
  // const url = 'https://mentor-match-api.herokuapp.com/api/v1/admin/student_mentors';
  const url = 'https://quiet-bastion-15603.herokuapp.com/api/v1/admin/student_mentors';
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": token }, 
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
  //  const url = `https://mentor-match-api.herokuapp.com/api/v1/admin/student_mentors/${relationshipId}}`;
   const url = `https://quiet-bastion-15603.herokuapp.com/api/v1/admin/student_mentors/${relationshipId}}`;
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