let Candidate = require('../model/Candidate.js');
let Questions = require('../model/Questions.js');
let auth = require('../middleware/authMiddleware.js');

module.exports.setRoutes = function(app) {

	app.post('/createCandidate',auth.isAdminAuthenticated, (req, res) => {
		let params = req.body;

		if(params.name === undefined || params.name === ''){
			res.status(422).json({err:'Candidate name is required'});
		}else if(params.location === undefined || params.location === ''){
			res.status(422).json({err:'Candidate location is required'});
		}else if(params.panchayat === undefined || params.panchayat === ''){
			res.status(422).json({err:'Candidate panchayat is required'});
		}else{
			const newCandidate = new Candidate({
				name: params.name,
				location: params.location,
				panchayat: params.panchayat
			});

			newCandidate.save().then((candidate) => {
				res.status(200).json({success: true,msg:'Candidate created successfully',data: candidate});
			}).catch((err) => {
				res.status(400).json({success: false, err: 'Something went wrong',data:err});
			})
		}
	});

	app.get('/getAllCandidates',auth.isAdminAuthenticated, async (req,res) => {
		try{
			let data = await Candidate.aggregate([
				{
					'$lookup': {
						'from': 'questions', 
						'localField': '_id', 
						'foreignField': 'candidateId', 
						'as': 'questions'
					}
				}
			]);

			res.status(200).json(data);
		}catch(err){
			res.status(400).json(err);
		}
	})

};
