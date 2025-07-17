import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience: 'authenticate api',
    issuerBaseURL: 'https://dev-g5l48dss0htraab2.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

export { jwtCheck };