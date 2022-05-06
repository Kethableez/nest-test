export default () => ({
  server: {
    port: parseInt(process.env.PORT) || 3000,
    host: process.env.HOST || 'localhost',
    mode: process.env.NODE_ENV || 'development',
    docker: process.env.DOCKER || false,
  },
  mongo: {
    localUri: `mongodb://${process.env.MONGO_LOCAL_HOST}:${process.env.MONGO_LOCAL_PORT}/${process.env.MONGO_DATABASE}`,
    dockerUri: `mongodb://${process.env.MONGO_DOCKER_HOST}:${process.env.MONGO_DOCKER_PORT}/${process.env.MONGO_DATABASE}`,
  },
  security: {
    salt: parseInt(process.env.PASSWORD_SALT) || 10,
  },
});
