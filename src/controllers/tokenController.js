import jwt from 'jsonwebtoken';

function check(req, res, next) {
    var token = req.headers['x-access-token'];
    if(!token) 
      return res.status(403).send({ auth: false, message: 'Missing token.' });
  
    jwt.verify(token, process.env.SECRET, function(err, decoded) {      
      if(err) 
        return res.status(401).send({ auth: false, message: 'Falha ao autenticar o token.' });    
      
      req.userId = decoded.id;
      next();
    });
}

export default check;