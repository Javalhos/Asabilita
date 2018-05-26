'use strict'

const Schema = use('Schema')

class AdditionalServicesSchema extends Schema {
  up () {
    this.create('additional_services', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.text('description')
      table.float('price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('additional_services')
  }
}

module.exports = AdditionalServicesSchema
