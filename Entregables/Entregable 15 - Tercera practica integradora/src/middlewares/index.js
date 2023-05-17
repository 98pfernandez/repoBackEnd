import passport from 'passport'

function publicAccess(req, res, next) {
    if (req.user) return res.redirect('/')
  
    next()
  }

  function privateAccess(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.redirect('/login')
      }
  
      req.user = user.user;
      next();
    })(req, res, next);
  }

  export {publicAccess,privateAccess}