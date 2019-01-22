import React from 'react';
import { shallow } from 'enzyme';
import { NewMentorForm, mapStateToProps, mapDispatchToProps } from './';
import * as API from '../../utils/api';

describe('NewMentorForm', () => {
  let wrapper;
  let mockFunc = jest.fn()
  let mockHistory = {
    location: '/new-mentor-form',
    push: jest.fn()
  }
  let mockState = {
    name: '',
    pronouns: '',
    email: '',
    slack_username: '',
    city: '',
    state: '',
    country: '',
    current_employer: '',
    current_title: '',
    industries: [],
    background: '',
    ways_to_mentor: [],
    expertise_tech: [],
    expertise_non_tech: [],
    identity_preference: [],
    mentee_capacity: '0',
    meeting_location: [],
    selected1to1: 'No',
    stack_preference: 'No Preference',
    hasErrored: false
  }
  let mockVerifiedState = { 
    name: 'Broseph',
    email: 'duderino@sup.com',
    slack_username: 'broheim',
    city: 'Denver',
    state: 'CO',
    country: 'USA',
    background: 'Sup, brah?',
    selected1to1: 'Yes'
    }
  
  beforeEach(() => {
    wrapper = shallow(<NewMentorForm 
      history={mockHistory} 
      location={{ search: '/new-mentor-form?token=4' }}
      setToken={mockFunc}
    />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
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

  describe('postNewMentor function', () => {
    it('should fire validateForm function', async () => {
      let spy = spyOn(wrapper.instance(), 'validateForm')
      API.postMentor = jest.fn()
      
      wrapper.instance().setState(mockVerifiedState)
      await wrapper.instance().postNewMentor()
      expect(spy).toHaveBeenCalled()
    });

    it('should clear necessary state propeties if form is validated', async () => {
      let mockOtherState = { 
        name: 'Broseph',
        email: 'duderino@sup.com',
        slack_username: 'broheim',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        background: 'Sup, brah?',
        selected1to1: 'No'
        }
      API.postMentor = jest.fn()

      wrapper.instance().setState(mockOtherState)
      await wrapper.instance().postNewMentor()
      expect(wrapper.state().identity_preference).toEqual([])
      expect(wrapper.state().mentee_capacity).toEqual('0')
      expect(wrapper.state().meeting_location).toEqual([])
      expect(wrapper.state().stack_preference).toEqual('No Preference')
    });

    it('should fire the postMentor API function if verification passes', async () => { 
      API.postMentor = jest.fn()
      
      wrapper.instance().setState(mockVerifiedState)
      await wrapper.instance().postNewMentor()
      expect(API.postMentor).toHaveBeenCalled()
    });

    it('should change hasErrored in state to true if form is not validated', async () => {
      await wrapper.instance().postNewMentor()
      expect(wrapper.state().hasErrored).toEqual(true)
    });
  });
  
  describe('handleChangeRadio function', () => {
    it('should update the selected1to1 state', () => {
      let mockRadioEvent = { target: { value: 'Yes', className: 'selected1to1' } }
      
      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChangeRadio(mockRadioEvent)
      expect(wrapper.state().selected1to1).toEqual("Yes")
    });
    
    it('should update the stack_preference state', () => {
      let mockRadioEvent = { target: { value: 'Front-End', className: 'stack_preference' } }
      
      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChangeRadio(mockRadioEvent)
      expect(wrapper.state().stack_preference).toEqual("Front-End")
    });

    it('should update mentee_capacity to 1 if selected1to1 is Yes', () => {
      let mockRadioEvent = { target: { value: 'Yes', className: 'selected1to1' } }
       
      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChangeRadio(mockRadioEvent)
      expect(wrapper.state().mentee_capacity).toEqual('1')
    });

    it('should update mentee_capacity to 0 if selected1to1 is No', () => {
      let mockRadioEvent = { target: { value: 'No', className: 'selected1to1' } }
      
      wrapper.instance().setState({ mentee_capacity: '2' })
      wrapper.instance().handleChangeRadio(mockRadioEvent)
      expect(wrapper.state().mentee_capacity).toEqual('0')
    });
  });

  describe('handleChange function', () => {
    it('should update the name state', () => {
      let mockChangeEvent = { target: { name: 'name', value: 'Sathington' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().name).toEqual('Sathington')
    });

    it('should update the pronouns state', () => {
      let mockChangeEvent = { target: { name: 'pronouns', value: 'they/theirs' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().pronouns).toEqual('they/theirs')
    });

    it('should update the email state', () => {
      let mockChangeEvent = { target: { name: 'email', value: 'booyah@booyah.com' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().email).toEqual('booyah@booyah.com')
    });

    it('should update the slack_username state', () => {
      let mockChangeEvent = { target: { name: 'slack_username', value: '@mcCringleberry' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().slack_username).toEqual('@mcCringleberry')
    });

    it('should update the city state', () => {
      let mockChangeEvent = { target: { name: 'city', value: 'Denver' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().city).toEqual('Denver')
    });

    it('should update the state state', () => {
      let mockChangeEvent = { target: { name: 'state', value: 'CO' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().state).toEqual('CO')
    });

    it('should update the country state', () => {
      let mockChangeEvent = { target: { name: 'country', value: 'USA' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().country).toEqual('USA')
    });

    it('should update the cuurent_employer state', () => {
      let mockChangeEvent = { target: { name: 'cuurent_employer', value: 'Awesome Farms' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().cuurent_employer).toEqual('Awesome Farms')
    });

    it('should update the current_title state', () => {
      let mockChangeEvent = { target: { name: 'current_title', value: 'Head Farmer of Awesomeness' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().current_title).toEqual('Head Farmer of Awesomeness')
    });

    it('should update the background state', () => {
      let mockChangeEvent = { target: { name: 'background', value: 'Once upond a time I got a job, and it was cool.' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().background).toEqual('Once upond a time I got a job, and it was cool.')
    });

    it('should update the mentee_capacity state', () => {
      let mockChangeEvent = { target: { name: 'mentee_capacity', value: '4' } }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleChange(mockChangeEvent)
      expect(wrapper.state().mentee_capacity).toEqual('4')
    });
  });

  describe('handleClick function', () => {
    it('should add multiple items to the industries array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Coding',
            getAttribute: jest.fn(() => { return 'industries' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'Running',
            getAttribute: jest.fn(() => { return 'industries' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().industries).toEqual(['Coding'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().industries).toEqual(['Coding', 'Running'])
    });

    it('should remove an existing element from industries array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Coding',
            getAttribute: jest.fn(() => { return 'industries' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'Running',
            getAttribute: jest.fn(() => { return 'industries' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().industries).toEqual(['Coding'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().industries).toEqual(['Coding', 'Running'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().industries).toEqual(['Running'])
    });

    it('should add multiple items to the ways_to_mentor array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Mock Interviews',
            getAttribute: jest.fn(() => { return 'ways_to_mentor' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'Pairing',
            getAttribute: jest.fn(() => { return 'ways_to_mentor' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().ways_to_mentor).toEqual(['Mock Interviews'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().ways_to_mentor).toEqual(['Mock Interviews', 'Pairing'])
    });

    it('should remove an existing element from ways_to_mentor array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Mock Interviews',
            getAttribute: jest.fn(() => { return 'ways_to_mentor' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'Pairing',
            getAttribute: jest.fn(() => { return 'ways_to_mentor' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().ways_to_mentor).toEqual(['Mock Interviews'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().ways_to_mentor).toEqual(['Mock Interviews', 'Pairing'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().ways_to_mentor).toEqual(['Pairing'])
    });

    it('should add multiple items to the expertise_tech array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Ruby',
            getAttribute: jest.fn(() => { return 'expertise_tech' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'JavaScript',
            getAttribute: jest.fn(() => { return 'expertise_tech' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_tech).toEqual(['Ruby'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().expertise_tech).toEqual(['Ruby', 'JavaScript'])
    });

    it('should remove an existing element from expertise_tech array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Ruby',
            getAttribute: jest.fn(() => { return 'expertise_tech' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'JavaScript',
            getAttribute: jest.fn(() => { return 'expertise_tech' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_tech).toEqual(['Ruby'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().expertise_tech).toEqual(['Ruby', 'JavaScript'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_tech).toEqual(['JavaScript'])
    });

    it('should add multiple items to the expertise_non_tech array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'parenting',
            getAttribute: jest.fn(() => { return 'expertise_non_tech' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'veteraning',
            getAttribute: jest.fn(() => { return 'expertise_non_tech' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_non_tech).toEqual(['parenting'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().expertise_non_tech).toEqual(['parenting', 'veteraning'])
    });

    it('should remove an existing element from expertise_non_tech array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'parenting',
            getAttribute: jest.fn(() => { return 'expertise_non_tech' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'veteraning',
            getAttribute: jest.fn(() => { return 'expertise_non_tech' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_non_tech).toEqual(['parenting'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().expertise_non_tech).toEqual(['parenting', 'veteraning'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().expertise_non_tech).toEqual(['veteraning'])
    });

    it('should add multiple items to the identity_preference array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'cool',
            getAttribute: jest.fn(() => { return 'identity_preference' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'chill',
            getAttribute: jest.fn(() => { return 'identity_preference' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().identity_preference).toEqual(['cool'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().identity_preference).toEqual(['cool', 'chill'])
    });

    it('should remove an existing element from identity_preference array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'cool',
            getAttribute: jest.fn(() => { return 'identity_preference' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'chill',
            getAttribute: jest.fn(() => { return 'identity_preference' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().identity_preference).toEqual(['cool'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().identity_preference).toEqual(['cool', 'chill'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().identity_preference).toEqual(['chill'])
    });

    it('should add multiple items to the meeting_location array in state', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Turing',
            getAttribute: jest.fn(() => { return 'meeting_location' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'not Turing',
            getAttribute: jest.fn(() => { return 'meeting_location' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().meeting_location).toEqual(['Turing'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().meeting_location).toEqual(['Turing', 'not Turing'])
    });

    it('should remove an existing element from meeting_location array when clicked again', () => {
      let mockClickEvent = { 
        target: { 
          parentNode: {
            innerText: 'Turing',
            getAttribute: jest.fn(() => { return 'meeting_location' })
          }
        } 
      }
      let mockClickEvent2 = { 
        target: { 
          parentNode: {
            innerText: 'not Turing',
            getAttribute: jest.fn(() => { return 'meeting_location' })
          }
        } 
      }

      expect(wrapper.state()).toEqual(mockState)
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().meeting_location).toEqual(['Turing'])
      wrapper.instance().handleClick(mockClickEvent2)
      expect(wrapper.state().meeting_location).toEqual(['Turing', 'not Turing'])
      wrapper.instance().handleClick(mockClickEvent)
      expect(wrapper.state().meeting_location).toEqual(['not Turing'])
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