'use strict'

module.exports = () => {
  const Route = use('Route')

  Route.group(() => {
    // Authentication Routes...
    Route.get('/login', 'LoginController.showLoginForm').as('login')
    Route.post('/login', 'LoginController.login').validator('auth/LoginValidator')
    Route.get('/logout', 'LoginController.logout').as('logout')

    // Registration Routes...
    Route.get('/register', 'RegisterController.create').as('register')
    Route.post('/register', 'RegisterController.store').validator('auth/RegisterValidator')

    // Password Reset Routes...
    Route.get('/password/reset', 'ForgotPasswordController.showLinkRequestForm').as('password.request')
    Route.post('/password/email', 'ForgotPasswordController.sendResetLinkEmail').as('password.email').validator('auth/ForgotPasswordValidator')

    Route.post('/password/reset', 'ResetPasswordController.reset').as('password.reset').validator('auth/ResetPasswordValidator')
    Route.get('/password/reset/:token', 'ResetPasswordController.showResetForm').as('password.reset')
  }).namespace('Auth')
}