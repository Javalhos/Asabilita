'use strict'

const Model = use('Model')

class Vehicle extends Model {
  rentals() {
    return this.hasMany('App/Models/Rental');
  }
}

module.exports = Vehicle
