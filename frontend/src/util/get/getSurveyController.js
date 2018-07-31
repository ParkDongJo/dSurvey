import contract from 'truffle-contract'
import SurveyCtrlContract from '@contracts/SurveyController.json'
import {store} from '../store'

const SurveyController = {

  contract: null,
  instance: null,
  address: '0xe838389530dae906f2ffb6ab577bc98a19985a89',

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(SurveyCtrlContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.at(self.address).then(instance => {
        self.instance = instance
        resolve(self.instance)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getSurveyList: function () {
    return new Promise(function (resolve, reject) {
      store.state.surveyCtrlInstance().getSurveyList().then(result => {
        store.dispatch('getSurveyList', {
          surveyList: result
        })
      }).catch(err => {
        console.log(err)
      })
    })
  }
}

export default SurveyController
