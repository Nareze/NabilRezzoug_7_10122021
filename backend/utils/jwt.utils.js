let jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'mdpsecret'

module.exports = {

    // generatorTokenForUser : function(userData) {
    //     return jwt.sign({
    //         userId: userData.id,
    //         isAdmin: userData.isAdmin
    //     },
    //     JWT_SIGN_SECRET,
    //     {
    //         expiresIn:'1h'
    //     })
    // },


    // parseAuthorization: function(authorization) {       // 2eme étape : token extrait
    //     return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    // },
    // getUserId: function(authorization){
    //     let userId = -1;
    //     let token = module.exports.parseAuthorization(authorization);   // 1ere étape : appel de la fonction qui extrait le token
    //     if(token != null) {
    //         try {       // 3eme étape : verification du token et extraction du userId
    //             let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
    //             if(jwtToken != null)
    //                 userId = jwtToken.userId;
    //         } catch(err){ }
    //     }
    //     return userId;      // 4eme etape : la fonction retourne le userId
    // }
}