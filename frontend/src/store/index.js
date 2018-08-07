import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/get/getWeb3'
import pollWeb3 from '../util/poll/pollWeb3'
import pollToken from '../util/poll/pollToken'
import SurveyController from '../util/get/getSurveyController'
import Survey from '../util/get/getSurvey'
import Token from '../util/get/getToken'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance (state, payload) {
      console.log('registerWeb3Instance Mutation being executed', payload)
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
      pollWeb3()
      pollToken()
    },
    pollWeb3Instance (state, payload) {
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
    },
    setAllowance (state, payload) {
      state.ctrl.allowance = parseInt(payload, 10)
    },
    showSpin (state, payload) {
      state.app.loading = true
    },
    hideSpin (state, payload) {
      state.app.loading = false
    },
    // 컨트렉트 인스턴스 등록
    registerSurveyCtrlInstance (state, payload) {
      console.log('registerSurveyCtrlInstance Mutation being executed', payload)
      let result = payload
      let ctrlCopy = state.ctrl
      ctrlCopy.categories = result.categories
      ctrlCopy.surveys.addresses = result.surveyAddresses
      ctrlCopy.surveys.titles = result.surveyTitles
      state.ctrl = ctrlCopy

      let ctrlInstCopy = state.surveyCtrlInstance
      ctrlInstCopy = result.surveyCtrlInstance
      state.surveyCtrlInstance = () => ctrlInstCopy
    },
    registerSurveyContract (state, payload) {
      state.selectedSurveyInstance = () => payload.surveyInstance
    },
    registerWalletInstance (state, payload) {
      state.walletInstance = () => payload.tokenInstance
      state.ctrl.allowance = payload.allowance
      state.wallet.value = payload.value
    },
    createNewQuestion (state, payload) {
      state.createView.questions.push(JSON.parse(JSON.stringify(payload.template.q)))
      state.createView.options.push(JSON.parse(JSON.stringify(payload.template.o)))
    },
    registerNewSurveyContract (state, payload) {
      state.createView.address = payload.logs[0].address
    }
  },
  actions: {
    registerWeb3 ({commit}) {
      getWeb3.then(result => {
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },
    pollWeb3 ({commit}, payload) {
      commit('pollWeb3Instance', payload)
    },
    setAllowance ({commit}, payload) {
      let account = store.state.web3.coinbase
      let param = payload
      let ctrl = param.instance

      store.state.walletInstance().allowance(account, ctrl.address, {from: ctrl.address}).then((result) => {
        commit('setAllowance', result)
      }).catch(err => {
        console.log(err)
      })
    },

    // 컨트렉트 인스턴스 가져오기
    // 설문컨트롤러
    getSurveyCtrlIns ({commit}) {
      SurveyController.init().then(result => {
        commit('registerSurveyCtrlInstance', result)
      }).catch(e => {
        console.log(e)
      })
    },
    // 설문
    getSurvey ({commit}, payload) {
      Survey.init(payload.at).then(result => {
        commit('registerSurveyContract', result)
      }).catch(e => console.log(e))
    },
    // 토큰
    getWallet ({commit}) {
      console.log('getWallet')
      Token.init().then(result => {
        commit('registerWalletInstance', result)
      }).catch(e => console.log(e))
    },

    // 컨트렉트 인스턴스 생성
    // 설문
    createSurvey ({commit, dispatch}, payload) {
      return new Promise(function (resolve, reject) {
        let param = payload
        let ctrl = param.instance
        let account = state.web3.coinbase

        ctrl.createSurvey(
          parseInt(param.categoryIdx),
          param.title,
          parseInt(param.token),
          parseInt(param.reward),
          {from: account})
          .then(result => {
            console.log('result == Contract ', result)
            commit('registerNewSurveyContract', result)
            dispatch('getSurvey', {at: result.logs[0].address})
            resolve(result)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // 설문에 질문 추가
    createNewQuestion ({commit}, payload) {
      return new Promise(function (resolve, reject) {
        let q = payload.question.q
        let o = payload.question.o

        state.selectedSurveyInstance().addQuestionAndChoices(q, o, {from: payload.account}).then((result) => {
          // self.value = result.toString(10)
          resolve(result)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    getSurveyByAddr ({commit}, payload) {
      return new Promise(function (resolve, reject) {
        state.surveyCtrlInstance().getOwnedSurveyList(payload.address).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
    getAppTitle: () => {
      return state.app.title
    },
    getAllowance: () => {
      return state.ctrl.allowance
    }
  }
})
