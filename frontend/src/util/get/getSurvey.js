// import contract from 'truffle-contract'
// import SurveyContract from '@contracts/Survey.json'
import { SurveyABI } from '../../constants/index'
import Web3 from 'web3'

const Survey = {

  contract: null,
  instance: null,

  init: function (address) {
    let self = this

    return new Promise(function (resolve, reject) {
      // 리믹스 코드
      let web3 = new Web3(window.web3.currentProvider)
      self.contract = web3.eth.contract(SurveyABI)
      let instance = self.contract.at(address)

      resolve({
        surveyInstance: instance
      })

      // 트러플 코드
      // self.contract = contract(SurveyContract)
      // self.contract.setProvider(window.web3.currentProvider)
      // self.contract.at(address).then(instance => {
      //   self.instance = instance
      //   resolve({
      //     surveyInstance: self.instance
      //   })
      // }).catch(err => {
      //   reject(err)
      // })
    })
  }
}

export default Survey
