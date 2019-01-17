import React from 'react';
import { shallow } from 'enzyme';
import { AdminMentorModal, mapStateToProps, mapDispatchToProps } from './';

describe('AdminMentorModal', () => {
  let wrapper;
  let mockFunction = jest.fn()
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
    mentee_capacity: '2',
    identity_preference: ['female-identifying'],
    meeting_location: ['Turing']
  }
  let mockStudents = [
    { name: 'Casey' },
    { name: 'Alex' }
  ]
  
  let mockRelationships = [
    {
      attributes: {
        mentor_id: 1,
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
      expect(wrapper.state()).toEqual({ currentMentor: mockMentor, menteeToAssign: '', mentees: [] })
      wrapper.instance().handleClick(mockEvent2)
      expect(mockFunc1).toHaveBeenCalled()
      expect(mockFunction).toHaveBeenCalledWith(false)
      expect(wrapper.state()).toEqual({ currentMentor: {}, menteeToAssign: '', mentees: [] })
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
});