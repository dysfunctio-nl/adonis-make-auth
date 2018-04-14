# Adonis MakeAuth

Similar to Laravel's make:auth, creates boilerplate for AdonisJs' auth system

## Contents
- [Main Features](#main-features)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Custom routes](#custom-routes)
- [Changing the redirect page](#changing-the-redirect-page)

## Main Features

* Basic views for login, register and password recovery
* Controllers for login, register and password recovery
* Validators for all forms
* Migration for password recovery

## Dependencies

This module has dependencies on `@adonisjs/mail` and `@adonisjs/validator`.

## Setup

Install make:auth
```bash
adonis install @dysfunctionl/adonis-make-auth
```

Register the provider inside `start/app.js` file
```js
const providers = [
  '@dysfunctionl/adonis-make-auth/providers/AuthProvider'
]
```

Run the command to push the views, controllers, validators and migrations
```bash
adonis make:auth
```

Setup your database connection and run the migration command
```bash
adonis migration:run
```

Your `start/routes.js` file should look something like the following:
```js
const Route = use('Route')
const AuthRoutes = use('Auth/Routes')

AuthRoutes()

Route.on('/').render('welcome').as('home')
```

Start the server
```bash
adonis serve --dev
```

---

## Custom routes

In order to change the routes, remove the original routes you included from above and replace with something similar to the following:

```js
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
```

## Changing the redirect page

In each controller there is a redirectTo property, this defaults to the route 'home', change this as needed!