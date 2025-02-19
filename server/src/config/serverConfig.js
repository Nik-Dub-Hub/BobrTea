const express = require("express");
const removeHTTPHeader = require("../middleware/removeHeader");
const morgan = require("morgan");
const path = require("path");



const serverConfig = (app) => {
  app.use("/static", express.static(path.resolve(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());
  app.use(removeHTTPHeader); 
  app.use(morgan("dev"));
};

module.exports = serverConfig;
