import React from 'react';
import { shallow } from 'enzyme';
import { AdminMentorModal, mapStateToProps, mapDispatchToProps } from './';
import * as API from '../../utils/api';

describe('AdminMentorModal', () => {
  let wrapper;
  let mockFunction = jest.fn()
  let mockFunc2 = jest.fn()
  let mockFunc3 = jest.fn()
  let mockFunc4 = jest.fn()
  let mockFunc5 = jest.fn()
  let mockFunc6 = jest.fn()
  let mockHistory = []
  let mockMentor = {
    id: 6,
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
    background: 'I am a mentor!',
    industries: ['Civic Tech'],
    ways_to_mentor: ['Coffee Meetings'],
    expertise_tech: ['React.js'],
    expertise_non_tech: ['Parenting'],
    mentee_capacity: 2,
    identity_preference: ['female-identifying'],
    meeting_location: ['Turing']
  }
  let mockStudents = [
    { name: 'Casey', id: 1, active: true, matched: false },
    { name: 'Alex', id: 2, active: false, matched: true }
  ]
  
  let mockRelationships = [
    {
      attributes: {
        id: 1,
        mentor_id: 6,
        student_id: 2,
        active: true
      }
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<AdminMentorModal 
      currentMentor={mockMentor} 
      students={mockStudents} 
      modalInfo={mockMentor}
      relationships={mockRelationships}
      isEditable={false}
      addModalMentees={mockFunction}
      updateChangedMentor={mockFunc2}
      setMentorModal={mockFunc3}
      openEditMentor={mockFunc4}
      makeStudentInactive={mockFunc5}
      retrieveRelationships={mockFunc6}
      token={789}
    />)
  });

  it('should match the snapshot with props and when it is not editable', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot with props and when it is editable', () => {
    wrapper = shallow(<AdminMentorModal 
      currentMentor={mockMentor} 
      students={mockStudents} 
      modalInfo={mockMentor}
      relationships={mockRelationships}
      isEditable={true}
      addModalMentees={mockFunction}
    />)
    expect(wrapper).toMatchSnapshot()
  });

  describe('handleClick function', () => {
    it('should update state to be editable and add the mentor from props in state', () => {
      wrapper = shallow(<AdminMentorModal 
        modalInfo={mockMentor} 
        openEditMentor={mockFunction} 
        history={mockHistory}  
        students={mockStudents} 
        relationships={mockRelationships}
        addModalMentees={mockFunction}
      />)
      let mockEvent = { target: { name: 'Edit' } }

      wrapper.instance().handleClick(mockEvent)
      expect(mockFunction).toHaveBeenCalledWith(true)
      expect(wrapper.state().currentMentor).toEqual(mockMentor)
    });

    it('should fire setMentorModal function from props', () => {
      let mockFunc1 = jest.fn()
      let mockFunc2 = jest.fn()
      let mockEvent = { target: { name: 'Submit Changes' } }
      wrapper = shallow(<AdminMentorModal 
        modalInfo={mockMentor}
        setMentorModal={mockFunc1} 
        updateChangedMentor={mockFunc2} 
        openEditMentor={mockFunction} 
        history={mockHistory} 
        students={mockStudents}
        relationships={mockRelationships}
        addModalMentees={mockFunction}
      />)
      
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
        openEditMentor={mockFunction} 
        history={mockHistory} 
        students={mockStudents}
        relationships={mockRelationships}
        addModalMentees={mockFunction}
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
        openEditMentor={mockFunction}
        history={mockHistory} 
        students={mockStudents}
        relationships={mockRelationships}
        addModalMentees={mockFunction}
      />)
        
      wrapper.instance().handleClick(mockEvent1)
      wrapper.instance().handleClick(mockEvent2)
      expect(mockFunction).toHaveBeenCalledWith(false)
      expect(wrapper.state().currentMentor).toEqual({})
    });

    it('should reset redux and state when the Exit/X button is clicked', () => {
      let mockFunc1 = jest.fn()
      let mockEvent1 = { target: { name: 'Edit' } }
      let mockEvent2 = { target: { name: 'Exit' } }
      wrapper = shallow(<AdminMentorModal 
        modalInfo={mockMentor}
        setMentorModal={mockFunc1}
        openEditMentor={mockFunction}
        history={mockHistory} 
        students={mockStudents}
        relationships={mockRelationships}
        addModalMentees={mockFunction}
      />)

      wrapper.instance().handleClick(mockEvent1)
      expect(wrapper.state().currentMentor).toEqual(mockMentor)
      wrapper.instance().handleClick(mockEvent2)
      expect(mockFunc1).toHaveBeenCalled()
      expect(mockFunction).toHaveBeenCalledWith(false)
      expect(wrapper.state().currentMentor).toEqual({})
    });
  });

  describe('handleChange function', () => {
    it('should update menteeToAssign in state when a value is changed', () => {
      let mockOriginalState = {
        menteeToAssign: 'Dan'
      }

      let mockEvent = { target: { name: 'menteeToAssign', value: 'Halle Berry' } }

      wrapper.instance().setState(mockOriginalState)
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().menteeToAssign).toEqual('Halle Berry')
    });
  });

  describe('getStudent function', () => {
    it('should return the student that matches the menteeToAssign value in state', () => {
      let mockStudents = [{ name: 'Rosa Diaz' },{ name: 'Ray Holt' }]
      wrapper.instance().setState({ menteeToAssign: 'Ray Holt' })
      let result = wrapper.instance().getStudent(mockStudents)
      expect(result).toEqual({ name: 'Ray Holt' })
    });
  });

  describe('assignMentee function', () => {
    it('should fire the getStudent function with the correct params', async () => {
      let spy = jest.spyOn(wrapper.instance(), 'getStudent')
      wrapper.instance().setState({ menteeToAssign: 'Casey' })
      await wrapper.instance().assignMentee()
      expect(spy).toHaveBeenCalledWith(mockStudents)
    });

    it('should fire all subsequent needed functions with correct params', async () => {
      let spy = jest.spyOn(API, 'patchMentor')
      let spy2 = jest.spyOn(API, 'postRelationship')
      let spy3 = jest.spyOn(API, 'patchStudent')
      let spy4 = jest.spyOn(wrapper.instance(), 'getMentees')
      let expected = {
        id: 6,
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
        background: 'I am a mentor!',
        industries: ['Civic Tech'],
        ways_to_mentor: ['Coffee Meetings'],
        expertise_tech: ['React.js'],
        expertise_non_tech: ['Parenting'],
        mentee_capacity: 1,
        identity_preference: ['female-identifying'],
        meeting_location: ['Turing']
      }
      wrapper.instance().setState({ menteeToAssign: 'Casey' })
      await wrapper.instance().assignMentee()
      expect(spy).toHaveBeenCalledWith(expected, 789)
      expect(mockFunc2).toHaveBeenCalledWith(expected)
      expect(mockFunc3).toHaveBeenCalledWith(expected)
      expect(spy2).toHaveBeenCalledWith(1, 6, 789)
      expect(mockFunc5).toHaveBeenCalledWith(1)
      expect(spy3).toHaveBeenCalledWith({ name: 'Casey', id: 1, active: true, matched: false }, 789)
      expect(mockFunc6).toHaveBeenCalledWith(789)
      expect(spy4).toHaveBeenCalled()
    });
  });

  describe('getMenteeIcons function', () => {
    it('should return the correct amount of capacity icons', () => {
      let result = wrapper.instance().getMenteeIcons(5)
      expect(result.length).toEqual(5)
    });
  });

  describe('getList function', () => {
    it('should return an array the same length as the one passed in', () => {
      let result = wrapper.instance().getList(['React.js','Ember.js'])
      expect(result.length).toEqual(2)
    });
  });

  describe('getPreferencesIcons function', () => {
    it('should return an array the same length as the one passed in', () => {
      let result = wrapper.instance().getPreferencesIcons(['Veteran', 'lgbtq+'])
      expect(result.length).toEqual(2)
    });
  });

  describe('getStudentOptions function', () => {
    it('should return array of students', () => {
      let result = wrapper.instance().getStudentOptions()
      expect(result.length).toEqual(2)
    });
  });

  describe('getMentees function', () => {
    it('should fire addModalMentees function with correct params', () => {
      let expected = {
        id: 6,
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
        background: 'I am a mentor!',
        industries: ['Civic Tech'],
        ways_to_mentor: ['Coffee Meetings'],
        expertise_tech: ['React.js'],
        expertise_non_tech: ['Parenting'],
        mentee_capacity: 2,
        identity_preference: ['female-identifying'],
        meeting_location: ['Turing'],
        mentees: [{  name: 'Alex', id: 2, active: false, matched: true  }]
      }
      wrapper.instance().getMentees()
      expect(mockFunction).toHaveBeenCalledWith(expected)
    });

    it('should return an array of the number of matched mentees to that specific mentor', () => {
      let result = wrapper.instance().getMentees()
      expect(result.length).toEqual(1)
    });
  });

  describe('unmatch function', () => {
    it('should fire all needed functions with correct params', async () => {
      let spy = jest.spyOn(API, 'patchMentor')
      let spy2 = jest.spyOn(API, 'patchRelationship')
      let spy3 = jest.spyOn(wrapper.instance(), 'getMentees')
      let mockEvent = {
        target: {
          name: 1
        }
      }
      let expected = {
        id: 6,
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
        background: 'I am a mentor!',
        industries: ['Civic Tech'],
        ways_to_mentor: ['Coffee Meetings'],
        expertise_tech: ['React.js'],
        expertise_non_tech: ['Parenting'],
        mentee_capacity: 3,
        identity_preference: ['female-identifying'],
        meeting_location: ['Turing']
      }
      await wrapper.instance().unmatch(mockEvent, 2)
      expect(spy).toHaveBeenCalledWith(expected, 789)
      expect(mockFunc2).toHaveBeenCalledWith(expected)
      expect(mockFunc3).toHaveBeenCalledWith(expected)
      expect(spy2).toHaveBeenCalledWith(2, 6, 1, 789)
      expect(mockFunc6).toHaveBeenCalledWith(789)
      expect(spy3).toHaveBeenCalled()
    });
  });
});
    
describe('mapStateToProps function', () => {
  it('should return an object with a mentor object, isEditable boolean and a mentors array', () => {
    const mockState = {
      modalInfo: { name: 'Leslie Knope', identity_preference: 'female-identifying' },
      mentors: [ { name: 'Ron Swanson', identity_preference: 'male-identifying' } ],
      isEditable: false,
      relationships: [ { mentor_id: 1, student_id: 2, active: true } ],
      somethingElse: 'W00t!'
    }
    const expected = {
      modalInfo: { name: 'Leslie Knope', identity_preference: 'female-identifying' },
      mentors: [ { name: 'Ron Swanson', identity_preference: 'male-identifying' } ],
      isEditable: false,
      relationships: [ { mentor_id: 1, student_id: 2, active: true } ]
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
    mappedProps.setMentorModal()
    expect(mockDispatch).toHaveBeenCalled()
  });
  
  it('should call dispatch when updateChangedMentor is called', () => {
    mappedProps.updateChangedMentor()
    expect(mockDispatch).toHaveBeenCalled()
  });
  
  it('should call dispatch when openEditMentor is called', () => {
    mappedProps.openEditMentor(true)
    expect(mockDispatch).toHaveBeenCalled()
  });

  it('should call dispatch when makeStudentInactive is called', () => {
    mappedProps.makeStudentInactive()
    expect(mockDispatch).toHaveBeenCalled()
  });

  it('should call dispatch when addModalMentees is called', () => {
    mappedProps.addModalMentees()
    expect(mockDispatch).toHaveBeenCalled()
  });

  it('should call dispatch when retrieveRelationships is called', () => {
    mappedProps.retrieveRelationships()
    expect(mockDispatch).toHaveBeenCalled()
  });
});