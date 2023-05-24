import Router from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.utils.js";
import UserService from "../services/users.service.js";
import  {transport}  from "../config/email.config.js";
const router = Router();
const userService=new UserService();
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { hashPassword } from "../utils/passwordEncryptor.js";

//Variables de entorno:
dotenv.config({ path: "../../.env" });


router.post(
  "/",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/auth/failLogin",
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      if (!req.user)
        return res.status(400).json({ error: "Credenciales invalidas" });

      const userToken = req.user
      const token = generateToken(userToken);
      res.cookie("authToken", token, { httpOnly: true }).status(201).json({ message: "Sesión iniciada" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/gitHubCallBack",
  passport.authenticate("github", { failureRedirect: "/login", session: false }),
  async (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = {
      name: req.user.name,
      email: req.user.email,
      role: req.user.email == "adminCoder@coder.com" ? "admin" : "user",
    };

    res.redirect("/");
  }
);

router.get("/failLogin", (req, res) => {
  res.json({ error: "login error" });
});

router.get("/logout", (req, res) => {
  res.clearCookie('authToken').redirect("/");
});

router.get("/restorePass", (req, res) => {
  const {token} =req.query;
  let validToken=false;
  const claveSecreta = process.env.JWT_SECRET;

  if(token){
    try{
    const decoded = jwt.verify(token, claveSecreta);
    validToken=true;
  } catch (error) {
    req.logger.info(error);
    validToken=false
  }

  }else{
    validToken=false
  }
  //No hay que mostrar los iconos de productos, cart etc..
  const condition=true;
  res.render('restorePass.handlebars', {condition,validToken})
});

router.post("/sendMailRestore", async (req, res) => {
  const {email} = req.body;
  try {
    const user = await userService.findUserByEmail( email );
    if (!user) res.json({user});

    const mail=process.env.MAILER_SERVICE;
    const claveSecreta = process.env.JWT_SECRET;
    const port = process.env.SERVER_PORT;
    const tiempoExpiracion = '5m';
    const token = jwt.sign({email:user.email}, claveSecreta, { expiresIn: tiempoExpiracion });
    const enlace = `http://localhost:${port}/auth/restorePass?token=${token}`;

    const result = await transport.sendMail({
      from: mail,
      to: user.email,
      subject: 'restore password',
      html:`
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click on the following link to proceed:</p>
      <p><a href="${enlace}">Reset Password</a></p>
      <p>If you did not request to reset your password, you can ignore this email.</p>`, 
      attachments:[]
    })

    res.json({ result });
  } catch (error) {
    req.logger.info(error)
  }
});

router.patch("/restorePass", async (req, res) => {
  try {
    
  const {token, pass} = req.body;
  const claveSecreta = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, claveSecreta);
  const email=decoded.email;
  console.log(email)

  const userInfo={
    pass:hashPassword(pass)
  }
  const result=await userService.updateUser(email, userInfo);
  res.json({ result });
  } catch (error) {
    console.log(error);
  }
});

export { router as authController };
