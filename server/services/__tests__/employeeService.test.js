const {flatToHierarchy} = require('../employeeService');

describe('test flatToHierarchy function', () => {
  it('should group all employees without supervisor as top level entries in result with subordinates as child array sorted by position_level in ascending order', () => {
    const mock = [
      {
        id: 1,
        first_name: 'test-1',
        supervisor_id: null,
        position_level: 1
      },
      {
        id: 2,
        first_name: 'test-2',
        supervisor_id: 1,
        position_level: 3
      },
      {
        id: 3,
        first_name: 'test-3',
        supervisor_id: 1,
        position_level: 2
      },
      {
        id: 4,
        first_name: 'test-4',
        supervisor_id: 3,
        position_level: 2
      },
      {
        id: 5,
        first_name: 'test-5',
        supervisor_id: null,
        position_level: 3
      }
    ];

    const expected = [
      {
        id: 1,
        first_name: 'test-1',
        supervisor_id: null,
        position_level: 1,
        subordinates: [
          {
            id: 3,
            first_name: 'test-3',
            supervisor_id: 1,
            position_level: 2,
            subordinates: [
              {
                id: 4,
                first_name: 'test-4',
                supervisor_id: 3,
                position_level: 2,
                subordinates: []
              }
            ]
          },
          {
            id: 2,
            first_name: 'test-2',
            supervisor_id: 1,
            position_level: 3,
            subordinates: []
          }
        ]
      },
      {
        id: 5,
        first_name: 'test-5',
        supervisor_id: null,
        position_level: 3,
        subordinates: []
      }
    ];

    expect(flatToHierarchy(mock)).toEqual(expected);
  });

  it('should return empty array if none of items in original array including supervisor_id property', () => {
    const mock = [
      {
        id: 1,
        first_name: 'test-1',
        position_level: 1
      },
      {
        id: 2,
        first_name: 'test-2',
        position_level: 3
      },
      {
        id: 3,
        first_name: 'test-3',
        position_level: 2
      },
      {
        id: 4,
        first_name: 'test-4',
        position_level: 2
      },
      {
        id: 5,
        first_name: 'test-5',
        position_level: 3
      }
    ];

    expect(flatToHierarchy(mock)).toEqual([]);
  });
});
