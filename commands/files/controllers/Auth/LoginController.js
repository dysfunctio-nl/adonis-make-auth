'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class LoginController {
  constructor() {
    this._redirectTo = 'home'
  }

  async showLoginForm({ view }) {
    return view.render('auth.login')
  }

  async login({ request, session, response, auth }) {
    const data = request.only(['email', 'password'])

    const user = await User.findBy('email', data.email )

    if ( !user ) {
      session.flash({ flash_error: 'Wrong email or password.' })
      return response.redirect('back')
    }

    if (!await Hash.verify(data.password, user.password)) {
      session.flash({ flash_error: 'Wrong email or password.' })
      return response.redirect('back')
    }

    try {
      await auth.login(user)

      return response.route(this._redirectTo)
    }
    catch(error) {
      session.flash({ flash_error: 'Something went wrong.' })
      return response.redirect('back')
    }
  }

  async logout({ response, session, auth }) {
    try {
      await auth.logout()
      return response.route(this._redirectTo)
    }
    catch(error) {
      session.flash({ flash_error: 'Something went wrong.' })
      return response.redirect('back')
    }
  }
}

module.exports = LoginController