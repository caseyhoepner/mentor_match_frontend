import React from 'react';
import { shallow } from 'enzyme';
import { AdminMentorCard } from './';

describe('AdminMentorCard', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<AdminMentorCard />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});