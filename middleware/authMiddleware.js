var Admin = require('../model/Admin.js');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


module.exports.isAdminAuthenticated = async function (req,res,next) {
    if(req.headers.token){

        jwt.verify(req.headers.token, process.env.JWT_SECRET, async(err, decoded) => {
            if (err) {
            	res.status(401).json({err:err});
            	return;
            }else{
                if(decoded && decoded.id){
                    let user = await Admin.findOne({_id:decoded.id});
                    if(!user){
                        res.status(401).json({err:'Unauthorised User'});
                        return;
                    }

                    next();
                }else{
                    res.status(401).json({err:'Unauthorised User'});
                }			
			}
        });

    }else{
        res.status(401).json({err:'Unauthorised User'});
		return;
    }
}