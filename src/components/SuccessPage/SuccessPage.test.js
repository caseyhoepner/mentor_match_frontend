import React from 'react';
import { shallow } from 'enzyme';
import SuccessPage from './';

describe ('SuccessPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SuccessPage />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})