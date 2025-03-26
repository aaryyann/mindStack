import { UserModel } from ".././src/db";

declare global{
    namespace Express {
        interface Request {
            userId : string
        }
    }
}