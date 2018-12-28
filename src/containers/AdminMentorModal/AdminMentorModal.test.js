import React from 'react';
import { shallow } from 'enzyme';
import { AdminMentorModal, mapStateToProps, mapDispatchToProps } from './';

describe('AdminMentorModal', () => {
  let wrapper;
  let mockMentor = {
    name: 'Menty the Mentor',
    email: 'menty@mentor.com',
    city: 'Denver',
    state: 'CO',
    country: 'USA',
    slack_username: '@Menty',
    matched: true,
    active: true,
    pronouns: 'she/her/hers',
    current_title: 'Head Mentor',
    current_employer: 'Department of Mentors',
    background: 'I am a mentor!'
  }

  beforeEach(() => {
    wrapper = shallow(<AdminMentorModal currentMentor={mockMentor} />)
  });

  it('should match the snapshot with props and when it is not editable', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot with props and when it is editable', () => {
    wrapper.instance().setState({ isEditable: true })
    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot without props', () => {
    wrapper = shallow(<AdminMentorModal />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleClick function', () => {
    it('should update state to be editable and add the mentor from props in state', () => {
      wrapper = shallow(<AdminMentorModal modalInfo={mockMentor} />)
      let mockEvent = { target: { name: 'Edit' } }

      wrapper.instance().handleClick(mockEvent)
      expect(wrapper.state().isEditable).toEqual(true)
      expect(wrapper.state().currentMentor).toEqual(mockMentor)
    });

    it('should fire setMentorModal function from props', () => {
      let mockFunc1 = jest.fn()
      let mockFunc2 = jest.fn()
      let mockEvent = { target: { name: 'Submit Changes' } }
      wrapper = shallow(<AdminMentorModal setMentorModal={mockFunc1} updateChangedMentor={mockFunc2} />)
      
      wrapper.instance().handleClick(mockEvent)
      expect(mockFunc1).toHaveBeenCalled()
    })

    it('should fire updateChangedMentor function from props with proper params', () => {
      let mockFunc1 = jest.fn()
      let mockFunc2 = jest.fn()
      let mockEvent1 = { target: { name: 'Edit' } }
      let mockEvent2 = { target: { name: 'Submit Changes' } }
      wrapper = shallow(<AdminMentorModal 
        modalInfo={mockMentor}
        setMentorModal={mockFunc1} 
        updateChangedMentor={mockFunc2} 
      />)
      
      wrapper.instance().handleClick(mockEvent1)
      wrapper.instance().handleClick(mockEvent2)
      expect(mockFunc2).toHaveBeenCalledWith(mockMentor)
    });

    it('should update state to turn editability off and zero out the currentMentor in state', () => {
      let mockFunc1 = jest.fn()
      let mockFunc2 = jest.fn()
      let mockEvent1 = { target: { name: 'Edit' } }
      let mockEvent2 = { target: { name: 'Submit Changes' } }
      wrapper = shallow(<AdminMentorModal 
        modalInfo={mockMentor}
        setMentorModal={mockFunc1} 
        updateChangedMentor={mockFunc2} 
      />)
        
      wrapper.instance().handleClick(mockEvent1)
      wrapper.instance().handleClick(mockEvent2)
      expect(wrapper.state().isEditable).toEqual(false)
      expect(wrapper.state().currentMentor).toEqual({})
    });

    it('should reset redux and state when the Exit/X button is clicked', () => {
      let mockFunc1 = jest.fn()
      let mockEvent1 = { target: { name: 'Edit' } }
      let mockEvent2 = { target: { name: 'Exit' } }
      wrapper = shallow(<AdminMentorModal 
        modalInfo={mockMentor}
        setMentorModal={mockFunc1}
      />)

      wrapper.instance().handleClick(mockEvent1)
      expect(wrapper.state()).toEqual({ isEditable: true, currentMentor: mockMentor })
      wrapper.instance().handleClick(mockEvent2)
      expect(mockFunc1).toHaveBeenCalled()
      expect(wrapper.state()).toEqual({ isEditable: false, currentMentor: {} })
    });
  });

  describe('handleChange function', () => {
    it('should update mentor in state when a value is changed', () => {
      let mockChangedMentor = {
        name: 'Halle Berry',
        email: 'menty@mentor.com',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        slack_username: '@Menty',
        matched: true,
        active: true,
        pronouns: 'she/her/hers',
        current_title: 'Head Mentor',
        current_employer: 'Department of Mentors',
        background: 'I am a mentor!'
      }
      let mockEvent = { target: { name: 'name', value: 'Halle Berry' } }

      wrapper.instance().setState({ currentMentor: mockMentor })
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().currentMentor).toEqual(mockChangedMentor)
    });
  });

  describe('mapStateToProps function', () => {
    it('should return an object with a mentor object and a mentors array', () => {
      const mockState = {
        modalInfo: { name: 'Leslie Knope', preferences: { title: 'waffles' } },
        mentors: [ { name: 'Ron Swanson', preferences: { title: 'steak' } } ],
        somethingElse: 'W00t!'
      }
      const expected = {
        modalInfo: { name: 'Leslie Knope', preferences: { title: 'waffles' } },
        mentors: [ { name: 'Ron Swanson', preferences: { title: 'steak' } } ]  
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

    it('should call dispatch when setMentorModal is called', () =>{
      mappedProps.setMentorModal(mockMentor)
      expect(mockDispatch).toHaveBeenCalled()
    });

    it('should call dispatch when updateChangedMentor is called', () => {
      mappedProps.updateChangedMentor(mockMentor)
      expect(mockDispatch).toHaveBeenCalled()
    });
  });
});