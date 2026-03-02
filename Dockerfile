# 基于 Nginx 镜像
FROM nginx

# 删除 Nginx 默认的配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 将自定义的 Nginx 配置文件添加到容器中
ADD default.conf /etc/nginx/conf.d/

# 将构建后的 Vue 应用的静态文件复制到 Nginx 的默认静态资源目录
COPY dist/  /usr/share/nginx/html/admin/

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]