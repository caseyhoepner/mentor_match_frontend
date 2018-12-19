import React from 'react';
import { shallow } from 'enzyme';
import App from './';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<App />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
