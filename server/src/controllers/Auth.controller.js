const cookiesConfig = require("../config/cookiesConfig");
const formatResponse = require("../utils/formatResponse");
const AuthValidator = require("../utils/Auth.validator");
const UserService = require("../services/User.service");
const bcrypt = require("bcrypt");
const generateTokens = require("../utils/generateTokens");

class AuthController {
  static async refreshToken(req, res) {
    try {
      const { user } = req.locals;
      const { accessToken, refreshToken } = generateTokens({ user });
      res.status(200).cookie("refreshToken", refreshToken, cookiesConfig).json(
        formatResponse(200, "Successfully regenerate tokens", {
          user,
          accessToken,
        })
      );
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async signUp(req, res) {
    const { username, email, password ,isAdmin} = req.body;

    const { isValid, error } = AuthValidator.validateSignUp({
      username,
      password,
      email,
    });


    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const userFound = await UserService.getByEmail(normalizedEmail);

      if (userFound) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "User already exist",
              null,
              "User already exist"
            )
          );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserService.create({
        username,
        email: normalizedEmail,
        password: hashedPassword,
        isAdmin
      });

      if (!newUser) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "Failed to register user",
              null,
              "Failed to register user"
            )
          );
      }

      const plainUser = newUser.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      res
        .status(201)
        .cookie("refreshToken", refreshToken, cookiesConfig)
        .json(
          formatResponse(201, "Register successful", {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    

    const { isValid, error } = AuthValidator.validateSignIn({email,password})

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const user = await UserService.getByEmail(normalizedEmail);    
      
      if (!user) {
        return res
          .status(400)
          .json(formatResponse(400, "User not found", null, "User not found"));
      }

      const isPasswordValid = await bcrypt.compare(password,user.password);


      if (!isPasswordValid) {
        return res
          .status(400)
          .json(
            formatResponse(400, "Invalid password", null, "Invalid password")
          );
      }

      const plainUser = user.get({plain:true})
      delete plainUser.password

      const {accessToken,refreshToken} = generateTokens({user:plainUser})

      res.status(200).cookie('refreshToken',refreshToken,cookiesConfig).json(formatResponse(200,'Login successful',{user:plainUser,accessToken}))
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async signOut(req,res){
    try {
        res.clearCookie('refreshToken').json(formatResponse(200,'Logout successfully'))
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = AuthController
