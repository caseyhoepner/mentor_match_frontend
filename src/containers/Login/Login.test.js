import React from 'react';
import { shallow } from 'enzyme';
import { Login } from './';

describe('Login', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<Login />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});