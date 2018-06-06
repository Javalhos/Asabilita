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
        'MAINTENANCE',
        'FOR_SALE',
        'SOLD',
        'UNAVAILABLE'
      ]).defaultTo('AVAILABLE')
      table.string('year', 15).notNullable()
      table.integer('mileage').notNullable().defaultTo(0)
      table.float('price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vehicles')
  }
}

module.exports = VehicleSchema
