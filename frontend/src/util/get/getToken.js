import contract from 'truffle-contract'
import TokenContract from '@contracts/DSurveyToken.json'
import {store} from '../../store'

const Token = {

  contract: null,
  instance: null,
  address: '',

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(TokenContract)
      self.contract.setProvider(window.web3.currentProvider)
      self.address = store.state.app.tokenAddress

      self.contract.at(self.address).then(instance => {
        self.instance = instance
        resolve({
          tokenInstance: self.instance
        })
      }).catch(err => {
        reject(err)
      })
    }).then(result => {
      return new Promise(function (resolve, reject) {
        let account = store.state.web3.coinbase
        let ctrlAddress = store.state.app.ctrlAddress

        result.tokenInstance.allowance(account, ctrlAddress, {from: ctrlAddress}).then((allowance) => {
          allowance = allowance.toString(10)
          result = Object.assign({}, result, {allowance})
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    }).then(result => {
      return new Promise(function (resolve, reject) {
        let account = store.state.web3.coinbase

        result.tokenInstance.balanceOf(account, {from: account}).then((value) => {
          value = value.toString(10)
          result = Object.assign({}, result, {value})
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    })// then() end
  }
}

export default Token
