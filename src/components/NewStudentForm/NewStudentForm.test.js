import React from 'react';
import { shallow } from 'enzyme';
import NewStudentForm from './';

describe ('NewStudentForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NewStudentForm />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})