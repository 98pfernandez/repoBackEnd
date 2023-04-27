import  Router  from 'express';
import passport from 'passport';

const router = Router()

router.post(
  '/',
  passport.authenticate('register', { failureRedirect: '/users/failRegister', failureFlash:true }),
  async (req, res) => {
    try {
      res.json({ message: 'Usuario registrado' });
    } catch (error) {
      console.log(error);
      if (error.code === 11000)
        return res.status(400).json({ error: 'El usuario ya existe' });
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  })

router.get('/failRegister', async (req, res) => {
  res.json({ error: req.flash('error') });
});


export { router as userController };