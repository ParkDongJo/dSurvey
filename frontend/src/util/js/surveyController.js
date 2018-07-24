import contract from 'truffle-contract'
import SurveyCtrlContract from '@contracts/SurveyController.json'

const SurveyController = {

  contract: null,
  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(SurveyCtrlContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve(self.instance)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getSurveyList: function () {
    // let self = this
    //
    // return new Promise((resolve, reject) => {
    //   self.instance.getSurveyList().then(result => {
    //     console.log(result)
    //     resolve(result)
    //   }).catch(err => {
    //     reject(err)
    //   })
    // })
  }
}

export default SurveyController
