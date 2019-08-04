var Survey = require('../model/Survey.js');
let auth = require('../middleware/authMiddleware.js');

module.exports.setRoutes = function(app) {

  	app.post('/createSurvey/:candidateId',auth.isAdminAuthenticated, (req, res) => {
        
        const survey = new Survey({
            candidateId: req.params.candidateId,
            surveyInfo: req.body.surveyInfo,
            answers: req.body.answers
        });

        survey.save().then((survey) => {
            res.status(200).json({success:true,msg:"Survey Created successfully",data:survey});
        }).catch((err) => {
            res.status(400).json(err);
        });

  	});
};
