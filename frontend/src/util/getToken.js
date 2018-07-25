import contract from 'truffle-contract'
import TokenContract from '@contracts/DSurveyToken.json'

const Token = {

  contract: null,
  instance: null,
  address: '0x42a6040658dfc37e9d675b7872ae0b8ee1930ead',

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
