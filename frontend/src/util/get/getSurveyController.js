import contract from 'truffle-contract'
import SurveyCtrlContract from '@contracts/SurveyController.json'
import SurveyContract from '@contracts/Survey.json'
// import {store} from '../../store'

const SurveyController = {

  // address: '0xe838389530dae906f2ffb6ab577bc98a19985a89',
  address: '0xed57661f7178f5469374973571ada7e8369019b5',

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
        result.surveyCtrlInstance.getSurveyList().then((surveyAddresses, err) => {
          if (err) {
            console.log(err)
            reject(new Error('Unable to get survey list'))
          } else {
            result = Object.assign({}, result, {surveyAddresses})
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
    .then(async (result) => {
      let surveyPromises = []
      await result.surveyAddresses.forEach(function (surveyAddress) {
        surveyPromises.push(
          new Promise(function (resolve, reject) {
            let contractABI = contract(SurveyContract)
            contractABI.setProvider(window.web3.currentProvider)
            contractABI.at(surveyAddress).then(async (instance) => {
              let item = {}
              item.address = instance.address
              item.title = await instance.title().then((value) => { return value })
              resolve(item)
            }).catch(err => {
              reject(err)
            })
          })
        )
      })
      return Promise.all(surveyPromises).then(function (surveys) {
        result = Object.assign({}, result, {surveys})
        console.log(result)
        return result
        // console.log(titles)
      })
    })
  }
}

export default SurveyController
