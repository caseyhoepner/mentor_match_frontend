import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  let wrapper;
  let mockThunk = jest.fn()
  let mockThunk2 = jest.fn()
  
  beforeEach(() => {
    wrapper = shallow(<App retrieveMentors={mockThunk} retrieveStudents={mockThunk2} />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps function', () => {
    it('should return an object with an array of mentors', () => {
      const mockState = { mentors: [ { name: 'Joan', preferences: { title: 'Being Joan' } } ], somethingElse: 'somethingElse' }
      const expected = { mentors: [ { name: 'Joan', preferences: { title: 'Being Joan' } } ] }
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
  });
});