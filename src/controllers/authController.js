
import Books from "../models/books.js";

class AuthController {

    static async register(req, res) {
        const user = req.body.username;
        const hashedPassword = req.body.password;
        console.log(req.body);
        //users.push ({user: user, password: hashedPassword})
        res.status(201).send(req.body);
    }

    static async authenticate(req, res) {
        console.log(req.body);
        /*
        const user = users.find((c) => c.user == req.body.name);

        if(user == null) res.status(404).send ("User does not exist!");

        if(await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign(req.body.name, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
            //const refreshToken = generateRefreshToken ({user: req.body.name})
            res.json ({accessToken: accessToken});
        } else {
            res.status(401).send("Password Incorrect!");
        }
        */
    }

}

export default AuthController;