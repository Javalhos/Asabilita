'use strict'

const Schema = use('Schema')

class AdditionalConductorSchema extends Schema {
  up () {
    this.create('additional_conductors', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('full_name', 100).notNullable()
      table.string('cpf', 15).notNullable()
      table.string('cnh', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('additional_conductors')
  }
}

module.exports = AdditionalConductorSchema
