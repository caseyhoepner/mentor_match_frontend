import React from 'react';
import { shallow } from 'enzyme';
import { AdminMentorSearch } from './';

describe('AdminMentorSearch', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<AdminMentorSearch />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});