FROM node:16.15.0 as build-stage
# WORKDIR /var/jenkins_home/workspace/deploy_iuj/frontend
# WORKDIR app/
# COPY file path
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
# nginx 이미지 = nginx:stable-alpine >> 만들어서 대체
# COPY --from=build-stage /var/jenkins_home/workspace/deploy_iuj/frontend/dist /usr/share/nginx/html
COPY --from=build-stage dist /usr/share/nginx/html
#COPY --from=build-stage /var/jenkins_home/workspace/deploy_iuj/frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g","daemon off;"]
