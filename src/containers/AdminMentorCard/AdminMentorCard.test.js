import React from 'react';
import { shallow } from 'enzyme';
import { AdminMentorCard } from './';

describe('AdminMentorCard', () => {
  let wrapper;
  let mockMentor = {
      name: 'Casey',
      preferences: {
        title: 'Awesome Coders'
      }
    }
  
  beforeEach(() => {
    wrapper = shallow(<AdminMentorCard mentor={mockMentor} />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});