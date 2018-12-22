import React from 'react';
import { shallow } from 'enzyme';
import { Search, mapStateToProps, mapDispatchToProps } from './';

describe('Search', () => {
  let wrapper;
  let mockState = { 
    localeSelected: '',
    search: '',
    favClicked: false,
    allMentorsClicked: false,
    preferencesClicked: false
  }
  
  beforeEach(() => {
    wrapper = shallow(<Search />)
  });
  
  describe('Search container', () => {
    it('matches the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should update state with locale', () => {
      wrapper = shallow(<Search setLocale={jest.fn()} />)
      let mockLocaleEvent = { target: { name: 'localeSelected', value: 'Denver' } }
      
      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockLocaleEvent)
      expect(wrapper.state().localeSelected).toEqual('Denver')
    });

    it('should update state with search terms', () => {
      let mockSearchEvent = { target: { name: 'search', value: 'skwijb' } }
      wrapper = shallow(<Search setSearch={jest.fn()} />)

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockSearchEvent)
      expect(wrapper.state().search).toEqual('skwijb')
    });

    it('should toggle state if the Favorite button is clicked', () => {
      let mockToggleEvent = { target: { name: 'favClicked' } }

      wrapper.instance().toggleClicked(mockToggleEvent)
      expect(wrapper.state().favClicked).toEqual(true)
    });

    it('should toggle state if the All Mentors button is clicked', () => {
      let mockToggleEvent = { target: { name: 'allMentorsClicked' } }

      wrapper.instance().toggleClicked(mockToggleEvent)
      expect(wrapper.state().allMentorsClicked).toEqual(true)
    });

    it('should toggle state if the Preferences button is clicked', () => {
      let mockToggleEvent = { target: { name: 'preferencesClicked' } }

      wrapper.instance().toggleClicked(mockToggleEvent)
      expect(wrapper.state().preferencesClicked).toEqual(true)
    });
  });

  describe('mapStateToProps function', () => {
    it('should return an object with the locale currently assigned', () => {
      const mockState = { locale: 'Denver', somethingElse: 'wooooooo' }
      const expected = { locale: 'Denver' }
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

    it('should call dispatch when setLocale is called', () => {
      mappedProps.setLocale()
      expect(mockDispatch).toHaveBeenCalled()
    });

    it('should call dispatch when setSearch is called', () => {
      mappedProps.setSearch()
      expect(mockDispatch).toHaveBeenCalled()
    });
  });
});