const User = require("../database/models/users");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  // passport.use(
  //   new localStrategy((email, password, done) => {
  //     User.findOne({ email: username }, (err, user) => {
  //       if (err) throw err;
  //       if (!user) return done(null, false);
  //       bcrypt.compare(password, user.password, (err, result) => {
  //         if (err) throw err;
  //         if (result === true) {
  //           return done(null, user);
  //         } else {
  //           return done(null, false);
  //         }
  //       });
  //     });
  //   })
  // );

  passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
      return done(null, false, req.flash('signinMessage', 'No User Found'));
    }
    // if(bcrypt.compare(password)) {
    //   return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    // }
bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
    return done(null, user);
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        email: user.email,
      };
      cb(err, userInformation);
    });
  });
};















// const passport = require("passport")
// const LocalStrategy = require('passport-local').Strategy
// const User = require("../database/models/users")

// //seralizar los datos y descerializar (inicio de sesion)
// // la idea es que una vez que este autenticado no se tenga que autenticar en cada pagina que visite 
// //de todo se encarga passport
// passport.serializeUser(function(user, done) {
//     done(null, user.id)
// })

// passport.deserializeUser(async (id, done) => {
//     // const user=await User.findById(id);
//     // //done(null,user) 
// User.findById(id,function(err,user){
//     done(err,user)
// })

// })


// passport.use('local-signin', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
//   }, async (req, email, password, done) => {
//     const user = await User.findOne({email: email});
//     if(!user) {
//       return done(null, false, req.flash('signinMessage', 'No User Found'));
//     }
//     if(!user.comparePassword(password)) {
//       return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
//     }
//     return done(null, user);
//   }));
  
//   passport.use('local-signup', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
//   }, async (req, email, password, done) => {
//     const user = await User.findOne({'email': email})
//     console.log(user)
//     if(user) {
//       return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
//     } else {
//       const newUser = new User();
//       newUser.email = email;
//       newUser.password = newUser.encryptPassword(password);
//     console.log(newUser)
//       await newUser.save();
//       done(null, newUser);
//     }
//   }));