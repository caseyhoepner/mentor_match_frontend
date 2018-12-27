import * as SearchActions from '../actions/search-actions';
import { setLocale, setSearch } from './search-reducers';
import { setMentors, isLoading, hasErrored } from './mentors-reducers';

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

    const result = setLocale('', mockLocale)
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

    const result = setSearch('', mockSearchTerm)
    expect(result).toEqual('')
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
});