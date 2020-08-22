export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "sa-east-1",
    BUCKET: "serverless-notes-tuto"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://mvi2ys3hx9.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_cAjXLKmQu",
    APP_CLIENT_ID: "2lgnck3jamhc1dkp6q8a95ndf",
    IDENTITY_POOL_ID: "us-east-2:060e8b3a-0548-4859-adac-225f64509a07"
  }
};