let state = {
  app: {
    title: 'D SURVEY'
  },
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null
  },
  surveyCtrlInstance: null,
  surveyInstance: [],
  walletInstance: null,
  ctrl: {
    allowance: 0,
    categories: [],
    surveys: {
      addresses: [],
      titles: []
    }
  },
  createView: {
    address: '',
    instance: null,
    questions: [],
    options: []
  }
}

export default state
