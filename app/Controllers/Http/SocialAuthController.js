'use strict'

const User = use('App/Models/User');

class SocialAuthController {
  async facebook ({ ally, auth, response }) {
    try {
      const pvdUser = await ally.driver('facebook').getUser();

      const userDetails = {
        email: pvdUser.getEmail(),
        token: pvdUser.getAccessToken(),
        login_source: 'facebook'
      };

      const whereClause = {
        email: userDetails.email()
      };

      const user = await User.findOrCreate(whereClause, userDetails);
      let token = await auth
        .withRefreshToken()
        .generate(user);

      return response.status(201).send({
        token
      });
    } catch (e) {
      return response.status(500).send({ message: e.message });
    }
  }

  async redirect ({ ally, params, response }) {
    const provider = params.provider;
    let url = '';

    switch (provider) {
      case 'facebook':
      case 'twitter':
      case 'google':
        url = await ally.driver(provider).getRedirectUrl();
        break;
      default:
        return response.status('400').send({
          message: 'Invalid provider'
        });
    }

    return { url };
  }
}

module.exports = SocialAuthController
