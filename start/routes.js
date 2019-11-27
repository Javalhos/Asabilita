'use strict'

const Route = use('Route')

// Rotas de Autenticação (AuthController)
Route.group(() => {
  // Auth Routes
  Route.get('/auth', 'AuthController.show')
  Route.delete('/auth/:id', 'AuthController.destroy')
  Route.post('/auth/signup', 'AuthController.signup').validator('SignupValidator')
  Route.post('/auth/signin', 'AuthController.signin').validator('LoginValidator')
  Route.post('/auth/refresh', 'AuthController.refresh')

  // User Routes
  Route.get('/user/load', 'UserController.load').middleware(['auth'])

  // Rental Routes
  Route.get('/available', 'RentalController.available')
  Route.get('/rentals', 'RentalController.index').middleware(['auth'])
  Route.get('/rental/code/:code', 'RentalController.showByCode').middleware(['auth'])
  Route.post('/rental/confirm/:code', 'RentalController.confirmRental').middleware(['auth'])
  Route.post('/reserve', 'RentalController.store').middleware(['auth'])

  // Vehicle Routes
  Route.get('/vehicle/available', 'VehicleController.available')
  Route.get('/vehicle/stats', 'VehicleController.stats')
  Route.get('/vehicle/find/:model', 'VehicleController.find')
  Route.get('/vehicle', 'VehicleController.index')
  Route.get('/vehicle/:id', 'VehicleController.show')
  Route.post('/vehicle', 'VehicleController.store').validator('NewVehicleValidator')
  Route.delete('/vehicle/:id', 'VehicleController.destroy')

  // Ally (Social Media Login/Register) Routes
  // Route.get('/ally/register/:provider', 'SocialAuthController.redirect')
  // Route.get('/ally/authenticated/facebook', 'SocialAuthController.facebook')

  Route.any('*', ({
    response
  }) => response.status(404).send({
    message: 'Not found'
  }))
}).prefix('/api/v1')

// Static Route
Route.any('*', ({
  view
}) => view.render('welcome'))
