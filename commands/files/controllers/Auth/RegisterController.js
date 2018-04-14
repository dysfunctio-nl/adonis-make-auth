'use strict'

const View = use('View')
const User = use('App/Models/User')

class RegisterController {
  constructor() {
    this._redirectTo = 'home'
  }
  
  async create({ view }) {
    return view.render('auth.register')
  }

  async store({ request, response, session, auth }) {
    try {
      const user = await User.create(
        request.only(['username', 'email', 'password'])
      )
      
      await auth.login(user)
      return response.route(this._redirectTo)
    }
    catch(error) {
      session.flash({ flash_error: 'Something went wrong.' })
      return response.redirect('back')
    }
  }
}

module.exports = RegisterController