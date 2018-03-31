"use strict";
const AWS = require("aws-sdk");
const shell = require("shelljs");
const fs = require("fs");
const dg = require("debug")("main");
const s3 = new AWS.S3();
const Bucket = "syon-fontcache";
const tmpCacheDir = "/tmp/cache/fontconfig";

module.exports.main = (event, context, callback) => {
  process.env.HOME = process.env.LAMBDA_TASK_ROOT;
  shell.mkdir("-p", tmpCacheDir);
  shell.exec("fc-list");
  shell.exec(`fc-cache -v ${process.env.HOME}/.fonts`);
  const promises = [];
  shell.ls(tmpCacheDir).forEach((Key, i) => {
    dg(`[${i}]`, `${tmpCacheDir}/${Key}`);
    fs.readFile(`${tmpCacheDir}/${Key}`, (err, Body) => {
      if (err) throw err;
      const params = { Bucket, Key, Body };
      promises.push(s3.putObject(params).promise());
    });
  });
  Promise.all(promises)
    .then(() => {
      callback(null, { statusCode: 200 });
    })
    .catch(err => {
      dg(err);
      callback(null, { statusCode: 500 });
    });
};
