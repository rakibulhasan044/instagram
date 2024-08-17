import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!isAuthenticated) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false,
            });
        }
        const decode = await jwt.verify(token, process.env.secret_key);
            if(!decode) {
                return res.status(401).json({
                    message: 'Invalide',
                    success: false,
                })
            }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated;