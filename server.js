const http = require('http');
const app = require('./app');
const morgan = require('morgan');
const port = process.env.PORT || 4000;

// Just for logging in development
app.use(morgan('dev'));

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});