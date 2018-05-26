'use strict'

const Schema = use('Schema')

class RentalSchema extends Schema {
  up () {
    this.create('rentals', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.integer('vehicle_id').notNullable()
      table.integer('agreement_id').notNullable()
      table.float('final_price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('rentals')
  }
}

module.exports = RentalSchema
