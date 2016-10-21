import * as cusrf from 'csurf';
import * as express from 'express';

export var csrfProtection = cusrf({cookie: true});
