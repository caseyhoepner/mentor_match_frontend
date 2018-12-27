export const cleanMentors = (mentors) => {
  return mentors.data.map(mentor => {
    return mentor.attributes;
  })
}