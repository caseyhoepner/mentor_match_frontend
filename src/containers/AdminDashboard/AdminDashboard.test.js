import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard, mapStateToProps } from './';
jest.mock('uuid', () => jest.fn(() => 1));

describe('AdminDashboard', () => {
  let wrapper;
  let mockMentors = [
    {
      name: 'Casey',
      preferences: {
        title: 'Awesome Coders'
      }
    },
    {
      name: 'Alex',
      preferences: {
        title: 'Other Coders'
      }
    }
  ]
  let mockMentor = {
    name: 'Casey',
    preferences: {
      title: 'Awesome Coders'
    }
  }
  
  beforeEach(() => {
    wrapper = shallow(<AdminDashboard  mentors={mockMentors} />)
  });

  it('matches the snapshot without modalInfo', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with modalInfo', () => {
    wrapper = shallow(<AdminDashboard  modalInfo ={mockMentor} mentors={mockMentors} />)

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with searchTerms', () => {
    wrapper = shallow(<AdminDashboard  searchTerm ='blarg' mentors={mockMentors} />)

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with showingAllMentors filter toggled on', () => {
    wrapper = shallow(<AdminDashboard  showingAllMentors={true} mentors={mockMentors} />)

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with showingAllMentors filter toggled off', () => {
    wrapper = shallow(<AdminDashboard  showingAllMentors={false} mentors={mockMentors} />)

    expect(wrapper).toMatchSnapshot();
  });

  describe('filterBySearchTerm function', () => {
    it('should filter the mentors from props', () => {
      wrapper = shallow(<AdminDashboard  searchTerm ='Alex' mentors={mockMentors} />)
      const expected = [ 
        {
          name: 'Alex',
          preferences: {
            title: 'Other Coders'
          } 
        }
      ]
      let result = wrapper.instance().filterBySearchTerm()
      expect(result).toEqual(expected)
    });
  });
});

describe('mapStateToProps function', () => {
  it('should return an object with mentors, modalInfo, showingAllMentors filter, isEditable boolean, and searchTerm filter', () => {
    const mockState = {
      modalInfo: { name: 'Leslie Knope', preferences: { title: 'waffles' } },
      mentors: [ { name: 'Ron Swanson', preferences: { title: 'steak' } } ],
      showingAllMentors: true,
      searchTerm: 'Les',
      isEditable: false,
      somethingElse: 'B-B-B-BOOYAH!'
    }
    const expected = {
      modalInfo: { name: 'Leslie Knope', preferences: { title: 'waffles' } },
      mentors: [ { name: 'Ron Swanson', preferences: { title: 'steak' } } ],
      showingAllMentors: true,
      searchTerm: 'Les',
      isEditable: false
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });
});