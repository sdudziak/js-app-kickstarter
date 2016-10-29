import passport = require('passport');
import * as express from 'express';

export var JWTauthenticate =  passport.authenticate('jwt', { session: false });
