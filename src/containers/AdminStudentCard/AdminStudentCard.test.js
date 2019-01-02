import React from 'react';
import { shallow } from 'enzyme';
import AdminStudentCard from './';

describe ('AdminStudentCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AdminStudentCard />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})