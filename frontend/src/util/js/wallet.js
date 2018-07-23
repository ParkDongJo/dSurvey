import contract from 'truffle-contract'
import TokenContract from '@contracts/DSurveyToken.json'

const Wallet = {

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
  },
  callTotalSupply: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.totalSupply().then(result => {
        console.log(result)
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },
  callBalanceOf: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.balanceOf().then(result => {
        console.log(result)
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // callTransfer: function (to, value) {
  //   let self = this
  //
  //   return new Promise((resolve, reject) => {
  //     self.instance.transfer(
  //       to,
  //       value,
  //       {
  //         from: to,
  //         gasPrice: BigNumber(30000).multipliedBy(1000000000)
  //       }
  //     ).then(result => {
  //       console.log(result)
  //       resolve(result)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // },
  // callTransferFrom: function (to, from, value) {
  //   let self = this
  //
  //   return new Promise((resolve, reject) => {
  //     self.instance.transferFrom.call(
  //       to,
  //       from,
  //       value,
  //       {
  //         from: to,
  //         gasPrice: BigNumber(30000).multipliedBy(1000000000)
  //       }
  //     ).then(result => {
  //       console.log(result)
  //       resolve(result)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // },
  // callApprove: function (to, value) {
  //   let self = this
  //
  //   return new Promise((resolve, reject) => {
  //     self.instance.approve(
  //       to,
  //       value,
  //       {
  //         from: to,
  //         gasPrice: BigNumber(30000).multipliedBy(1000000000)
  //       }
  //     ).then(result => {
  //       console.log(result)
  //       resolve(result)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // },
  callSafeTransfer: function () {

  }
}

export default Wallet
