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
    pollAllowance (state, payload) {
      state.ctrl.allowance = payload.allowance
    },
    // 컨트렉트 인스턴스 등록
    registerSurveyCtrlInstance (state, payload) {
      console.log('registerSurveyCtrlInstance Mutation being executed', payload)
      state.surveyCtrlInstance = () => payload
      // SurveyController.getSurveyList()
    },
    registerSurveyList (state, payload) {
      state.ctrl.surveyList = payload.surveyList
    },
    registerSurveyContract (state, payload) {
      state.surveyInstance = () => payload
    },
    registerWalletInstance (state, payload) {
      state.walletInstance = () => payload
    },
    createNewQuestion (state, payload) {
      state.createView.questions.push(JSON.parse(JSON.stringify(payload.template.q)))
      state.createView.options.push(JSON.parse(JSON.stringify(payload.template.o)))
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
    pollAllowance ({commit}, payload) {
      commit('pollAllowance', payload)
    },

    // 컨트렉트 인스턴스 가져오기
    // 설문컨트롤러
    getSurveyCtrlIns ({commit}) {
      SurveyController.init().then(result => {
        commit('registerSurveyCtrlInstance', result)
      }).catch(e => console.log(e))
    },
    getSurveyList ({commit}, payload) {
      commit('registerSurveyList', payload)
    },
    // 설문
    getSurvey ({commit}, payload) {
      Survey.init(payload.at).then(result => {
        commit('registerSurveyContract', result)
      }).catch(e => console.log(e))
    },
    // 토큰
    getWallet ({commit}) {
      Token.init().then(result => {
        commit('registerWalletInstance', result)
      }).catch(e => console.log(e))
    },

    // 컨트렉트 인스턴스 생성
    // 설문
    createSurvey ({commit}, payload) {
      let param = payload
      let ctrl = param.instance
      let account = state.web3.coinbase

      ctrl.createSurvey(param.categoryIdx,
        param.title,
        param.token,
        param.reward,
        {from: account, gas: 8000000})
        .then(result => {
          console.log('result survey : ', result)
          this.getSurvey({at: result})
        }).catch(err => {
          console.log(err)
        })
    }
  },
  getters: {
    getAppTitle: () => {
      return state.app.title
    },
    getAllowance: () => {
      return !state.ctrl.allowance ? 0 : state.ctrl.allowance
    }
  }
})
