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
