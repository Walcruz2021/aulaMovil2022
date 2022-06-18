const express = require("express")
const router = express.Router();
const passport = require("passport")
const User=require("../database/models/users")
const bcrypt = require("bcryptjs");
const passportLocal = require("passport-local").Strategy;
require("../passport/local-auth")(passport)

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No User Exists");
//     else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(req.user);
//       });
//     }
//   })(req, res, next);
// });

// router.post("/register", (req, res) => {
//   User.findOne({ email: req.body.email }, async (err, doc) => {
//     if (err) throw err;
//     if (doc) res.send("User Already Exists");
//     if (!doc) {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);

//       const newUser = new User({
//         email: req.body.email,
//         password: hashedPassword,
//       });
//       await newUser.save();
//       res.send("User Created");
//     }
//   });
// });

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

router.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});


// //"local-signup es el metodo que cree"(carpeta passport)
// router.post("/login", passport.authenticate("local-signup", {
//     //una vez que se compara todo le decimos a donde es que se debe redirigir al user 
//     successRedirect: "/profile",
//     //en caso que se equivoque se lo redirige
//     failureRedirect: "/signup",
//     //se pasa todo los datos que recibe del cliente
//     passReqToCallback: true
// }))

// router.get("/signup", (req, res, next) => {
//     res.render("signup")
// })


// router.get("/signin", (req, res, next) => {
//     res.render('signin');
// })

// router.post('/signin', passport.authenticate('local-signin', {
//     successRedirect: '/profile',
//     failureRedirect: '/signin',
//     failureFlash: true
//   }));

// // sera accedido si un suusario se ha autenticado o no
// router.get("/profile", (req, res, next) => {
//     res.render("profile")
// })

// router.get('/logout', (req, res, next) => {
//     req.logout();
//     res.redirect('/');
//   });
module.exports = router

