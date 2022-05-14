const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDefs = require('./swaggerDefs');

const router = Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDefs));

module.exports = router;
