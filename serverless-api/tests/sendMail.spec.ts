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

describe('sendMail main function', () => {
  test('Should return 400 if no email is provided', () => {
    const callbackSpy = jest.spyOn(Stubs, 'callbackStub')
    sendMail.main(requestWithoutEmail, {}, Stubs.callbackStub)
    expect(callbackSpy).toHaveBeenCalledWith(null, expect.objectContaining({
      statusCode: 400
    }))
  })
  test('Should return 400 if no name is provided', () => {
    const callbackSpy = jest.spyOn(Stubs, 'callbackStub')
    sendMail.main(requestWithoutName, {}, Stubs.callbackStub)
    expect(callbackSpy).toHaveBeenCalledWith(null, expect.objectContaining({
      statusCode: 400
    }))
  })
})
