module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cash-Control',
      version: '1.0.0',
      description: 'This is a API for web-service Cash-Control',
    },
    servers: [
      {
        url: 'http://localhost:7777',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};
