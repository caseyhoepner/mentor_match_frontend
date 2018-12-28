import * as SearchActions from '../actions/search-actions';
import { setLocale, setSearch, toggleShowingMentors } from './search-reducers';
import { setMentors, setMentorModal, isLoading, hasErrored } from './mentors-reducers';

describe('isLoading', () => {
  it('should update state with the isLoading boolean', () => {
    const mockAction = { 
      type: "IS_LOADING",
      isLoading: true 
    }
    const expected = true

    const result = isLoading(false, mockAction)
    expect(result).toEqual(expected)
  });

  it('should return default state if nothing is passed in', () => {
    const mockAction = {
      isLoading: true
    }
    const expected = false

    const result = isLoading(undefined, mockAction)
    expect(result).toEqual(expected)
  });
});

describe('hasErrored', () => {
  it('should update state with the hasErrored boolean', () => {
    const mockAction = {
      type: "HAS_ERRORED",
      hasErrored: true
    }
    const expected = true

    const result = hasErrored(false, mockAction)
    expect(result).toEqual(expected)
  });

  it('should return default state if nothing is passed in', () => {
    const mockAction = {
      hasErrored: true
    }
    const expected = false

    const result = hasErrored(undefined, mockAction)
    expect(result).toEqual(expected)
  });
});

describe('setLocale reducer', () => {
  it('should update state with the locale passed in', () => {
    const mockAction = {
        type: "SET_LOCALE",
        locale: 'Remote'
    }
    const expected = 'Remote'

    const result = setLocale('', mockAction)
    expect(result).toEqual(expected)
  });

  it('should return original state as default', () => {
    const mockLocale = 'Remote'

    const result = setLocale(undefined, mockLocale)
    expect(result).toEqual('')
  });
});

describe('setSearch', () => {
  it('should update state with the search terms', () => {
    const mockAction = {
      type: "SET_SEARCH",
      searchTerm: 'skwijb'
    }
    const expected = 'skwijb'

    const result = setSearch('', mockAction)
    expect(result).toEqual(expected)
  });

  it('should return original state as default', () => {
    const mockSearchTerm = 'skwijb'

    const result = setSearch(undefined, mockSearchTerm)
    expect(result).toEqual('')
  });
});

describe('toggleShowingMentors', () => {
  it('should toggle the state if all mentors are showing', () => {
    const mockAction = {
      type: "TOGGLE_SHOWING_MENTORS",
      showingAllMentors: true
    }

    const result = toggleShowingMentors(undefined, mockAction)
    expect(result).toEqual(true)
  });

  it('should return false as the default state', () => {
    const mockAction = {
      showingAllMentors: true
    }

    const result = toggleShowingMentors(undefined, mockAction)
    expect(result).toEqual(false)
  });
});

describe('setMentors', () => {
  it('should update state with the array of mentors', () => {
    const mockAction = {
      type: "SET_MENTORS",
      mentors: [ { name: 'Stannis', preferences: { title: 'Doin\' stuff' } } ]
    }
    const expected = [ { name: 'Stannis', preferences: { title: 'Doin\' stuff' } } ]

    const result = setMentors([], mockAction)
    expect(result).toEqual(expected)
  });

  it('should update existing mentor array in state with changes', () => {
    const mockState = [ 
      { id: 2, name: 'Stannis', preferences: { title: 'Doin\' stuff' } },
      { id: 3, name: 'Maurey', preferences: { title: 'Doin\' more stuff' } }
    ]
    const mockAction = {
      type: "UPDATE_CHANGED_MENTOR",
      mentor: { id: 2, name: 'Robert', preferences: { title: 'Doin\' stuff' } }
    }
    const expected = [ 
      { id: 2, name: 'Robert', preferences: { title: 'Doin\' stuff' } },
      { id: 3, name: 'Maurey', preferences: { title: 'Doin\' more stuff' } }
    ]

    const result = setMentors(mockState, mockAction)
    expect(result).toEqual(expected)
  });

  it('should return original state as default', () => {
    const mockAction = {
      mentors: [ { name: 'Stannis', preferences: { title: 'Doin\' stuff' } } ]
    }
    const expected = []

    const result = setMentors(undefined, mockAction)
    expect(result).toEqual(expected)
  });
});

describe('setMentorModal', () => {
  it('should update state with new mentor object for the modal', () => {
    const mockAction = {
      type: "SET_MENTOR_MODAL",
      modalInfo: { name: 'carrie hairy', city: 'halle berry', preferences: { title: 'Doin\' Stuff' } }
    }
    const expected = { name: 'carrie hairy', city: 'halle berry', preferences: { title: 'Doin\' Stuff' } }

    const result = setMentorModal({}, mockAction)
    expect(result).toEqual(expected)
  });

  it('should return state of null as a default', () => {
    const mockAction = {
      modalInfo: { name: 'carrie hairy', city: 'halle berry', preferences: { title: 'Doin\' Stuff' } }
    }
    
    const result = setMentorModal(undefined, mockAction)
    expect(result).toEqual(null)
  });
});