const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy // trang bị cho passprot để mà giả mã
const { ExtractJwt } = require('passport-jwt') // dùng để lấy được dữ liệu từ đường dẫn mà đã được mã hóa bởi JWT
const { JWT_SECRET } = require('../configs/index')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcryptjs = require('bcryptjs')

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