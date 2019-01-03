import React from 'react';
import { shallow } from 'enzyme';
import { AdminStudentCard } from './';

describe ('AdminStudentCard', () => {
  let wrapper;
  let mockStudent = { 
      name: 'Casey',
      identity_marker: [ 'female-identifying' ],
      stack: 'Front-End',
      matched: 'true'
    }

  beforeEach(() => {
    wrapper = shallow(<AdminStudentCard student={mockStudent} />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})