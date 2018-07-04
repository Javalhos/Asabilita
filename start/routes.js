'use strict'

const Route = use('Route')

// Rotas de Autenticação (AuthController)
Route.group(() => {
  // Auth Routes
  Route.post('/auth/signup', 'AuthController.signup').validator('SignupValidator');
  Route.post('/auth/signin', 'AuthController.signin').validator('LoginValidator');
  Route.post('/auth/refresh', 'AuthController.refresh');

  // User Routes
  Route.get('/user/load', 'UserController.load').middleware(['auth']);

  // Vehicle Routes
  Route.get('/vehicle/:id', 'VehicleController.show');
  Route.get('/vehicle', 'VehicleController.index');
  Route.post('/vehicle', 'VehicleController.store').validator('NewVehicleValidator');
  Route.get('/vehicle/stats', 'VehicleController.stats');
  Route.delete('/vehicle/:id', 'VehicleController.destroy');

  // Ally (Social Media Login/Register) Routes
  Route.get('/ally/register/:provider', 'SocialAuthController.redirect');
  Route.get('/ally/authenticated/facebook', 'SocialAuthController.facebook');

  Route.any('*', ({ response }) => response.status(404).send({ message: 'Not found' }));
}).prefix('/api/v1');

// Static Route
Route.any('*', ({ view }) => view.render('welcome'));
