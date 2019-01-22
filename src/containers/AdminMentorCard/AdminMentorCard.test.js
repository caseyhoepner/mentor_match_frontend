import React from 'react';
import { shallow } from 'enzyme';
import { AdminMentorCard, mapDispatchToProps } from './';

describe('AdminMentorCard', () => {
  let wrapper;
  let mockMentor = {
      name: 'Diane',
      identity_preference: ['female-identifying', 'lgbtq+'],
      matched: true
    }
  let mockFunc = jest.fn()
  
  beforeEach(() => {
    wrapper = shallow(<AdminMentorCard mentor={mockMentor} />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleClick function', () => {
    it('should fire setMentorModal from props', () => {
      wrapper = shallow(<AdminMentorCard setMentorModal={mockFunc} mentor={mockMentor} />)

      wrapper.instance().handleClick()
      expect(mockFunc).toHaveBeenCalled()
    });
  });
});

describe('mapDispatchToProps function', () => {
  const mockDispatch = jest.fn()
  let mappedProps;
  let mockMentor = {
    name: 'Casey',
    preferences: {
      title: 'Awesome Coders'
    }
  }

  beforeEach(() => {
    mappedProps = mapDispatchToProps(mockDispatch)
  });

  it('should fire dispatch when setMentorModal is called', () => {
    mappedProps.setMentorModal(mockMentor)
    expect(mockDispatch).toHaveBeenCalled()
  });
});