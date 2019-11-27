'use strict'

import moment from 'moment'

const Vehicle = use('App/Models/Vehicle')

const Rental = use('App/Models/Rental')

class RentalController {
  async index () {
    let rentals = await Rental.all()

    return rentals
  }

  async show ({ response, params, auth }) {
    const user = auth.current.user

    if (!user)
      return response.status(500).send({ error: 'You must be logged' })
      
    let rental = await Rental.find(params.id)

    if (!rental)
      return response.status(500).send({ error: 'The rental does not exist' })
      
    return rental
  }

  async reserve ({ request, response, params, auth }) {
    const { start, end, details } = request.only([
      'start',
      'end',
      'details'
    ])

    const user = auth.current.user
    let vehicle
    
    try {
      vehicle = await Vehicle.find(params.id)
    } catch (e) {
      console.log(e)
    }

    if (!vehicle)
      return response.status(404).send({ message: 'Vehicle not Found!' })

    let finalPrice = vehicle.price * this.calcDuration(start, end)

    let newCode = `${user.id}-${vehicle.id}-${(new Date).getTime()}`

    let rental = await Rental.create({
      user_id: user.id,
      vehicle_id: vehicle.id,
      final_price: finalPrice,
      code: newCode,
      reserved: true,
      status: 'NOT_CONFIRMED',
      details
    })

    if (rental) {
      vehicle.status = 'RESERVED'
      vehicle.save()

      return response.status(201).send({ code: newCode })
    }

    return response.status(500).send({ message: 'Failed to add rental registry' })
  }

  calcDuration (start, end) {
    const startDate = moment(start)
    const endDate = moment(end)

    return startDate.diff(endDate, 'days')
  }
}

module.exports = RentalController
