const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const UserRouter = require('./routes/UserRouter');

app.use(logger);
app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(logError);

app.use('/users', UserRouter);

app.get('/', (req, res) => res.status(200).render('signup'));
app.get('/dashboard', (req, res) => res.status(200).render('dashboard'));
app.get('/signin', (req, res) => res.status(200).render('signin'));
app.get('*', (req, res) => res.status(200).render('notFound'));




function logError(error, req, res, next) {

    if (error) {
        console.log("error");
        res.status(400).send('error');
    } else {
      next();
    }
}


function logger(req, res, next) {
    const ipAddr = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    console.log(ipAddr + ' ' + req.method + ''+ req.url);
    next();
}

// listener

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log('Listening on port '+ port +'..');
});