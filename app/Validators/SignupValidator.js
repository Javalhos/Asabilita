class SignupValidator {
  get rules () {
    return {
      name: 'required',
      last_name: 'required',
      email: 'required|unique:users|email',
      password: 'required|confirmed|min:6',
      cpf: 'required|unique:users|min:11|max:11',
      birthday: 'required'
    }
  }

  get validateAll() {
    return true;
  }

  get messages () {
    return {
      'required': 'Campo obrigatório.',
      'unique': 'Já existe um \'{{ field }}\' com este valor.',
      'email': 'Insira um email válido.',
      'date_format': 'Insira uma data no formato {{ argument.0 }}',
      'password.min': 'A senha precisa ter no mínimo 6 caracteres.',
      'password.confirmed': 'As senhas não são iguais',
      'cpf.min': 'Insira exatamente 11 dígitos.',
      'cpf.max': 'Insira exatamente 11 dígitos.'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).json({errors: errorMessages});
  }
}

module.exports = SignupValidator;
