import React from 'react';
import { shallow } from 'enzyme';
import { Search } from './';

describe('Search', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<Search />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});