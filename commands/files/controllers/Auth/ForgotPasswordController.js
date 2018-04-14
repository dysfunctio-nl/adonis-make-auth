'use strict'

const User = use('App/Models/User')
const uuid = require('uuid/v1')
const Mail = use('Mail')
const Config = use('Config')
const TokenBroker = use('Auth/TokenBearer')

class ForgotPasswordController {
  constructor() {
    this._redirectTo = 'home'
  }

  async showLinkRequestForm({ view }) {
    return view.render('auth.passwords.email')
  }

  async sendResetLinkEmail({ request, response, session }) {
    const data = request.only(['email'])

    const user = await User.findBy('email', data.email )

    if (!user) {
      return response.redirect('back')
    }

    TokenBroker.deletePrevousTokens(user.email)

    const token = uuid()

    if (!TokenBroker.createToken(user.email, token)) {
      session.flash({ flash_error: 'Something went wrong.' })
      return response.redirect('back')
    }

    this._sendEmail(user.email, token)
    return response.route(this._redirectTo)
  }

  async _sendEmail(email, token) {
    await Mail.send('emails.forgot', { token, appName: Config.get('app.name', 'AdonisJs') }, (message) => {
      message.from('noreply@example.com')
      message.subject('Reset password')
      message.to(email)
    })
  }
}

module.exports = ForgotPasswordController