import React from 'react';
import { shallow } from 'enzyme';
import MentorContainer from './';
import { BrowserRouter } from 'react-router-dom';

describe('MentorContainer', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<MentorContainer />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});