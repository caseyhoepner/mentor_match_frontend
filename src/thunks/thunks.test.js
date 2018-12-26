import { retrieveMentors } from './fetchMentors';
import { isLoading, hasErrored } from '../actions';
import { setMentors } from '../actions/mentor-actions';
import * as API from '../utils/api';

describe('retriveMentors thunk', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  it('should dispatch with the isLoading action', () => {
    const thunk = retrieveMentors()

    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  });

  it('should fire retrieveMentors', () => {
    API.fetchMentors = jest.fn()
    const thunk = retrieveMentors()

    thunk(mockDispatch)

    expect(API.fetchMentors).toHaveBeenCalled()
  });

  it('should dispatch with isLoading(false) with fetch returns data', async () => {
    API.fetchMentors = jest.fn(() => Promise.resolve([ { name: 'Dan', preferences: { title: 'Being Dan' } } ]))
    const thunk = await retrieveMentors()

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  });

  it('should fire dispatch with setMentors action creator', async () => {
    const mockMentorAction = setMentors([ { name: 'Dan', preferences: { title: 'Being Dan' } } ])
    API.fetchMentors = jest.fn(() => Promise.resolve([ { name: 'Dan', preferences: { title: 'Being Dan' } } ]))

    const thunk = await retrieveMentors()

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(mockMentorAction)
  });

  it('should fire dispatch with hasErrored(true) if error', async () => {
    API.fetchMentors = jest.fn().mockImplementation(() => Promise.reject({
      ok: false,
      json: () => Promise.reject({ error: { message: '404' } })
    }))

    const thunk = await retrieveMentors()

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
  });
});