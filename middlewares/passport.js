const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy // trang bị cho passprot để mà giả mã
const { ExtractJwt } = require('passport-jwt') // dùng để lấy được dữ liệu từ đường dẫn mà đã được mã hóa bởi JWT
const { JWT_SECRET } = require('../configs/index')
const User = require('../models/User')

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization') , 
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        console.log('payload', payload)
        const user = await User.findById(payload.sub)
        if(!user) done(null, false)

        done(null, user)
        
    } catch (error) {
        done(error, false)
    }
}))