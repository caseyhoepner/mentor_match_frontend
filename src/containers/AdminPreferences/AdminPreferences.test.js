import React from 'react';
import { shallow } from 'enzyme';
import { AdminPreferences } from './';

describe('AdminPreferences', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<AdminPreferences />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});