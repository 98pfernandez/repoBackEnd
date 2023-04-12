function publicAccess(req, res, next) {
    if (req.session.user) return res.redirect('/')
  
    next()
  }

function privateAccess(req, res, next) {
    if (!req.session.user) return res.redirect('/login')

    next()
  }

  export {publicAccess,privateAccess}