import React from 'react';
import { shallow } from 'enzyme';
import SuccessPage from './';

describe ('SuccessPage', () => {
  let wrapper;
  let mockHistory = {
    location: {
      state: {
        from: '/new-student-form'
      }
    }
  }

  beforeEach(() => {
    wrapper = shallow(<SuccessPage history={mockHistory} />)
  })

  it('should match the snapshot when it came from NewStudentForm', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot when it came from NewMentorForm', () => {
    let mockHistory2 = {
      location: {
        state: {
          from: '/new-mentor-form'
        }
      }
    }
    wrapper = shallow(<SuccessPage history={mockHistory2} />)
    expect(wrapper).toMatchSnapshot()
  });
})