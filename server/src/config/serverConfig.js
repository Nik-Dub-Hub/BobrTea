const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
};

const serverConfig = (app) => {
  app.use("/static", express.static(path.resolve(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());
};

module.exports = serverConfig;
