import React from 'react';
import { shallow } from 'enzyme';
import { EditableMentor } from './';

describe('EditableMEntor', () => {
  let wrapper;
  let mockMentor = {
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
    wrapper = shallow(<EditableMentor currentMentor={mockMentor} />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});