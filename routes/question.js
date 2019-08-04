var Questions = require('../model/Questions.js');
let Answer = require('../model/Answer.js');
let auth = require('../middleware/authMiddleware.js');

module.exports.setRoutes = function(app) {

  	app.post('/addQuestion/:candidateId',auth.isAdminAuthenticated, (req, res) => {
        
        const question = new Questions({
            candidateId: req.params.candidateId,
            question: req.body.question,
            questionType: req.body.questionType,
            options: req.body.options ? req.body.options : null
        });

        question.save().then((question) => {
            res.status(200).json({success:true,msg:"Question added successfully",data:question});
        }).catch((err) => {
            res.status(400).json(err);
        });

  	});

    
    app.get('/getQuestion/:candidateId',auth.isAdminAuthenticated, (req,res) => {
        Questions.find({candidateId: req.params.candidateId}).sort({createdAt:-1})
            .then((questions) => {
                res.status(200).json(questions);
            }).catch((err) => {
                res.status(400).json({err: 'Something went wrong',data:err});
            })
    })
};