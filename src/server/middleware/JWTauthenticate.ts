import passport = require('passport');
import * as express from 'express';

export var JWTAuthenticate = passport.authenticate('jwt', { session: false });

