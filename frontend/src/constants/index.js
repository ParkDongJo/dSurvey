'use strict'

export const QUESTION_CREATE_TMPL = {
  q: {
    label: '질문',
    input: { name: '질문', val: '' },
    show: true
  },
  o: [
    {
      label: '선택지 1',
      input: { name: '선택지 1', val: '' },
      show: true
    },
    {
      label: '선택지 2',
      input: { name: '선택지 2', val: '' },
      show: false
    },
    {
      label: '선택지 3',
      input: { name: '선택지 3', val: '' },
      show: false
    },
    {
      label: '선택지 4',
      input: { name: '선택지 4', val: '' },
      show: false
    },
    {
      label: '선택지 5',
      input: { name: '선택지 5', val: '' },
      show: false
    }
  ]
}

export const QUESTION_JOIN_TMPL = {
  q: '',
  o: [
    {text: '', value: false},
    {text: '', value: false},
    {text: '', value: false},
    {text: '', value: false},
    {text: '', value: false}
  ]
}

export const SurveyABI = [
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'previousOwner',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'OwnershipTransferred',
    'type': 'event'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_question',
        'type': 'string'
      },
      {
        'name': '_choices',
        'type': 'string[]'
      }
    ],
    'name': 'addQuestionAndChoices',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': '_survey',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': '_from',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': '_answers',
        'type': 'string[]'
      }
    ],
    'name': 'SetAnswers',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'previousOwner',
        'type': 'address'
      }
    ],
    'name': 'OwnershipRenounced',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': '_survey',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': '_questionIdx',
        'type': 'uint256'
      }
    ],
    'name': 'AddQuestionAndChoices',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': '_survey',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': '_from',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'BuySurvey',
    'type': 'event'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_buyer',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'buySurvey',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_from',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'onDSurveyTokenReceived',
    'outputs': [
      {
        'name': '',
        'type': 'bytes4'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_answers',
        'type': 'string[]'
      }
    ],
    'name': 'setAnswers',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_newOwner',
        'type': 'address'
      }
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'withdraw',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'name': '_controller',
        'type': 'address'
      },
      {
        'name': '_newOwner',
        'type': 'address'
      },
      {
        'name': '_categoryIdx',
        'type': 'uint256'
      },
      {
        'name': '_title',
        'type': 'string'
      },
      {
        'name': '_token',
        'type': 'address'
      },
      {
        'name': '_reward',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'calcSurveyPrice',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'categoryIdx',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'controller',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getAnsweredUsers',
    'outputs': [
      {
        'name': '',
        'type': 'address[]'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getAnsweredUsersNum',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_idx',
        'type': 'uint256'
      }
    ],
    'name': 'getAnswersPerQuestion',
    'outputs': [
      {
        'name': '',
        'type': 'string[]'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getNumOfQuestions',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_idx',
        'type': 'uint256'
      }
    ],
    'name': 'getQuestionAndChoices',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      },
      {
        'name': '',
        'type': 'string[]'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getTokenState',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'imgUrl',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'name': 'isAnsweredUser',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'name': 'isBoughtUser',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'reward',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'title',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'token',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }
]
