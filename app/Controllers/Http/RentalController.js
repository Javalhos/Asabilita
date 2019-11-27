'use strict'

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

  async store ({ request, response, auth }) {
    console.log('Entrou')
    const { start, end, finalPrice, vId } = await request.only([
      'start',
      'end',
      'finalPrice',
      'vId'
    ])

    const user = auth.current.user

    if (!user)
      return response.status(500).send({ error: 'You must be logged' })

    let vehicle
    
    try {
      vehicle = await Vehicle.find(vId)
    } catch (e) {
      console.log(e)
    }

    if (!vehicle)
      return response.status(404).send({ message: 'Vehicle not Found!' })

    let newCode = `${user.id}-${vehicle.id}-${(new Date).getTime()}`

    let rental = await Rental.create({
      user_id: user.id,
      vehicle_id: vehicle.id,
      final_price: finalPrice,
      code: newCode,
      reserved: true,
      status: 'NOT_CONFIRMED',
      start,
      end
    })

    if (rental) {
      vehicle.status = 'RESERVED'
      await vehicle.save()

      return response.status(201).send({ code: newCode })
    }

    return response.status(500).send({ message: 'Failed to add rental registry' })
  }

  async showByCode ({ params, response }) {
    try {
      const rental = await Rental.query()
      .with('vehicle')
      .where('code', params.code)
      .where('status', 'NOT_CONFIRMED')
      .first()
      return response.send(rental)
    } catch (e) {
      console.log(e)
    }
    
  }

  async confirmRental ({ params, response }) {
    const rental = await Rental.findBy('code', params.code)

    rental.status = 'CONFIRMED'
    await rental.save()

    return response.send(rental)
  }
}

module.exports = RentalController
