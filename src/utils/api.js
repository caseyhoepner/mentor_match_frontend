import { cleanMentors } from './helper';

export const fetchMentors = async () => {
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/mentors';
  const response = await fetch(url);
  const mentors = await response.json();
  return cleanMentors(mentors);
};

export const postMentor = async (mentor) => {
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/mentors';
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    accept: "application/json",
    body: JSON.stringify(mentor)
  });
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
