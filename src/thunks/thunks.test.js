import { retrieveMentors } from './fetchMentors';
import { retrieveStudents } from './fetchStudents';
import { retrieveRelationships } from './fetchRelationships';
import { isLoading, hasErrored } from '../actions';
import { setMentors } from '../actions/mentor-actions';
import { setStudents, setRelationships  } from '../actions/student-actions';
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

  it('should fire fetchMentors', () => {
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

describe('retrieveStudents thunk', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  it('should dispatch with the isLoading action', () => {
    const thunk = retrieveStudents()

    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  });

  it('should fire fetchStudents', () => {
    API.fetchStudents = jest.fn()
    const thunk = retrieveStudents()

    thunk(mockDispatch)

    expect(API.fetchStudents).toHaveBeenCalled()
  });

  it('should dispatch with isLoading(false) with fetch returns data', async () => {
    API.fetchStudents = jest.fn(() => Promise.resolve([ { name: 'Joanne', preferences: { title: 'Being Joanne' } } ]))
    const thunk = await retrieveStudents()

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  });

  it('should fire dispatch with setStudents action creator', async () => {
    const mockMentorAction = setStudents([ { name: 'Joanne', preferences: { title: 'Being Joanne' } } ])
    API.fetchStudents = jest.fn(() => Promise.resolve([ { name: 'Joanne', preferences: { title: 'Being Joanne' } } ]))

    const thunk = await retrieveStudents()

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(mockMentorAction)
  });

  it('should fire dispatch with hasErrored(true) if error', async () => {
    API.fetchStudents = jest.fn().mockImplementation(() => Promise.reject({
      ok: false,
      json: () => Promise.reject({ error: { message: '404' } })
    }))

    const thunk = await retrieveStudents()

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
  });
});

describe('retrieveRelationships thunk', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  it('should dispatch with the isLoading action', () => {
    const thunk = retrieveRelationships()

    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  });

  it('should fire fetchRelationships', () => {
    API.fetchRelationships = jest.fn()
    const thunk = retrieveRelationships()

    thunk(mockDispatch)

    expect(API.fetchRelationships).toHaveBeenCalled()
  });

  it('should dispatch with isLoading(false) with fetch returns data', async () => {
    API.fetchRelationships = jest.fn(() => Promise.resolve([ { mentor_id: 8, sudent_id: 7, active: true } ]))
    const thunk = await retrieveRelationships()

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  });

  it('should fire dispatch with setRelationships action creator', async () => {
    const mockMentorAction = setRelationships([ { mentor_id: 8, sudent_id: 7, active: true } ])
    API.fetchRelationships = jest.fn(() => Promise.resolve([ { mentor_id: 8, sudent_id: 7, active: true } ]))

    const thunk = await retrieveRelationships()

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(mockMentorAction)
  });

  it('should fire dispatch with hasErrored(true) if error', async () => {
    API.fetchRelationships = jest.fn().mockImplementation(() => Promise.reject({
      ok: false,
      json: () => Promise.reject({ error: { message: '404' } })
    }))

    const thunk = await retrieveRelationships()

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
  });
});