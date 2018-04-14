'use strict'

const Schema = use('Schema')

class PasswordResetsSchema extends Schema {
  up () {
    this.create('password_resets', (table) => {
      table.increments()
      table.string('email')
      table.string('token')
      table.timestamp('created_at').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('password_resets')
  }
}

module.exports = PasswordResetsSchema