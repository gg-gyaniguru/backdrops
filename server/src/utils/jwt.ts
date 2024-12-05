import jwt from 'jsonwebtoken';

const {SECRET_KEY} = process.env

const generateAccessToken = (_id: string) => {
    return jwt.sign({_id}, 'secret-key' as string, {expiresIn: '5d'});
}

const verifyAccessToken = (accessToken: string) => {
    return jwt.verify(accessToken, SECRET_KEY as string);
}

// console.log(generateAccessToken('66fe71459767502c358bfb26'))

export {generateAccessToken, verifyAccessToken};