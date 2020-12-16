FROM alpine
RUN apk add --update redis
CMD ["redis-server","--appendonly yes","--protected-mode no"]