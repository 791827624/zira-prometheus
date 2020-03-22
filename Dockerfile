FROM nginx:latest
MAINTAINER 791827624@qq.com

COPY package.json  /tmp/
RUN cd /tmp && yarn install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

COPY ./ /app/
RUN yarn install && yarn build

FROM nginx:1.15
COPY --from=build-stage /app/dist/ /app/dist
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /app/dist
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]