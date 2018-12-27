import { cleanMentors } from './helper';

export const fetchMentors = async () => {
  const url = 'https://mentor-match-api.herokuapp.com/api/v1/mentors';
  const response = await fetch(url);
  const mentors = await response.json();
  return cleanMentors(mentors);
};