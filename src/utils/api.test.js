import * as API from './api';
import * as Helper from './helper';

describe('API fetch calls', () => {
  let mockMentors;
  let mockMentor;

  beforeEach(() => {
    mockMentors = {
      data: [
        {  
          attributes: {
            name: 'Casey',
            preferences: {
              title: 'Awesome Coders'
            }
          }
        },
        {
          attributes: {
            name: 'Alex',
            preferences: {
              title: 'Other Coders'
            }
          }
        }
      ]
    }

    mockMentor = {
      name: 'Someone else',
      preferences: {
        title: 'Even Awesomer Coders'
      }
    }
  })
  
  describe('GET request', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMentors)
        })
      );

      await API.fetchMentors()
      expect(window.fetch).toHaveBeenCalled()
    });

    it('should call cleanData with proper params after fetched info comes back', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMentors)
        })
      );
      let spy = jest.spyOn(Helper, 'cleanData')

      await API.fetchMentors()
      expect(spy).toHaveBeenCalled()
    });
  });

  describe('POST request', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMentor)
        })
      )

      await API.postMentor(mockMentor)
      expect(window.fetch).toHaveBeenCalled()
    });
  });

  describe('PATCH request', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMentor)
        })
      )

      await API.patchMentor(mockMentor)
      expect(window.fetch).toHaveBeenCalled()
    });
  
  });
});

describe('helper functions', () => {
  let mockMentors;
  
  beforeEach(() => {
    mockMentors = {
      data: [
        {  
          attributes: {
            name: 'Casey',
            preferences: {
              title: 'Awesome Coders'
            }
          }
        },
        {
          attributes: {
            name: 'Alex',
            preferences: {
              title: 'Other Coders'
            }
          }
        }
      ]
    }
  });

  it('should clean the mentors array passed in', () => {
    let mockCleanData = [
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

    let result = Helper.cleanData(mockMentors)
    expect(result).toEqual(mockCleanData)
  });
});