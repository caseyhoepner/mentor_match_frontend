import * as API from './api';
import * as Helper from './helper';

describe('API fetch calls', () => {
  let mockMentors;
  let mockMentor;
  let mockStudents;
  let mockStudent;
  let mockRelationships;
  let mockRelationship;

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

    mockStudents = {
      data: [
        {
          attrubutes: {
            name: 'Michael Hitchcock',
            stack: 'Back-End'
          }
        },
        {
          attributes: {
            name: 'Norm Scully',
            stack: 'Front-End'
          }
        }
      ]
    }

    mockStudent = {
      name: 'Rosa Diaz',
      stack: 'Front-End'
    }

    mockRelationships = {
      data: [
        {
          attributes: {
            student_id: 2,
            mentor_id: 4,
            active: true
          }
        },
        {
          attributes: {
            student_id: 12,
            mentor_id: 5,
            active: true            
          }
        }
      ]
    }

    mockRelationship = {
      student_id: 17,
      mentor_id: 8,
      active: true
    }
  })
  
  describe('GET request - Mentors', () => {
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
      expect(spy).toHaveBeenCalledWith(mockMentors)
    });
  });

  describe('GET request - Students', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockStudents)
        })
      );

      await API.fetchStudents()
      expect(window.fetch).toHaveBeenCalled()
    });

    it('should call cleanData with proper params after fetched info comes back', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockStudents)
        })
      );
      let spy = jest.spyOn(Helper, 'cleanData')

      await API.fetchStudents()
      expect(spy).toHaveBeenCalledWith(mockStudents)
    });
  });

  describe('GET request - Relationships', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRelationships)
        })
      );

      await API.fetchRelationships()
      expect(window.fetch).toHaveBeenCalled()
    });

    it('should call cleanRelationshipData with proper params after fetched info comes back', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRelationships)
        })
      );
      let spy = jest.spyOn(Helper, 'cleanRelationshipData')

      await API.fetchRelationships()
      expect(spy).toHaveBeenCalledWith(mockRelationships)
    });
  });

  describe('POST request - Mentors', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMentor)
        })
      );

      await API.postMentor(mockMentor)
      expect(window.fetch).toHaveBeenCalled()
    });
  });

  describe('POST request - Students', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockStudent)
        })
      );

      await API.postStudent(mockStudent)
      expect(window.fetch).toHaveBeenCalled()
    });
  });

  describe('POST request - Relationships', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRelationship)
        })
      );

      await API.postRelationship()
      expect(window.fetch).toHaveBeenCalled()
    });
  });

  describe('PATCH request - Mentors', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMentor)
        })
      );

      await API.patchMentor(mockMentor)
      expect(window.fetch).toHaveBeenCalled()
    });
  
  });

  describe('PATCH request - Students', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockStudent)
      })
    );

    await API.patchStudent(mockStudent)
    expect(window.fetch).toHaveBeenCalled()
    });
  });

  describe('PATCH request - Relationships', () => {
    it('should call fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRelationship)
      })
    );

    await API.patchRelationship()
    expect(window.fetch).toHaveBeenCalled()
    });
  });
});

describe('helper functions', () => {
  let mockMentors;
  let mockRelationships;
  
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

    mockRelationships = {
      data: [
        {
          attributes: {
            student_id: 2,
            mentor_id: 4,
            active: true
          }
        },
        {
          attributes: {
            student_id: 12,
            mentor_id: 5,
            active: false            
          }
        }
      ]
    }
  });

  describe('cleanData function', () => {
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

  describe('cleanRelationshipData function', () => {
    it('should clean the relationships array passed in', () => {
      let mockCleanRelationships = [
        {
          attributes: {
            student_id: 2,
            mentor_id: 4,
            active: true
          }
        }
      ]

      let result = Helper.cleanRelationshipData(mockRelationships)
      expect(result).toEqual(mockCleanRelationships)
    });
  });
});