'use strict'

const User = use('App/Models/User');

class UserController {
  async store ({ request, auth }) {
    let user = await User.create(request.only([
      'name',
      'last_name',
      'email',
      'cpf',
      'password'
    ]));

    let tokens = await auth
      .withRefreshToken()
      .generate(user);

    return tokens;
  }

  async show () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = UserController
