const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy // trang bị cho passprot để mà giả mã
const LocalStrategy = require('passport-local').Strategy
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const FacebookTokenStrategy = require('passport-facebook-token')
const { ExtractJwt } = require('passport-jwt') // dùng để lấy được dữ liệu từ đường dẫn mà đã được mã hóa bởi JWT
const { JWT_SECRET, auth } = require('../configs/index')

const User = require('../models/User')
const bcryptjs = require('bcryptjs')


// Passport jwt ==> decode token
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization') , 
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub)
        if(!user) done(null, false)
        done(null, user)
        
    } catch (error) {
        done(error, false)
    }
}))

// Passport google-plus-token ==> auth with google  
passport.use(new GooglePlusTokenStrategy({
    clientID: auth.google.CLIENT_ID,
    clientSecret: auth.google.CLIENT_SECRET
}, async function (accessToken, refreshToken, profile, done) {
    try {
        const id = profile.id
        const user = await User.findOne({authGoogleId: id})
        if(user) done(null, user)
        else {
            const email = profile.emails[0].value
            const firstName = profile.name.givenName
            const lastName = profile.name.familyName
            const authGoogleId = id
            const authType = 'google'
            const user = new User({email,firstName,lastName,authGoogleId,authType})
            await user.save()
            done(null, user)
        }
    
    } catch (error) {
        done(error, false)
    }
}))

// Passport facebook-token ==> auth with facebook 
passport.use(new FacebookTokenStrategy({
    clientID: auth.facebook.CLIENT_ID ,
    clientSecret: auth.facebook.CLIENT_SECRET
}, async function(accessToken, refreshToken, profile, done) {
    try {

        const id = profile.id
        const user = await User.findOne({authFacebookId: id})
        if(user) done(null, user)
        else {
            console.log('profile', profile)
            const email = profile._json.email
            const firstName = profile.name.givenName
            const lastName = profile.name.familyName
            const authFacebookId = id
            const authType = 'facebook'
            const user = new User({email,firstName,lastName,authFacebookId,authType})
            await user.save()
            done(null, user)
            

        }
        
      
        
    } catch (error) {
        done(error, false);
        
    }


}))

// Passport local ==> auth sign in with email and password
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function(email, password, done) {
    const user = await User.findOne({email: email})
    if(!user) return done(null, false)
    console.log(user)
    console.log(password)
    const isValid = user.verifyPassword(password)
    console.log(isValid)
    if(!isValid) return done(null, false)
    done(null, user)
}))