'use strict'

const Vehicle = use('App/Models/Vehicle');
const Rental = use('App/Models/Rental');

class RentalController {
  async store({
    auth,
    response,
    params
  }) {
    console.log('HERE');
    const user = auth.current.user;
    let vehicle;
    console.log('THERE');
    try {
      vehicle = await Vehicle.find(params.id);
    } catch (e) {
      console.log(e);
    }

    if (!vehicle)
      return response.status(404).send({
        message: 'Vehicle not Found!'
      });

    let newCode = `${user.id}-${vehicle.id}-${(new Date).getTime()}`;
    console.log('ALMOST THERE');
    let rental = await Rental.create({
      user_id: user.id,
      vehicle_id: vehicle.id,
      final_price: vehicle.price,
      code: newCode,
      status: 'NOT_CONFIRMED'
    });


    if (rental) {
      vehicle.status = 'RENTED';
      vehicle.save();
      return response.status(201).send({
        code: newCode
      });
    }
    return response.status(500).send({
      message: 'Failed to add rental registry'
    });
  }
}

module.exports = RentalController
