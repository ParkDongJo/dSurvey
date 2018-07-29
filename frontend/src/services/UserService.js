import Api from '@/services/Api'

export default {
  registerUser (params) {
    return Api().post('user/register', params)
  },
  getUserList () {
    return Api().get('user/list')
  },
  getUser (id) {
    return Api().get('user/' + id)
  },
  updateUser (params) {
    return Api().put('user/' + params.id, params)
  },
  deleteUser (id) {
    return Api().delete('user/' + id)
  }
}
