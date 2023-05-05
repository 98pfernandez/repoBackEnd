import Router from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.utils.js";

const router = Router();

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

export { router as authController };
