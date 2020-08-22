import { transporter } from "./config/nodemailer-config";
import AWS from "aws-sdk";
import * as uuid from "uuid";

AWS.config.update({ region: "us-east-2" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
  const { name, email, minion, quantity } = JSON.parse(event.body);

  for (const value of [name, email, minion, quantity]) {
    if (!value) {
      callback(null, {
        statusCode: 400,
        body: `Missing param error`
      });
      return;
    }
  }

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
  };

  dynamoDb.put(params, (error, data) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ error: error })
      };
      callback(null, response);
      return;
    };
  });

  transporter.sendMail({
    from: "Rafael de Carvalho <rafaeldecarvalho.ps@gmail.com>",
    to: email,
    subject: "Reserva do seu Minion realizada",
    text: "Teste",
    html: "<b>TESTE</b>"
  }).then(message => {
    callback(null, {
      statusCode: 200,
      body: message
    });
  }).catch(err => {
    callback(null, {
      statusCode: 500,
      body: err
    });
  });
}