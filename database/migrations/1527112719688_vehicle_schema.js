'use strict'

const Schema = use('Schema')

class VehicleSchema extends Schema {
  up () {
    this.create('vehicles', (table) => {
      table.increments()
      table.string('license_plate').notNullable().unique()
      table.string('brand', 100).notNullable()
      table.string('model', 100).notNullable()
      table.enum('category', [
        'SMALL',
        'HATCH',
        'SEDAN',
        'SUV',
        'LUXURY',
        'SPORTING'
      ]).notNullable()
      table.enum('status', [
        'AVAILABLE',
        'RENTED',
        'RESERVED',
        'MAINTENANCE',
        'FOR_SALE',
        'SOLD',
        'UNAVAILABLE'
      ]).defaultTo('AVAILABLE')
      table.string('year', 5).notNullable()
      table.integer('mileage').notNullable().defaultTo(0)
      table.float('price').notNullable()
      table.float('buy_price').notNullable()
      table.date('buy_date').notNullable()
      table.float('sell_price').defaultTo(null)
      table.date('sell_date').defaultTo(null)
      table.text('image', 'longtext').defaultTo(null)
      table.timestamps()
    })
  }

  down () {
    this.drop('vehicles')
  }
}

module.exports = VehicleSchema
