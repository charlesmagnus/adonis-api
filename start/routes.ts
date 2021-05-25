/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', () => 'Hello world')

  Route.post('/auth/register', 'AuthController.register')
  Route.post('/auth/login', 'AuthController.login')

  Route.post('/threads', 'ThreadsController.store').middleware('auth')
  Route.get('/threads/', 'ThreadsController.index')
  Route.get('/threads/:id', 'ThreadsController.show')
  Route.patch('/threads/:id', 'ThreadsController.show')
}).prefix('/api')
