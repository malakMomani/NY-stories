import jwt from 'jsonwebtoken';
export default function validateToken(token) {
    return jwt.decode(token);
}