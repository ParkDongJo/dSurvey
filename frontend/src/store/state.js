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
  surveyInstance: null,
  walletInstance: null,
  ctrl: {
    allowance: 0
    categories: [],
    surveyList: []
  },
  createView: {
    instance: null,
    questions: [],
    options: []
  }
}

export default state
