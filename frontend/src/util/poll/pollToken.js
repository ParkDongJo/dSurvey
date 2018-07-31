// import Web3 from 'web3'
import {store} from '../../store/index'

let pollToken = function (state) {
  // let web3 = window.web3
  // web3 = new Web3(web3.currentProvider)
  let account = store.state.web3.coinbase
  let ctrl = store.state.surveyCtrlInstance()

  setInterval(() => {
    store.state.walletInstance().allowance(account, ctrl.address, {from: ctrl.address}).then((result) => {
      store.dispatch('pollAllowance', {
        allowance: parseInt(result.toString(10))
      })
    }).catch(err => {
      console.log(err)
    })
  }, 500)
}

export default pollToken
