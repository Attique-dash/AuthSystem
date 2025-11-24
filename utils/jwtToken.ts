import jwt from "jsonwebtoken";
import "dotenv/config";

const generate = (id) => {
    return jwt.sign({id}, process.env.jwt_secret, {expiresIn: "7d"});
};

export default generate;