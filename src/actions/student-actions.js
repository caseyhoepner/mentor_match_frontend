export const setStudents = (studentInfo) => ({
  type: "SET_STUDENTS",
  students: studentInfo
});

export const setRelationships = (relationshipInfo) => ({
  type: "SET_RELATIONSHIPS",
  relationships: relationshipInfo
});

export const makeStudentInactive = (studentId) => ({
  type: "MAKE_STUDENT_INACTIVE",
  studentId
});