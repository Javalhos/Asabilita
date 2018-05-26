'use strict'

class SignupValidator {
  get rules () {
    return {
      name: 'required',
      last_name: 'required',
      email: 'required|unique:users|email',
      password: 'required|confirmed|min:6',
      cpf: 'required|min:11|max:11'
    }
  }
}

module.exports = Signup
