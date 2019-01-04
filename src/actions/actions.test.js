import * as GeneralActions from './';
import * as MentorActions from './mentor-actions';
import * as PreferencesActions from './preferences-actions';
import * as SearchActions from './search-actions';
import * as StudentActions from './student-actions';

const mockMentors = [
  {
    name: 'Casey',
    identity_preference: [
      'female-identifying'
    ],
    stack_preference: 'Front-End',
    meeting_location: 'Remote'
  },
  {
    name: 'Alex',
    identity_preference: [
      'male-identifying'
    ],
    stack_preference: 'Back-End',
    meeting_location: 'Denver'
  }
]

const mockMentor = {
  name: 'Jim Bob',
  identity_preference: [
    'Veteran'
  ],
  stack_preference: 'Back-End',
  meeting_location: 'Denver'
}

const mockFilters = {
  backEnd: false,
  female: false,
  frontEnd: false,
  lgbtq: true,
  male: false,
  parent: false,
  veteran: false
}

const mockStudents = [
  {
    name: 'Johan Von Roy',
    stack: 'Front-End'
  },
  {
    name: 'Claus Larson',
    stack: 'Back-End'
  }
]

const mockRelationships = [
  {
    mentor_id: 9,
    student_id: 22,
    active: true
  },
  {
    mentor_id: 2,
    student_id: 5,
    active: true
  }
]

describe('General Action creators', () => {
  it('should have a type of IS_LOADING', () => {
    const expectedLoading = {
      type: "IS_LOADING",
      isLoading: true
    }

    const result = GeneralActions.isLoading(true)
    expect(result).toEqual(expectedLoading)
  });

  it('should have a type of HAS_ERRORED', () => {
    const expected = {
      type: "HAS_ERRORED",
      hasErrored: true
    }

    const result = GeneralActions.hasErrored(true)
    expect(result).toEqual(expected)
  });
});

describe('Mentor Action creators', () => {
  it('should have a type of SET_MENTORS', () => {
    const expected = {
      type: "SET_MENTORS",
      mentors: [
        {
          name: 'Casey',
          identity_preference: [
            'female-identifying'
          ],
          stack_preference: 'Front-End',
          meeting_location: 'Remote'
        },
        {
          name: 'Alex',
          identity_preference: [
            'male-identifying'
          ],
          stack_preference: 'Back-End',
          meeting_location: 'Denver'
        }
      ]
    }

    const result = MentorActions.setMentors(mockMentors)
    expect(result).toEqual(expected)
  });

  it('should have a type of UPDATE_CHANGED_MENTOR', () => {
    const expected = {
      type: "UPDATE_CHANGED_MENTOR",
      mentor: {
        name: 'Jim Bob',
        identity_preference: [
          'Veteran'
        ],
        stack_preference: 'Back-End',
        meeting_location: 'Denver'
      }
    }

    const result = MentorActions.updateChangedMentor(mockMentor)
    expect(result).toEqual(expected)
  });

  it('should have a type of SET_MENTOR_MODAL', () => {
    const expected = {
      type: "SET_MENTOR_MODAL",
      modalInfo: {
        name: 'Jim Bob',
        identity_preference: [
          'Veteran'
        ],
        stack_preference: 'Back-End',
        meeting_location: 'Denver'
      }
    }

    const result = MentorActions.setMentorModal(mockMentor)
    expect(result).toEqual(expected)
  });

  it('should have a type of IS_EDITABLE', () => {
    const expected = {
      type: "IS_EDITABLE",
      isEditable: true
    }

    const result = MentorActions.isEditable(true)
    expect(result).toEqual(expected)
  });
});

describe('Preferences Action creators', () => {
  it('should have a type of CHANGE_MENTOR_FILTERS', () => {
    const expected = {
      type: "CHANGE_MENTOR_FILTERS",
      mentorFilters: {
        backEnd: false,
        female: false,
        frontEnd: false,
        lgbtq: true,
        male: false,
        parent: false,
        veteran: false
      }
    }

    const result = PreferencesActions.changeMentorFilters(mockFilters)
    expect(result).toEqual(expected)
  });
});

describe('Search Action creators', () => {
  it('should have a type of SET_LOCALE', () => {
    const expected = {
      type: "SET_LOCALE",
      locale: 'Denver'
    }

    const result = SearchActions.setLocale('Denver')
    expect(result).toEqual(expected)
  });

  it('should have a type of SET_SEARCH', () => {
    const expected = {
      type: "SET_SEARCH",
      searchTerm: 'Blerg'
    }

    const result = SearchActions.setSearch('Blerg')
    expect(result).toEqual(expected)
  });

  it('should have a type of TOGGLE_SHOWING_MENTORS', () => {
    const expected = {
      type: "TOGGLE_SHOWING_MENTORS",
      showingAllMentors: true
    }

    const result = SearchActions.toggleShowingMentors(true)
    expect(result).toEqual(expected)
  });
});

describe('Student Action creators', () => {
  it('should have a type of SET_STUDENTS', () => {
    const expected = {
      type: "SET_STUDENTS",
      students: [
        {
          name: 'Johan Von Roy',
          stack: 'Front-End'
        },
        {
          name: 'Claus Larson',
          stack: 'Back-End'
        }
      ]
    }

    const result = StudentActions.setStudents(mockStudents)
    expect(result).toEqual(expected)
  });

  it('should have a type of SET_RELATIONSHIPS', () => {
    const expected = {
      type: "SET_RELATIONSHIPS",
      relationships: [
        {
          mentor_id: 9,
          student_id: 22,
          active: true
        },
        {
          mentor_id: 2,
          student_id: 5,
          active: true
        }
      ]
    }

    const result = StudentActions.setRelationships(mockRelationships)
    expect(result).toEqual(expected)
  });
});