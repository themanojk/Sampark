var Admin = require('../model/Admin.js');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


module.exports.setRoutes = function(app) {

	app.post('/admin/login', (req, res) => {
		console.log(req.body)
		const email = req.body.email;
		const password = req.body.password;

		if(email === undefined || email === ''){
			res.status(422).json({err:'Email is required'});
		}else if(password === undefined || password === ''){
			res.status(422).json({err:'Password is required'});
		}else{
			// Find user by email
			Admin.findOne({ email:email }).then(user => {
				// Check for user
				if (!user) {
					return res.status(404).json({err:"User not found"});
				}
			
				// Check Password
				bcrypt.compare(password, user.password).then(isMatch => {
					if (isMatch) {
						// User Matched
						const payload = { id: user.id}; // Create JWT Payload
				
						// Sign Token
						jwt.sign(
							payload,
							process.env.JWT_SECRET,
							{ expiresIn: 36000 },
							(err, token) => {
								res.status(200).json({
									success: true,
									msg:'Login Successful',
									token: token
								});
							}
						);
					} else {
						return res.status(401).json({err: "Password does not match"});
					}
				});
			});
		
		}
	});

};
