export const setStudents = (state = [], action) => {
  switch(action.type) {

    case 'SET_STUDENTS':
      return action.students;

    case 'UPDATE_CHANGED_STUDENT':

      return state.map(student => {
        if (student.id === action.student.id) {
          return action.student;
        } else {
          return student;
        }
      })

    case 'MAKE_STUDENT_INACTIVE':
      return state.map(student => {
        if (student.id === action.studentId) {
          console.log(student, 'before')
          student.active = false;
          student.matched = true;
          console.log(student, 'after')
          return student;
        } else {
          return student;
        }
      })

    default:
      return state;
  }
}

export const setRelationships = (state = [], action) => {
  switch(action.type) {

    case 'SET_RELATIONSHIPS':
      return action.relationships;

    default:
      return state;
  }
}

