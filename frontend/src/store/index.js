import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import SurveyController from '../util/getSurveyController'
import Survey from '../util/getSurvey'
import Token from '../util/getToken'

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
    },
    pollWeb3Instance (state, payload) {
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
    },

    // 컨트렉트 인스턴스 등록
    registerSurveyCtrlInstance (state, payload) {
      state.surveyCtrlInstance = () => payload
    },
    registerSurveyContract (state, payload) {
      state.surveyInstance = () => payload
    },
    registerWalletInstance (state, payload) {
      state.walletInstance = () => payload
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

    // 컨트렉트 인스턴스 가져오기
    // 설문컨트롤러
    getSurveyCtrlIns ({commit}) {
      SurveyController.init().then(result => {
        commit('registerSurveyCtrlInstance', result)
      }).catch(e => console.log(e))
    },
    // 설문
    getSurvey ({commit}, payload) {
      Survey.create(payload.at).then(result => {
        commit('registerSurveyContract', result)
      }).catch(e => console.log(e))
    },
    // 토큰
    getWallet ({commit}) {
      Token.init().then(result => {
        commit('registerWalletInstance', result)
      }).catch(e => console.log(e))
    }
  },
  getters: {
    getAppTitle: () => {
      return state.app.title
    }
  }
})
