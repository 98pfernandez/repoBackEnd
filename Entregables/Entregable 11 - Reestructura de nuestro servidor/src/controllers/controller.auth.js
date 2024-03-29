import Router from 'express';
import passport from 'passport';

const router = Router()

router.post(
  '/',
  passport.authenticate('login', { failureRedirect: '/auth/failLogin', failureFlash: true }),
  async (req, res) => {
    try {
      if (!req.user)
        return res.status(400).json({ error: 'Credenciales invalidas' });

      //Si hay sesión le agregamos el user para identificar
      req.session.user = {
        name: req.user.name,
        email: req.user.email,
        role: req.user.email == 'adminCoder@coder.com' ? 'admin' : 'user'
      }

      res.status(201).json({ message: 'Sesión iniciada' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  })

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }));

router.get('/gitHubCallBack',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = {
      name: req.user.name,
      email: req.user.email,
      role: req.user.email == 'adminCoder@coder.com' ? 'admin' : 'user'
    }

    res.redirect('/')
  });

router.get('/failLogin', (req, res) => {
  res.json({ error: req.flash('error') });
});

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) return res.json({ error })

    res.redirect('/login')
  })
})

export { router as authController };