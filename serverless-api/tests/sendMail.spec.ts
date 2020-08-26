import * as sendMail from '../sendMail'

const Stubs = {
  callbackStub () {
    return true
  }
}

const requestWithoutEmail = {
  body: '{"name":"Rafael", "minion":"kevin", "quantity":200}'
}

const requestWithoutName = {
  body: '{"email":"rafaeldecarvalho.ps@gmail.com", "minion":"kevin", "quantity":200}'
}

const requestWithoutMinion = {
  body: '{"name":"Rafael", "email":"rafaeldecarvalho.ps@gmail.com", "quantity":200}'
}

const requestWithoutQuantity = {
  body: '{"name":"Rafael", "email":"rafaeldecarvalho.ps@gmail.com", "minion":"kevin"}'
}

describe('sendMail main function', () => {
  test('Should calls callback with statusCode 400 if no email is provided', () => {
    const callbackSpy = jest.spyOn(Stubs, 'callbackStub')
    sendMail.main(requestWithoutEmail, {}, Stubs.callbackStub)
    expect(callbackSpy).toHaveBeenCalledWith(null, expect.objectContaining({
      statusCode: 400
    }))
  })
  test('Should calls callback with statusCode 400 if no name is provided', () => {
    const callbackSpy = jest.spyOn(Stubs, 'callbackStub')
    sendMail.main(requestWithoutName, {}, Stubs.callbackStub)
    expect(callbackSpy).toHaveBeenCalledWith(null, expect.objectContaining({
      statusCode: 400
    }))
  })
  test('Should calls callback with statusCode 400 if no minion is provided', () => {
    const callbackSpy = jest.spyOn(Stubs, 'callbackStub')
    sendMail.main(requestWithoutMinion, {}, Stubs.callbackStub)
    expect(callbackSpy).toHaveBeenCalledWith(null, expect.objectContaining({
      statusCode: 400
    }))
  })
  test('Should calls callback with statusCode 400 if no quantity is provided', () => {
    const callbackSpy = jest.spyOn(Stubs, 'callbackStub')
    sendMail.main(requestWithoutQuantity, {}, Stubs.callbackStub)
    expect(callbackSpy).toHaveBeenCalledWith(null, expect.objectContaining({
      statusCode: 400
    }))
  })
})
