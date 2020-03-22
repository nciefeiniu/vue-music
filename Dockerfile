FROM node:10.16.2-buster-slim

ENV TZ=Asia/Shanghai
ENV PROJECT_DIR=/opt/vue_music
ENV ENV=prod
# 因为nuxt是编译的时候就会把API_URL加入代码，所以需要在Dockerfile中设置后端API地址(这个可以不在这里指定，可以在启动容器的时候，指定环境变量即可)
# ENV API_URL=http://192.168.100.224:5001

COPY ./ $PROJECT_DIR

RUN echo "Asia/Shanghai" > /etc/timezone && rm -f /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

COPY sources.list /etc/apt/sources.list

RUN apt update && apt install -y curl git

# 暴露3000端口
EXPOSE 3000

WORKDIR $PROJECT_DIR

RUN npm config set registry https://registry.npm.taobao.org && npm install && npm run build && npm install pm2@latest -g

# RUN pm2 start npm --name "green_finance" -- run start
RUN chmod 777 ./run.sh

ENTRYPOINT [ "./run.sh" ]