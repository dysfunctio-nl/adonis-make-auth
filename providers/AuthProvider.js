'use strict'

const { ServiceProvider } = use('@adonisjs/fold')

class AuthProvider extends ServiceProvider {
  _registerAlias () {
    this.app.singleton('Auth/TokenBearer', () => new (require('../src/TokenBroker'))())
    this.app.bind('Auth/Routes', () => require('../src/Routes'))
  }

  _registerCommand() {
    this.app.bind('Auth/Commands/Make', () => require('../commands/MakeAuth'))

    const ace = require('@adonisjs/ace')
    ace.addCommand('Auth/Commands/Make')
  }

  boot () {
    this._registerAlias()
    this._registerCommand()
  }
}

module.exports = AuthProvider