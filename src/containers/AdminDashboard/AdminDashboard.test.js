import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard, mapStateToProps } from './';
jest.mock('uuid', () => jest.fn(() => 1));

describe('AdminDashboard', () => {
  let wrapper;
  let mockMentors = [
    {
      name: 'Casey',
      identity_preference: [
        'female-identifying'
      ],
      stack_preference: 'Front-End'
    },
    {
      name: 'Alex',
      identity_preference: [
        'male-identifying'
      ],
      stack_preference: 'Back-End'
    }
  ]
  let mockMentor = {
    name: 'Casey',
    identity_preference: [
      'female-identifying'
    ],
    stack_preference: 'Front-End'
  }
  let mockFilters = {
    backEnd: false,
    female: false,
    frontEnd: false,
    lgbtq: true,
    male: false,
    parent: false,
    veteran: false
  }
  
  beforeEach(() => {
    wrapper = shallow(<AdminDashboard  mentors={mockMentors} mentorFilters={mockFilters} />)
  });

  it('matches the snapshot without modalInfo', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with modalInfo', () => {
    wrapper = shallow(<AdminDashboard  modalInfo ={mockMentor} mentors={mockMentors} mentorFilters={mockFilters} />)

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with searchTerms', () => {
    wrapper = shallow(<AdminDashboard  searchTerm ='blarg' mentors={mockMentors} mentorFilters={mockFilters} />)

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with showingAllMentors filter toggled on', () => {
    wrapper = shallow(<AdminDashboard  showingAllMentors={true} mentors={mockMentors} mentorFilters={mockFilters} />)

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with showingAllMentors filter toggled off', () => {
    wrapper = shallow(<AdminDashboard  showingAllMentors={false} mentors={mockMentors} mentorFilters={mockFilters} />)

    expect(wrapper).toMatchSnapshot();
  });

  describe('filterBySearchTerm function', () => {
    it('should filter the mentors from props', () => {
      wrapper = shallow(<AdminDashboard  searchTerm ='Alex' mentors={mockMentors} mentorFilters={mockFilters} />)
      const expected = [ 
        {
          name: 'Alex',
          identity_preference: [
            'male-identifying'
          ],
          stack_preference: 'Back-End'
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