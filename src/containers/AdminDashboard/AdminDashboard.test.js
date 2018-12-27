import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard } from './';
jest.mock('uuid', () => jest.fn(() => 1));

describe('AdminDashboard', () => {
  let wrapper;
  let mockMentors = [
    {
      name: 'Casey',
      preferences: {
        title: 'Awesome Coders'
      }
    },
    {
      name: 'Alex',
      preferences: {
        title: 'Other Coders'
      }
    }
  ]
  
  beforeEach(() => {
    wrapper = shallow(<AdminDashboard  mentors={mockMentors} />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});