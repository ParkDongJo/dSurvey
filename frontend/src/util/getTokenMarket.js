import contract from 'truffle-contract'
import TokenMarketContract from '@contracts/DSurveyTokenMarket.json'

const TokenMarket = {

  contract: null,
  instance: null,
  address: '0x36d893eeb4fe1bb4f1dc4512f5380f0625405e16',

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(TokenMarketContract)
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

export default TokenMarket
