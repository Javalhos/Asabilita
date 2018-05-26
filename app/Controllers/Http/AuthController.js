'use strict'

class AuthController {
  async signin ({ request, auth }) {
    let { email, password } = request.all();

    let tokens = await auth
      .withRefreshToken()
      .attempt(email, password);

    return tokens;
  }

  async signout ({ auth }) {
    let user = auth.current.user;
    let token = auth.getAuthHeader();

    await user.tokens()
      .where('token', token)
      .update({ is_revoked: true });

    return {
      tokenStatus: 'revoked',
      message: 'Token was successfully revoked'
    };
  }
}

module.exports = AuthController
