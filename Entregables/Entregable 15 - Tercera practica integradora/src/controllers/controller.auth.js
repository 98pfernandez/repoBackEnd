import Router from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.utils.js";
import UserService from "../services/users.service.js";
const router = Router();
const userService=new UserService();

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
  res.render('restorePass.handlebars')
});

router.post("/sendMailRestore", async (req, res) => {
  const {email} = req.body;
  try {
    const user = await userService.findUserByEmail( email );
    res.json({ user });
  } catch (error) {
    
  }
});

export { router as authController };
