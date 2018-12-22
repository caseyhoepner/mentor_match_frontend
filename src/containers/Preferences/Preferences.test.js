import React from 'react';
import { shallow } from 'enzyme';
import { Preferences } from './';

describe('Preferences', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<Preferences />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});