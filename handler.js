"use strict";
const AWS = require("aws-sdk");

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event
    })
  };
  const s3 = new AWS.S3();
  const params = {
    Bucket: "syon-fontcache",
    Key: "example2.txt",
    Body: "Uploaded text using the promise-based method!"
  };
  s3
    .putObject(params)
    .promise()
    .then(data => {
      console.log("Success");
      callback(null, response);
    })
    .catch(err => {
      console.log(err);
      callback(null, response);
    });
};
