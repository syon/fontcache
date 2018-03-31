# fontcache

AWS Lambda :: fc-cache -> S3

- [Lambdaの実行環境にフォントを追加する - Qiita](https://qiita.com/komeda-shinji/items/e049edd1389579059c53)


## requirements

### ndenv

- AWS Lambda supports Node.js __v6.10.3__
- [Lambda 実行環境と利用できるライブラリ - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/current-supported-versions.html)
- see `.node-version`

### serverless

Powered by Puppeteer Lambda Starter Kit

- [StarterKit.md](./StarterKit.md)

```bash
$ node -v
v6.10.3

$ npm i -g serverless

$ ndenv rehash
```
