require('dotenv').config();

const { swaggerDocs } = require('./docs/swagger');

const app = require('./server');

require('./database/db');

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
    swaggerDocs(app, app.get('port'))
});