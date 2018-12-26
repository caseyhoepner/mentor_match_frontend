import * as SearchActions from '../actions/search-actions';
import { setLocale, setSearch } from './search-reducers';

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