import transporter from './config/nodemailer-config'
import AWS from 'aws-sdk'
import * as uuid from 'uuid'

AWS.config.update({ region: 'us-east-2' })
const dynamoDb = new AWS.DynamoDB.DocumentClient()

export function main ({ body }, context, callback) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  }

  if (!body) {
    callback(null, {
      statusCode: 400,
      headers: headers,
      body: 'Missing body'
    })
    return
  }

  const data = JSON.parse(body)

  for (const value of ['name', 'email', 'minion', 'quantity']) {
    if (!data[value]) {
      callback(null, {
        statusCode: 400,
        headers: headers,
        body: `Missing param: ${value}`
      })
      return
    }
  }

  const { name, email, minion, quantity } = data

  transporter.sendMail({
    from: 'Rafael de Carvalho <rafaeldecarvalho.ps@gmail.com>',
    to: email,
    cc: 'thiago@bgcbrasil.com.br',
    subject: 'Reserva do seu Minion realizada',
    text: 'Reserva do seu Minion realizada com sucesso',
    html: `
    Olá <b>${name}</b>, A reserva do seu Minion foi realizada com sucesso.
    `
  }).then(message => {
    // E-Mail Logger
    const params = {
      TableName: process.env.tableName,
      Item: {
        logId: uuid.v1(),
        name,
        email,
        minion,
        quantity,
        createdAt: Date.now()
      }
    }

    dynamoDb.put(params, (error, data) => {
      if (error) {
        const response = {
          statusCode: 500,
          headers: headers,
          body: JSON.stringify({ error: 'DB Error' })
        }
        callback(null, response)
        return
      };

      callback(null, {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(params.Item)
      })
    })
  }).catch(err => {
    callback(null, {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: err })
    })
  })
}
