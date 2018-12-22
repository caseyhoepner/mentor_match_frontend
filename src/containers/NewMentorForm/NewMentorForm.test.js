import React from 'react';
import { shallow } from 'enzyme';
import { NewMentorForm } from './';

describe('NewMentorForm', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<NewMentorForm />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});