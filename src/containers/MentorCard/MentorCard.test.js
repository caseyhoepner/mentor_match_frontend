import React from 'react';
import { shallow } from 'enzyme';
import { MentorCard } from './';

describe('MentorCard', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<MentorCard />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});