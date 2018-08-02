let state = {
  app: {
    title: 'D SURVEY',
    tokenAddress: '0xaa0d1457840ceba75194f68abe70a1a6feaeb7c3',
    ctrlAddress: '0xe838389530dae906f2ffb6ab577bc98a19985a89'
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
  wallet: {
    value: 0
  },
  createView: {
    address: '',
    instance: null,
    questions: [],
    options: []
  }
}

export default state
