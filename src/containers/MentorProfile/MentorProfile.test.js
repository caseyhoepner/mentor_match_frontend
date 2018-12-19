import React from 'react';
import { shallow } from 'enzyme';
import { MentorProfile } from './';

describe('MentorProfile', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<MentorProfile />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});