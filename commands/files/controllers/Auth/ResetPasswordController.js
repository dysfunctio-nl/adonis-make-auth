'use strict'

const Hash = use('Hash')
const Database = use('Database')
const User = use('App/Models/User')
const moment = use('moment')
const TokenBroker = use('Auth/TokenBearer')

class ResetPasswordController {
  constructor() {
    this._redirectTo = 'home'
  }
  
  async showResetForm({ params, view }) {

    return view.render('auth.passwords.reset', {
      token: params.token
    })
  }

  async reset({ request, response, session, auth }) {
    const data = request.only(['token', 'email', 'password'])

    if (!await TokenBroker.isValidToken(data.token, data.email)) {
      session.flash({ flash_error: 'Invalid token was provided.' })
      return response.redirect('back')
    }

    const user = await User.findBy('email', data.email)
    
    if (!user) {
      session.flash({ flash_error: 'Something went wrong.' })
      return response.redirect('back')
    }

    if (await this._savePassword(user, data.password)) {
      await TokenBroker.deletePrevousTokens(data.email)
    }

    try {      
      await auth.login(user)
      session.flash({ flash_info: 'Password has been reset.' })
      return response.route(this._redirectTo)
    }
    catch(error) {
      session.flash({ flash_error: 'Something went wrong.' })
      return response.redirect('back')
    }
  }

  async _savePassword(user, password) {
    user.password = await Hash.make(password)
    return await user.save()
  }
}

module.exports = ResetPasswordController