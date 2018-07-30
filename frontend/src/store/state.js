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
    category: []
  },
  createView: {
    questions: [],
    options: []
  }
}

export default state
