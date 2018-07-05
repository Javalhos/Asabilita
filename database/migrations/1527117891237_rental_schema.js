'use strict'

const Schema = use('Schema')

class RentalSchema extends Schema {
  up() {
    this.create('rentals', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.integer('vehicle_id').notNullable()
      table.float('final_price').notNullable()
      table.string('code', 50).notNullable()
      table.enum('status', [
        'CONFIRMED',
        'NOT_CONFIRMED',
        'CANCELED'
      ]).defaultTo('NOT_CONFIRMED').notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('rentals')
  }
}

module.exports = RentalSchema
