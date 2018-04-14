'use strict'

const Database = use('Database')
const moment = use('moment')

class TokenBroker {
  async createToken(email, token) {
    return await Database.table('password_resets').insert({
      email,
      token
    })
  }

  async deletePrevousTokens(email) {
    return await Database.table('password_resets').where('email', email).delete()
  }

  async isValidToken(token, email) {
    const result = await Database.table('password_resets').where({email, token}).first()
    
    return (result) ? moment(result.created_at).isAfter(moment().subtract(24, 'hours')) : false
  }
}

module.exports = TokenBroker