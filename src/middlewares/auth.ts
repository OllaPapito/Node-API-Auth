import {Request, Response, NextFunction} from 'express';
import {User} from '../models/User';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/* export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
       
        let success = false;

        // Auth Verification
        if (req.headers.authorization) {
            let hash: string = req.headers.authorization.substring(12);
            let decoded: string = Buffer.from(hash, 'base64').toString();
            let data: string[] = decoded.split(':');

            if(data.length === 2) {
                let hasUser = await User.findOne({
                    where: {
                        email: data[0],
                        password: data[1]
                    }
                });
                if(hasUser) {
                    success = true;
                }
            }
        }

        if(success) {
            next();
        } else {
            res.status(403); // Not authorized
            res.json({error: 'Não autorizado'});
        }
    }
} */

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
       
        let success = false;

        // JWT Verification
        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === 'Bearer') {
                try {
                    JWT.verify(
                        token, 
                        process.env.JWT_SECRET_KEY as string
                        );
                    
                        success = true;
                } catch(err) {
                    
                }
            }
        }

    if(success) {
        next();
    } else {
        res.status(403); // Not authorized
        res.json({error: 'Não autorizado'});
        }
    }
}