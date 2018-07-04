'use strict'

const Vehicle = use('App/Models/Vehicle');

class VehicleController {
  async index () {
    let vehicles = await Vehicle.all();

    return {
      data: vehicles
    };
  }

  async show ({ params, response }) {
    let vehicle = await Vehicle.find(params.id);

    if (!vehicle) {
      return response.status(404).send({error: `Vehicle with Id ${params.id} doesn't exist in database.`});
    }
    return {
      data: vehicle
    }
  }

  async store ({ request, response }) {
    try {
      let vehicle = Vehicle.create(request.only([
        'license_plate', 'brand', 'model',
        'status', 'year', 'mileage', 'price',
        'category', 'buy_date', 'buy_price',
        'sell_date', 'sell_price', 'image'
      ]));

      // Return status 201 (Created)
      return response.status(201).json({
        message: 'Vehicle created successfully',
        vehicle
      });
    } catch (e) {
      console.log(e);
      return response.status(500).json({
        message: e.message
      });
    }
  }

  async stats () {
    let available = await Vehicle.query().whereIn('status', [
      'AVAILABLE', 'RENTED'
    ]);

    let forSale = await Vehicle.query().where('status', '=', 'FOR_SALE');

    return {
      available: available.length,
      forSale: forSale.length
    }

  }

  async destroy ({ params, response }) {
    let vehicle = await Vehicle.find(params.id);

    if (!vehicle)
      return response.badRequest({error: 'Invalid ID'});

    vehicle.delete();
    return {
      message: 'Vehicle deleted Successfully!'
    };
  }
}

module.exports = VehicleController
