import React from 'react';
import { shallow } from 'enzyme';
import { NewStudentForm, mapStateToProps, mapDispatchToProps } from './';

describe ('NewStudentForm', () => {
  let wrapper;
  let mockFunc = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<NewStudentForm
      history={ { location: '/admin-dashboard' } } 
      location={{ search: '/admin-dashboard?token=3' }}
      setToken={mockFunc} 
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  describe('cleanToken function', () => {
    it('should clean the token passed in', () => {
      let mockParam = '?token=123efg'
      let result = wrapper.instance().cleanToken(mockParam)
      expect(result).toEqual('123efg')
    });

    it('should return if there is not a token', () => {
      let mockParam = '123efg'
      let result = wrapper.instance().cleanToken(mockParam)
      expect(result).toBeUndefined()
    });
  });

  describe('postNewStudent function', () => {
    it('should set hasErrored in state to true is the validation fails', async () => {
      wrapper = shallow(<NewStudentForm 
        history={ { location: '/admin-dashboard' } } 
        location={{ search: '/admin-dashboard?token=3' }}
        setToken={mockFunc}
      />)
      await wrapper.instance().postNewStudent()
      expect(wrapper.state().hasErrored).toEqual(true)
    });
  });

  describe('validateForm function', () => {
    it('should return true if required fields are filled out', () => {
      let mockState = {
        name: 'Funky Brewster',
        email: 'funky@igotthefunk.com',
        slack_username: '@Funk',
        stack: 'Back-End'
      }
      wrapper.instance().setState(mockState)
      let result = wrapper.instance().validateForm()
      expect(result).toEqual(true)
    });

    it('should return false if required fields are not filled out', () => {
      let result = wrapper.instance().validateForm()
      expect(result).toEqual(false)
    });
  });

  describe('handleChange function', () => {
    it('should update state with the value passed in', () => {
      let mockEvent = {
        target: {
          name: 'name',
          value: 'Victoria'
        }
      }
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().name).toEqual('Victoria')
    });
  });

  describe('handleClick function', () => {
    it('should fire checkIndustries function with correct params', () => {
      let spy = spyOn(wrapper.instance(), 'checkIndustries')
      let mockEvent = {
        target: {
          parentNode: {
            innerText: 'Marketing/Sales',
            getAttribute: jest.fn(() => { return 'industries' })
          }
        }
      }
      wrapper.instance().handleClick(mockEvent)
      expect(spy).toHaveBeenCalledWith('Marketing/Sales', 'industries')
    });
  });

  describe('checkIndustries function', () => {
    it('should add the industry to state if not already there', () => {
      wrapper.instance().checkIndustries('Firefighter', 'industries')
      expect(wrapper.state().industries[0]).toEqual('Firefighter')
    });

    it('Should remove the industry from state if it is already there', () => {
      wrapper.instance().setState({ industries: [ 'Fry-cook' ] })
      wrapper.instance().checkIndustries('Fry-cook', 'industries')
      expect(wrapper.state().industries).toEqual([])
    });
  });
});

describe('mapStateToProps function', () => {
  it('should return an object with the current token', () => {
    const mockState = {
      token: '123ABC',
      somethingElse: 'w00t!'
    }
    const expected = {
      token: '123ABC'
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

  it('should call dispatch when setToken is fired', () => {
    mappedProps.setToken('123efg')
    expect(mockDispatch).toHaveBeenCalled()
  });
});