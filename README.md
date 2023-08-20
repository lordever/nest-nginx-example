### Nest + Nginx example


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Here I have some examples with **nest** + **nginx**. Here the list of these examples (you can find all config files in [nginx_configs folder](nginx_configs)):

1. Proxying nest application which starts on http://localhost:3000 -> http://localhost:80. For starting this example you have to make next steps:
   1. ```npm run start``` from repository root folder 
   2. sudo service nginx start (override the configuration)
   3. As result, you can open http://localhost:80 instead of http://localhost:3000, and you will see 'Hello world' on the page

## Installation

```bash
$ npm install
```


