'use strict'

class LoginValidator {
  get rules () {
    return {
      email: 'required|email',
      password: 'required|min:6'
    }
  }

  get validateAll () {
    return true;
  }

  get messages () {
    return {
      'required': 'Campo obrigatório',
      'email': 'Insira um email válido',
      'min': 'Este campo deve ter no mínimo {{ argument.0 }} caracteres.'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).json({ errors: errorMessages });
  }
}

module.exports = LoginValidator
