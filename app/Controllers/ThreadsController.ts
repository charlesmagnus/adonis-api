import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateThreadValidator from 'App/Validators/CreateThreadValidator'
import UpdateThreadValidator from 'App/Validators/UpdateThreadValidator'
import Thread from 'App/Models/Thread'

export default class ThreadsController {
  public async store({ request, auth }: HttpContextContract) {
    const validateData = await request.validate(CreateThreadValidator)

    const thread = await auth.user?.related('threads').create(validateData)

    await thread?.preload('user')
    await thread?.preload('category')

    return thread
  }

  public async show({ params }: HttpContextContract) {
    // const thread = await Thread.findOrFail(params.id)
    const thread = await Thread.query()
      .where('id', params.id)
      .preload('user')
      .preload('category')
      .firstOrFail()
    return thread
  }

  public async index() {
    // const threads = await Thread.all()
    const threads = await Thread.query().preload('user').preload('category').finally()
    return threads
  }

  public async update({ request, params }: HttpContextContract) {
    const thread = await Thread.findOrFail(params.id)
    const validateData = await request.validate(UpdateThreadValidator)

    thread.merge(validateData)

    await thread.save()
    await thread.preload('user')
    await thread.preload('category')

    return thread
  }
}
