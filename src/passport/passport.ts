import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { User } from "../model/User";

export const configurePassport = (passport: PassportStatic): PassportStatic => {

    passport.serializeUser((user: Express.User, done) => {
        console.log('User is serialized')
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        console.log('User is unserialized')
        done(null, user)
    });

    passport.use('local', new Strategy((username, password, done) => {
        const query = User.findOne({email: username})
        query.then(user => {
            if (user) {
                user.comparePassword(password, (error, _) => {
                    if(error){
                        done('Incorrect username or password')
                    } else {
                        done(null, user.id); 
                    }
                });
            } else {
                done(null, undefined);
            }
        }).catch(error => {
            done(error);
        });
    }));

    return passport;
}