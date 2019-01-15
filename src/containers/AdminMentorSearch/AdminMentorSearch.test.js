import React from 'react';
import { shallow } from 'enzyme';
import { AdminMentorSearch, mapStateToProps, mapDispatchToProps } from './';

describe('AdminMentorSearch', () => {
  let wrapper;
  let mockFunc = jest.fn()
  let mockFunc2 = jest.fn()
  let mockFunc3 = jest.fn()
  
  beforeEach(() => {
    wrapper = shallow(<AdminMentorSearch
      setSearch={mockFunc}
      setLocale={mockFunc2}
      toggleShowingMentors={mockFunc3}
      showingAllMentors={false}
    />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleChange function', () => {
    it('should update search value state with the value passed in', () => {
      const mockEvent = {
        target: {
          name: 'search',
          value: 'skwijb'
        }
      }

      expect(wrapper.state().search).toEqual('')
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().search).toEqual('skwijb')
    });

    it('should fire setSearch with the proper params', () => {
      const mockEvent = {
        target: {
          name: 'search',
          value: 'skwijb'
        }
      }

      wrapper.instance().handleChange(mockEvent)
      expect(mockFunc).toHaveBeenCalledWith('skwijb')
    });

    it('should update localeSelected value state with the value passed in', () => {
      const mockEvent = {
        target: {
          name: 'localeSelected',
          value: 'Denver'
        }
      }

      expect(wrapper.state().localeSelected).toEqual('')
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().localeSelected).toEqual('Denver')
    });

    it('should fire setLocale with the proper params', () => {
      const mockEvent = {
        target: {
          name: 'localeSelected',
          value: 'Denver'
        }
      }

      wrapper.instance().handleChange(mockEvent)
      expect(mockFunc2).toHaveBeenCalledWith('Denver')
    });
  });

  describe('toggleClicked function', () => {
    it('should toggle preferencesClicked in state', () => {
      let mockEvent = {
        target: {
          name: 'preferencesClicked'
        }
      }

      expect(wrapper.state().preferencesClicked).toEqual(false)
      wrapper.instance().toggleClicked(mockEvent)
      expect(wrapper.state().preferencesClicked).toEqual(true)
    });

    it('should fire toggleShowingAllMentors with proper params', () => {
      let mockEvent = {
        target: {
          name: 'allMentorsClicked'
        }
      }

      wrapper.instance().toggleClicked(mockEvent)
      expect(mockFunc3).toHaveBeenCalledWith(true)
    });
  });
});

describe('mapStateToProps function', () => {
  it('should return an object with locale and showingAllMentors boolean', () => {
    const mockState = {
      locale: 'Denver',
      showingAllMentors: true,
      somethingElse: 'w00t!'
    }
    const expected = {
      locale: 'Denver',
      showingAllMentors: true
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });
});

describe('mapDispatchToProps function', () => {
  const mockDispatch = jest.fn();
  let mappedProps;

  beforeEach(() => {
    mappedProps = mapDispatchToProps(mockDispatch)
  });

  it('should call dispatch when setLocale is called', () => {
    mappedProps.setLocale()
    expect(mockDispatch).toHaveBeenCalled()
  });

  it('should call dispatch when setSeach is called', () => {
    mappedProps.setSearch()
    expect(mockDispatch).toHaveBeenCalled()
  });

  it('should call dispatch when toggleShowingMentors is called', () => {
    mappedProps.toggleShowingMentors()
    expect(mockDispatch).toHaveBeenCalled()
  });
});