'use strict'

const { Command } = require('@adonisjs/ace')
const path = require('path')
const Helpers = use('Adonis/Src/Helpers')
const _ = use('lodash')

class SetupMigrations extends Command {
  /**
   * The command signature getter to define the
   * command name, arguments and options.
   *
   * @attribute signature
   * @static
   *
   * @return {String}
   */
  static get signature () {
    return 'make:auth'
  }

  /**
   * The command description getter.
   *
   * @attribute description
   * @static
   *
   * @return {String}
   */
  get description () {
    return 'Make auth boilerplate for Adonis'
  }

  /**
   * Generates the blueprint for a given resources
   * using pre-defined template
   *
   * @method generateBlueprint
   *
   * @param  {String}         name
   *
   * @return {void}
   */
  async generateBlueprint (name) {
    const templateFile = path.join(__dirname, './stubs', `${name}.js`)
    const fileName = `${new Date().getTime()}_${name}`
    const filePath = Helpers.migrationsPath(`${fileName}.js`)

    const templateContents = await this.readFile(templateFile, 'utf-8')
    await this.generateFile(filePath, templateContents)

    const createdFile = filePath.replace(Helpers.appRoot(), '').replace(path.sep, '')
    await this.logSuccess('create', createdFile)
  }

  async logSuccess(action, message) {
    console.log(`${this.icon('success')} ${this.chalk.green(action)} ${message}`)
  }

  /**
   * The handle method to be executed
   * when running command
   *
   * @method handle
   *
   * @param  {Object} args
   * @param  {Object} options
   *
   * @return {void}
   */
  async handle () {
    try {
      await this.generateBlueprint('create_password_resets_table')
    } catch ({ message }) {
      this.error(message)
    }

    const controllersDir = path.join(Helpers.appRoot(), 'app/Controllers/Http')
    const validatorsDir = path.join(Helpers.appRoot(), 'app/Validators')
    const viewsDir = path.join(Helpers.appRoot(), 'resources/views')

    await this.ensureDir(controllersDir)
    await this.ensureDir(validatorsDir)
    await this.ensureDir(viewsDir)
    
    await this.copy(path.join(__dirname, './files/controllers'), controllersDir)
    await this.logSuccess('created', 'Controllers')

    await this.copy(path.join(__dirname, './files/validators'), validatorsDir)
    await this.logSuccess('copied', 'Validators')

    await this.copy(path.join(__dirname, './files/views'), viewsDir)
    await this.logSuccess('copied', 'Views')
  }
}

module.exports = SetupMigrations