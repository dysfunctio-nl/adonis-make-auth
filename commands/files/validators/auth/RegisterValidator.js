'use strict'

class RegisterValidator {

  get rules () {
    return {
      username: 'required|min:4|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required|min:6',
      password_confirmation: 'same:password'
    }
  }

  get sanitizationRules() {
    return {
      username: 'strip_tags',
      email: 'normalize_email'
    }
  }

  get messages () {
    return {
      'username.required': 'Must provide a username',
      'username.min': 'Username must be at least 4 characteres',
      'username.unique': 'There\'s already an account with this username',

      'email.required': 'Must provide an email address',
      'email.email': 'Email address is not valid',
      'email.unique': 'There\'s already an account with this email address',

      'password.required': 'Must provide a password',
      'password.min': 'Password must be at least 6 characters',

      'password_confirmation.same': 'Passwords must match'
    }
  }

}

module.exports = RegisterValidator