'use strict'

class NewVehicleValidator {
  get rules () {
    return {
      brand: 'required',
      model: 'required',
      license_plate: 'required|regex:^[A-Z]{3}[0-9]{4}$',
      year: `required|regex:^[0-9]{4}|max:${(new Date).getFullYear()}`,
      category: 'required|in:SMALL,HATCH,SEDAN,SUV,LUXURY,SPORTING',
      status: 'required|in:AVAILABLE,RENTED,MAINTENANCE,FOR_SALE,SOLD,UNAVAILABLE',
      mileage: 'required|min:0',
      price: 'required|min:0',
      buy_date: 'required',
      buy_price: 'required',
      image: 'required'
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
