import React from 'react';
import { shallow } from 'enzyme';
import { EditableMentor, mapDispatchToProps } from './';
import * as API from '../../utils/api';

describe('EditableMEntor', () => {
  let wrapper;
  let mockFunc = jest.fn()
  let mockFunc2 = jest.fn()
  let mockFunc3 = jest.fn()
  let mockHistory = []
  let mockMentor = {
    id: 3,
    name: 'Rico Suave',
    email: 'rico@suave.com',
    city: 'Denver',
    state: 'CO',
    country: 'USA',
    slack_username: '@suave',
    matched: true,
    active: true,
    pronouns: 'he/him/his',
    current_title: 'Head Mentor',
    current_employer: 'Department of Mentors',
    background: 'I am a mentor!',
    industries: ['Green Tech'],
    ways_to_mentor: ['Coffee Meetings'],
    expertise_tech: ['Angular.js'],
    expertise_non_tech: ['Veteran'],
    mentee_capacity: '1',
    identity_preference: ['male-identifying'],
    meeting_location: 'Turing'
  }
  
  beforeEach(() => {
    wrapper = shallow(<EditableMentor 
      currentMentor={mockMentor}
      openEditMentor={mockFunc}
      setMentorModal={mockFunc2}
      updateChangedMentor={mockFunc3}
      history={mockHistory}
    />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('patchMentor function', () => {
    it('should fire patchMentor fetch call with current state as params', async () => {
      let spy = jest.spyOn(API, 'patchMentor')
      await wrapper.instance().patchMentor()
      expect(spy).toHaveBeenCalledWith(mockMentor)
    });

    it('should fire setMentorModal with the current state as params', async () => {
      await wrapper.instance().patchMentor()
      expect(mockFunc2).toHaveBeenCalledWith(mockMentor)
    });

    it('should fire updateChangedMentor with the current state as params', async () => {
      await wrapper.instance().patchMentor()
      expect(mockFunc3).toHaveBeenCalledWith(mockMentor)
    });

    it('should fire openEditMentor with false as params', async () => {
      await wrapper.instance().patchMentor()
      expect(mockFunc).toHaveBeenCalledWith(false)
    });
  });

  describe('handleChangeRadio function', () => {
    it('should update state with the value passed in', () => {
      let mockEvent = {
        target: {
          className: 'active',
          value: false
        }
      }

      expect(wrapper.state().active).toEqual(true)
      wrapper.instance().handleChangeRadio(mockEvent)
      expect(wrapper.state().active).toEqual(false)
    });
  });

  describe('handleChange function', () => {
    it('should update state with the value passed in', () => {
      let mockEvent = {
        target: {
          name: 'city',
          value: 'Albuquerque'
        }
      }

      expect(wrapper.state().city).toEqual('Denver')
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().city).toEqual('Albuquerque')
    });
  });

  describe('checkIndustries function', () => {
    it('should add the checkedItem to state if it is not already there', () => {
      expect(wrapper.state().industries).toEqual(['Green Tech'])
      wrapper.instance().checkIndustries('FinTech', 'industries')
      expect(wrapper.state().industries).toEqual(['Green Tech', 'FinTech'])
    });

    it('should remove the checkItem if it is already in state', () => {
      expect(wrapper.state().industries).toEqual(['Green Tech', 'FinTech'])
      wrapper.instance().checkIndustries('FinTech', 'industries')
      expect(wrapper.state().industries).toEqual(['Green Tech'])
    });
  });

  describe('handleClick function', () => {
    it('should fire the checkIndustries function with the correct params', () => {
      let mockEvent = {
        target: {
          parentNode: {
            innerText: 'FinTech',
            getAttribute: jest.fn(() => { return 'industries' })
          }
        }
      }
      let spy = jest.spyOn(wrapper.instance(), 'checkIndustries')

      wrapper.instance().handleClick(mockEvent)
      expect(spy).toHaveBeenCalledWith('FinTech', 'industries')
    });
  });

  describe('checkIfChecked function', () => {
    it('should return true is value is in state already', () => {
      let result = wrapper.instance().checkIfChecked('expertise_tech', 'Angular.js')
      expect(result).toEqual(true)
    });

    it('should return false if value is not in state', () => {
      let result = wrapper.instance().checkIfChecked('expertise_tech', 'React.js')
      expect(result).toEqual(false)
    });
  });
});

describe('mapDispatchToProps function', () => {
  let mockDispatch = jest.fn()
  let mappedProps;

  beforeEach(() => {
    mappedProps = mapDispatchToProps(mockDispatch)
  });

  it('should fire dispatch when openEditMentor is called', () => {
    mappedProps.openEditMentor()
    expect(mockDispatch).toHaveBeenCalled()
  });

  it('should fire dispatch when setMentorModal is called', () => {
    mappedProps.setMentorModal()
    expect(mockDispatch).toHaveBeenCalled()
  });

  it('should fire dispatch when updateChangedMentor is called', () => {
    mappedProps.updateChangedMentor()
    expect(mockDispatch).toHaveBeenCalled()
  });
});