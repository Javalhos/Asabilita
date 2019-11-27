'use strict'

const Model = use('Model')

class Rental extends Model {
	vehicle () {
		return this.belongsTo('App/Models/Vehicle')
	}
}

module.exports = Rental
