import contract from 'truffle-contract'
import SurveyContract from '@contracts/Survey.json'

const Survey = {

  contract: null,
  instance: null,

  init: function (address) {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(SurveyContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.at(address).then(instance => {
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  create: function () {

  }
}

export default Survey
