'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

const r = s => `/api/v1${s}`;

// Rotas UserController
Route.group(() => {
  Route.post('/signup', 'UserController.store');
}).prefix(r('/users'));

// Rotas de Autenticação (AuthController)
Route.group(() => {
  Route.post('/signin', 'AuthController.signin');
  Route.get('/signout', 'AuthController.signout').middleware(['auth']);
}).prefix(r('/auth'));

// Static Route
Route.any('*', ({ view }) => view.render('welcome'));
