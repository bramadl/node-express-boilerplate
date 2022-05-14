const { author, version } = require('../../package.json');
const { port } = require('../config/env');

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Node Boilerplate API',
    description:
      'The public endpoints that are exposed within this boilerplate where you can test and make an experiment with. You can make an adjustment, scale it up, or make changes via the swagger.json file in the root directory of the project.',
    contact: {
      name: author,
      url: 'https://github.com/bram-adl',
      email: 'thenamesbram@gmail.com',
    },
    version,
  },
  servers: [
    {
      url: `http://localhost:${port}/api`,
      description: 'Local BaseURL Endpoint.',
    },
    {
      url: 'http://api.yoursite-example.com/api',
      description: 'For example you host your website at.',
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    '/auth/login': {
      post: {
        tags: ['Authentication Service'],
        security: [],
        summary: 'Login the user.',
        description: 'Sign in the user using email and password strategy.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    description: "The user's email.",
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: "The user's plain password.",
                  },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                        token: {
                          $ref: '#/components/schemas/Token',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/BadRequest',
          },
          403: {
            $ref: '#/components/responses/Forbidden',
          },
        },
      },
    },
    '/auth/register': {
      post: {
        tags: ['Authentication Service'],
        security: [],
        summary: 'Register the user',
        description: 'Sign up the user using email and password strategy.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  first_name: {
                    type: 'string',
                    description: "The user's first name.",
                  },
                  last_name: {
                    type: 'string',
                    description: "The user's last name.",
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: "The user's email.",
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description: "The user's plain password.",
                  },
                },
                required: ['last_name', 'email', 'password'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'CREATED.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                        token: {
                          $ref: '#/components/schemas/Token',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/BadRequest',
          },
          403: {
            $ref: '#/components/responses/Forbidden',
          },
        },
      },
    },
    '/users': {
      get: {
        tags: ['User Management'],
        summary: 'Get all users data.',
        description:
          'Retrieve all the users data from database with pagination strategy',
        parameters: [
          {
            in: 'query',
            name: 'search',
            required: false,
            description:
              'What to search within the data? Supported to search **first_name**, **last_name**, **email**, and **phone_number** currently.',
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'per_page',
            required: false,
            description:
              'How many items should be displayed per page? Minimum of **5** and maximum of **20** is supported.',
            schema: {
              type: 'integer',
              format: 'int64',
              minimum: 5,
              maximum: 20,
              default: 10,
            },
          },
          {
            in: 'query',
            name: 'current_page',
            required: false,
            description:
              'What page should be sent? Minimum of **1** supported.',
            schema: {
              type: 'integer',
              format: 'int64',
              minimum: 1,
              default: 1,
            },
          },
        ],
        responses: {
          200: {
            description: 'OK.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        users: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/User',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
      post: {
        tags: ['User Management'],
        summary: 'Create a new user data.',
        description:
          'Create a new user data to database with the given request body',
        requestBody: {
          $ref: '#/components/requestBodies/UserBody',
        },
        responses: {
          201: {
            description: 'Created.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/BadRequest',
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
          403: {
            $ref: '#/components/responses/Forbidden',
          },
          409: {
            $ref: '#/components/responses/Conflict',
          },
        },
      },
    },
    '/users/{id}': {
      parameters: [
        {
          $ref: '#/components/parameters/UserId',
        },
      ],
      get: {
        tags: ['User Management'],
        summary: 'Get the user data by the given ID.',
        description: 'Retrieve a user data from database with the given id',
        responses: {
          200: {
            description: 'OK.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
          404: {
            $ref: '#/components/responses/NotFound',
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
      patch: {
        tags: ['User Management'],
        summary: 'Update the user data by the given ID.',
        description:
          'Update the user data from database with the given id and request body',
        requestBody: {
          $ref: '#/components/requestBodies/UserBody',
        },
        responses: {
          200: {
            description: 'OK.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/BadRequest',
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
          403: {
            $ref: '#/components/responses/Forbidden',
          },
          409: {
            $ref: '#/components/responses/Conflict',
          },
        },
      },
      delete: {
        tags: ['User Management'],
        summary: 'Delete the user data by the given ID.',
        description: 'Delete a user data from database with the given id',
        responses: {
          204: {
            $ref: '#/components/responses/NoContent',
          },
          400: {
            $ref: '#/components/responses/BadRequest',
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
          403: {
            $ref: '#/components/responses/Forbidden',
          },
        },
      },
    },
  },
  components: {
    parameters: {
      UserId: {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'integer',
        },
        description: 'The user ID',
      },
    },
    responses: {
      NoContent: {
        description: 'No Content.',
      },
      BadRequest: {
        description: 'Bad Request.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'integer',
                  example: 400,
                },
                message: {
                  type: 'string',
                },
                stack: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      Unauthorized: {
        description: 'Unauthorized.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'integer',
                  example: 401,
                },
                message: {
                  type: 'string',
                },
                stack: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      Forbidden: {
        description: 'Forbidden Access.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'integer',
                  example: 403,
                },
                message: {
                  type: 'string',
                },
                stack: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      NotFound: {
        description: 'Not Found.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'integer',
                  example: 404,
                },
                message: {
                  type: 'string',
                },
                stack: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      Conflict: {
        description: 'Conflict.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'integer',
                  example: 409,
                },
                message: {
                  type: 'string',
                },
                stack: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    requestBodies: {
      UserBody: {
        description: 'The user body payload.',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                first_name: {
                  type: 'string',
                },
                last_name: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                  format: 'email',
                },
                phone: {
                  type: 'string',
                  example: '081234567890',
                },
              },
              required: ['last_name', 'email'],
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        description:
          'Valid JSON Web Token Value. **Fill in only the token value** with no prefix. Make sure the token is not expired, invalid, or can not be parsed correctly.',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Token: {
        type: 'object',
        properties: {
          expiredIn: {
            type: 'number',
            format: 'unix',
            example: 1652607458,
          },
          token: {
            type: 'string',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsImlhdCI6MTY1MjUyMDk5MiwiZXhwIjoxNjUyNjA3MzkyLCJyb2xlIjoiT3duZXIifQ.C7ybjnsGIuaO7WpTS-nEp2ATv2xrYfmJXPzSi1ug8Y0',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          first_name: {
            type: 'string',
          },
          last_name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          role: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
              name: {
                type: 'string',
              },
            },
          },
        },
        required: ['id', 'last_name', 'email', 'role'],
      },
    },
  },
};
