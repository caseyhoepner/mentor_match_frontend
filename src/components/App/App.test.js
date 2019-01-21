import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './';

describe('App', () => {
  let wrapper;
  let mockThunk = jest.fn()
  let mockThunk2 = jest.fn()
  let mockThunk3 = jest.fn()
  let mockFunc4 = jest.fn()
  let mockSearch = { search: '?token=3' }
  
  beforeEach(() => {
    wrapper = shallow(<App 
      retrieveMentors={mockThunk} 
      retrieveStudents={mockThunk2} 
      retrieveRelationships={mockThunk3} 
      setToken={mockFunc4}
      location={mockSearch}
    />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps function', () => {
    it('should return an object with an array of mentorsand the mentor modalInfo', () => {
      const mockState = { 
        mentors: [ { name: 'Joan', preferences: { title: 'Being Joan' } } ],
        modalInfo: { name: 'Jo-jo', identity_preference: [ 'Veteran' ] },
        somethingElse: 'somethingElse' 
      }
      const expected = { 
        mentors: [ { name: 'Joan', preferences: { title: 'Being Joan' } } ],
        modalInfo: { name: 'Jo-jo', identity_preference: [ 'Veteran' ] }
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    });
  });

  describe('mapDispatchToProps function', () => {
    const mockDispatch = jest.fn()
    let mappedProps;

    beforeEach(() => {
      mappedProps = mapDispatchToProps(mockDispatch)
    });

    it('should call dispatch when retrieveMentors is called', () => {
      mappedProps.retrieveMentors()
      expect(mockDispatch).toHaveBeenCalled()
    });

    it('should call dispatch when retrieveStudents is called', () => {
      mappedProps.retrieveStudents()
      expect(mockDispatch).toHaveBeenCalled()
    });

    it('should call dispatch when retrieveRelationships is called', () => {
      mappedProps.retrieveRelationships()
      expect(mockDispatch).toHaveBeenCalled()
    });
  });
});