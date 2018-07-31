import contract from 'truffle-contract'
import TokenContract from '@contracts/DSurveyToken.json'

const Token = {

  contract: null,
  instance: null,
  address: '0xaa0d1457840ceba75194f68abe70a1a6feaeb7c3',

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(TokenContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.at(self.address).then(instance => {
        self.instance = instance
        resolve(self.instance)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default Token
