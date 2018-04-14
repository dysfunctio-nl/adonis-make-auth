'use strict'

class ResetPasswordValidator {

  get rules () {
    return {
      email: 'required|email',
      password: 'required|min:6',
      password_confirmation: 'same:password'
    }
  }

  get messages () {
    return {
      'email.required': 'Must provide an email address',
      'email.email': 'Email address is not valid',

      'password.required': 'Must provide a password',
      'password.min': 'Password must be at least 6 characters',

      'password_confirmation.same': 'Passwords must match'
    }
  }

}

module.exports = ResetPasswordValidator