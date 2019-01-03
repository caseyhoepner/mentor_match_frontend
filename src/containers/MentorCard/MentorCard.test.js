import React from 'react';
import { shallow } from 'enzyme';
import { MentorCard } from './';

describe('MentorCard', () => {
  let wrapper;
  let mockMentor = {
    props: {
      mentor: {
        name: 'Oscars Blues',
        current_title: 'Coder',
        background: 'I know how to code!'
      }
    }
  }
  
  beforeEach(() => {
    wrapper = shallow(<MentorCard mentor={mockMentor} />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});