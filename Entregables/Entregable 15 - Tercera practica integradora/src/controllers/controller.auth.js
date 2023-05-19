import Router from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.utils.js";
import UserService from "../services/users.service.js";
import  {transport}  from "../config/email.config.js";
const router = Router();
const userService=new UserService();
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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
    const fechaActualEnSegundos = Math.floor(Date.now() / 1000);
    const fechaExpiracionToken = decoded.exp;
    const diferenciaTiempoMiliSegundos =  (fechaExpiracionToken- fechaActualEnSegundos)*1000;

    res.cookie("passRestoreToekn", token, {maxAge: diferenciaTiempoMiliSegundos, httpOnly: true });
  } catch (error) {
    console.error('Error al desencriptar el JWT:', error);
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
    console.log(user.email);
    const tiempoExpiracion = '1h'; // Cambia esto según tus necesidades
    const token = jwt.sign({email:user.email}, claveSecreta, { expiresIn: tiempoExpiracion });
    const enlace = `localhost:${port}/auth/restorePass?token=${token}`;

    const result = await transport.sendMail({
      from: mail,
      to: user.email,
      subject: 'restore password',
      html:'<h1>'+enlace+'</h1>',
      attachments:[]
    })

    res.json({ result });
  } catch (error) {
    
  
  }
});

export { router as authController };
