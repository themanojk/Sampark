var Admin = require('../model/Admin.js');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


module.exports.setRoutes = function(app) {

  	app.post('/addAdmin', (req, res) => {
      
		Admin.findOne({ email: req.body.email }).then(async user => {
			if (user) {
				return res.status(400).json({err: 'User is already registered'});
			} else {
		
				let newAdmin = new Admin({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password
				});
		
				bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newAdmin.password, salt, (err, hash) => {
					if (err) throw err;
					newAdmin.password = hash;
					newAdmin
						.save()
						.then(user => res.status(200).json(user))
						.catch(err => res.status(400).json({err:err}));
				});
				});
			}
		});
  	});
};
