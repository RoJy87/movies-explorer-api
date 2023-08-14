require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const customErrors = require('./middlewares/errors/customErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const limiter = require('./middlewares/limiter');
const { MONGODB_URL, PORT, corsOptions } = require('./constants/constants');

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(cors(corsOptions));

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(customErrors);

app.listen(PORT);
