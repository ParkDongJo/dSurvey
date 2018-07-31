import contract from 'truffle-contract'
import SurveyCtrlContract from '@contracts/SurveyController.json'
// import {store} from '../../store'

const SurveyController = {

  address: '0xe838389530dae906f2ffb6ab577bc98a19985a89',

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      let surveyControllerABI = contract(SurveyCtrlContract)
      surveyControllerABI.setProvider(window.web3.currentProvider)
      surveyControllerABI.at(self.address).then(instance => {
        resolve({
          surveyCtrlInstance: instance
        })
      }).catch(err => {
        reject(err)
      })
    })
    .then(result => {
      return new Promise(function (resolve, reject) {
        result.surveyCtrlInstance.getSurveyList().then((surveyList, err) => {
          if (err) {
            console.log(err)
            reject(new Error('Unable to get survey list'))
          } else {
            result = Object.assign({}, result, {surveyList})
            resolve(result)
          }
        })
      })
    })
    .then(result => {
      return new Promise(function (resolve, reject) {
        result.surveyCtrlInstance.getCategories().then((categories, err) => {
          if (err) {
            console.log(err)
            reject(new Error('Unable to get categories'))
          } else {
            result = Object.assign({}, result, {categories})
            resolve(result)
          }
        })
      })
    })
  }
}

export default SurveyController
