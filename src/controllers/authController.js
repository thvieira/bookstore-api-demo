
import Books from "../models/books.js";
import jwt from "jsonwebtoken";

class AuthController {

    static async authenticate(req, res) {
        if(req.body.usr === process.env.DEFAULT_USER && req.body.pwd === process.env.DEFAULT_PASS){
            const id = 1;
            var token = jwt.sign({ id }, process.env.SECRET, {
              expiresIn: 300 // expires in 5min
            });
            return res.status(200).send({ auth: true, token: token });
          }
          
          res.status(401).send('Login inválido!');
    }

}

export default AuthController;