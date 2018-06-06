'use strict'

const Vehicle = use('App/Models/Vehicle');

class VehicleController {
  async show () {
    let vehicles = await Vehicle.all();

    return {
      data: vehicles
    };
  }

  async store ({ request, response }) {
    let vehicle = Vehicle.create(request.only([
      'license_plate', 'brand', 'model',
      'status', 'year', 'mileage', 'price'
    ]));

    // Return status 201 (Created)
    return response.status(201).json({
      message: 'Vehicle created successfully',
      vehicle
    });
  }
}

module.exports = VehicleController
