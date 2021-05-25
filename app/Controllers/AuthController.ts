import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/RegisterValidator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const validateData = await request.validate(RegisterValidator)

    const user = await User.create(validateData)

    const token = await auth.login(user)

    return token
  }

  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      return 'Incorrect credentials'
    }
  }
}
