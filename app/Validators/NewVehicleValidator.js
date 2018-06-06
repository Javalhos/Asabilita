'use strict'

class NewVehicleValidator {
  get rules () {
    return {
      brand: 'required',
      model: 'required',
      license_plate: 'required|regex:^[A-Z]{3}[0-9]{4}$',
      year: 'required|dateFormat:YYYY',
      category: 'required|in:SMALL,HATCH,SEDAN,SUV,LUXURY,SPORTING',
      status: 'required|in:AVAILABLE,RENTED,MAINTENANCE,FOR_SALE,SOLD,UNAVAILABLE',
      mileage: 'required|number',
      price: 'required|number'
    };
  }

  get validateAll() {
    return true;
  }

  get messages() {
    return {
      'required': 'Campo obrigatório.',
      'license_plate.regex': 'Insira uma placa com 3 letras e 4 números, nessa ordem.',
      'number': 'Insira apenas números.',
      'date_format': 'Insira uma data no formato {{ argument.0 }}.',
      'in': 'Valor inválido.'
    };
  }

  async fails (errorMessages) {
    return this.ctx.response.badRequest({ errors: errorMessages });
  }
}

module.exports = NewVehicleValidator
