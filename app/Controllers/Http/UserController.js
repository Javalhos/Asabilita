'use strict'

const User = use('App/Models/User');

class UserController {
  async load ({ auth, response }) {
    try {
      let user = await auth.current.user;
      return response.status(200).send({ user: user.json() });
    } catch (e) {
      return response.status(401).send({ error: { message: 'Unauthorized!' } });
    }
  }

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
