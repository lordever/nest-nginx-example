### Nest + Nginx example

## Installation

```bash
$ npm install
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Here I have some examples with **nest** + **nginx**. Here the list of these examples (you can find all config files in [nginx_configs folder](nginx_configs)):

1. Proxying nest application which starts on http://localhost:3000 -> http://localhost:80. For starting this example you have to make next steps:
   1. ```npm run start``` from repository root folder 
   2. ```sudo service nginx start```
   3. As result, you can open http://localhost:80 instead of http://localhost:3000, and you will see 'Hello world' on the page
2. **Load Balancer**

   This example demonstrates how to set up a load balancer using Nginx to distribute incoming traffic among multiple instances of your Nest.js application.

   To run the Load Balancer example, follow these steps:

   1. Make sure you have three instances of your Nest.js application running on different ports (e.g., 3000, 3001, 3002). You can start these instances using the following commands in separate terminal windows:

      ```bash
      npm run start -- --port 3000
      npm run start -- --port 3001
      npm run start -- --port 3002
      ```

   2. Configure the Load Balancer:

      Open your Nginx configuration file located at `/etc/nginx/nginx.conf` and add the following configuration inside the `http` block:

      ```nginx
      events {
          worker_connections 1024;  # Adjust this value as needed
      }

      http {
          server_names_hash_bucket_size 64;

          upstream nest_load_balancer.local {
              server 127.0.0.1:3000;  # Address of your first Nest.js instance
              server 127.0.0.1:3001;  # Address of your second Nest.js instance
              server 127.0.0.1:3002;  # Address of your third Nest.js instance
          }

          server {
              listen 80;
              server_name nest-nginx.sample.local;

              location / {
                  proxy_pass http://nest_load_balancer.local;
                  proxy_set_header Host $host;
                  proxy_set_header X-Real-IP $remote_addr;
                  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                  proxy_set_header X-Forwarded-Proto $scheme;
              }
          }
      }
      ```

      Save the configuration file.

   3. Start Nginx and override its configuration:

      ```bash
      sudo service nginx start
      ```

   4. Access the load-balanced Nest.js application:

      Open your web browser and navigate to `http://nest-nginx.sample.local`. The load balancer will evenly distribute incoming requests among the three running instances. You should see the familiar 'Hello world' message on the page.

   **Note:** You can use any domain instead of `http://nest-nginx.sample.local`. I've added this url inside my **hosts** file like that: ```127.0.0.1    nest-nginx.sample.local```




