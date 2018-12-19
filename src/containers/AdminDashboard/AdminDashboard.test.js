import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard } from './';

describe('AdminDashboard', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<AdminDashboard />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});