var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser')
var Sequelize = require('sequelize')

var app = express();

app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Incomplete
app.use('/public/', express.static('public'));

app.use(session({
	secret: 'sumowarrior',
	resave: false,
	saveUninitialized: true
}))

var sequelize = new Sequelize('dtdb', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

var User = sequelize.define('user_profile', {
	userId: {
		type: Sequelize.STRING(100),
		field: 'user_id'
	}}, {
		timestamps: false,
		createdAt: false,
		updateAt: false,
		freezeTableName: true // Model tableName will be the same as the model name
});

var SurveyQuestion = sequelize.define('survey_question', {
	question: {
		type: Sequelize.STRING(100),
		field: 'question'
	}}, {
		timestamps: false,
		createdAt: false,
		updateAt: false,
		freezeTableName: true // Model tableName will be the same as the model name
});

var SurveyAnswer = sequelize.define('survey_answer', {
	questionId: {
		type: Sequelize.INTEGER,
		field: 'question_id'
	},
	answerId: {
		type: Sequelize.INTEGER,
		field: 'answer_id'
	},
	answer: {
		type: Sequelize.STRING(100),
		field: 'answer'
	}}, {
		timestamps: false,
		createdAt: false,
		updateAt: false,
		freezeTableName: true // Model tableName will be the same as the model name
});

var UserSurveyAnswer = sequelize.define('user_survey_answer', {
	userId: {
		type: Sequelize.STRING(100),
		field: 'user_id'
	},
	questionId: {
		type: Sequelize.INTEGER,
		field: 'question_id'
	},
	answerId: {
		type: Sequelize.INTEGER,
		field: 'answer_id'
	}}, {
		timestamps: false,
		createdAt: false,
		updateAt: false,
		freezeTableName: true // Model tableName will be the same as the model name
});

app.get('/', function (req, res) {
	User
	.findOrCreate({where: {userId: req.sessionID}})
	.spread(function(user, created) {
		console.log('User information', user.get({
			plain: true
		}))
		res.render('index', { title: 'Tebeau', message: 'Welcome to my first Node JS app!' })
	});
});

app.get('/considerPresentingSurveyQuestion', function (req, res) {
	console.log('req.sessionID:', req.sessionID);

	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'dtdb'
	});

	connection.connect();

	var questionId;
	var question;
	var post = { user_id : req.sessionID };
	var userId = req.sessionID;

	connection.query('SELECT id, question FROM dtdb.survey_question WHERE id NOT IN (SELECT question_id FROM dtdb.user_survey_answer WHERE user_id = ?) LIMIT 1', [userId], function(err,rows) {
		if (err) {
			connection.end();
			console.log('err', err);
			//res.contentType('json');
			res.send({ hasResult : false });
		}

		if (rows[0]) {
			questionId = rows[0].id;
			question = rows[0].question;
		};

		connection.query('SELECT answer_id, answer FROM dtdb.survey_answer WHERE question_id = ?', [questionId], function(err,rows) {
			if (err) {
				connection.end();
				console.log('err', err);
				//res.contentType('json');
				res.send({ hasResult : false });
				//throw err;
			}

			connection.end();

			if (rows.length) {
				console.log('considerPresentingSurveyQuestion sending results:', rows);
				console.log('question id =', questionId);
				//res.contentType('json');
				res.send({ hasResult : true, questionKey : question, questionIdKey : questionId, answerList : rows });
			} else {
				console.log("No questions to ask");
				//res.contentType('json');
				res.send({ hasResult : false});
			}
		});
	});
});

app.post('/recordUserSelection', function(req, res) {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'dtdb'
	});

	connection.connect();

	console.log('user id', req.sessionID);
	console.log('answer id', req.body.answerId);
	console.log('question id', req.body.questionId);

	var queryParams = { user_id : req.sessionID, question_id : req.body.questionId, answer_id : req.body.answerId };

	connection.query('INSERT INTO dtdb.user_survey_answer (user_id, question_id, answer_id) VALUES (?, ?, ?)', [req.sessionID, req.body.questionId, req.body.answerId], function(err,result) {
		if (err) {
			console.log('err', err);
			connection.end();
			throw err;
		}

		connection.end();
	});
});

// Add new survey question and answers to database
// TODO: Wrap all calls in a transaction
// TODO: Implement better mechanism for inserting answer rows
app.post('/addSurveyQuestion', function(req, res) {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'dtdb'
	});

	connection.connect();

	var question = { question : req.body.questionKey };

	// INSERT question
	connection.query('INSERT INTO dtdb.survey_question SET ?', question, function(err,result) {
		if (err) {
			console.log(err);
			res.send();
		}

		var questionId = result.insertId;
		console.log('insertId', result.insertId);
		var answerInfo = { question_id : questionId, answer_id : 1, answer : req.body.answer1Key };

		// INSERT answer 1
		connection.query('INSERT INTO dtdb.survey_answer SET ?', answerInfo, function(err,result) {
			if (err) {
				console.log(err);
				res.send();
			}

			// INSERT answer 2
			answerInfo = { question_id : questionId, answer_id : 2, answer : req.body.answer2Key };
			connection.query('INSERT INTO dtdb.survey_answer SET ?', answerInfo, function(err,result) {
				if (err) {
					console.log(err);
					res.send();
				}

				// INSERT answer 3
				answerInfo = { question_id : questionId, answer_id : 3, answer : req.body.answer3Key };
				connection.query('INSERT INTO dtdb.survey_answer SET ?', answerInfo, function(err,result) {
					if (err) {
						console.log(err);
						res.send();
					}

					// INSERT answer 4
					answerInfo = { question_id : questionId, answer_id : 4, answer : req.body.answer4Key };
					connection.query('INSERT INTO dtdb.survey_answer SET ?', answerInfo, function(err,result) {
						if (err) {
							console.log(err);
							res.send();
						}

						res.send({ result: 'success' });
					});
				});
			});
		});
	});
});

// Retrieve survery results
app.get('/retrieveSurveyResults', function(req, res) {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'dtdb'
	});

	connection.connect();

	var retrieveQueryString = 'SELECT ua.question_id, ua.answer_id, sq.question, sa.answer,count(*) as total FROM dtdb.user_survey_answer as ua, dtdb.survey_question as sq, dtdb.survey_answer as sa WHERE ua.question_id = sq.id and ua.answer_id = sa.answer_id and ua.question_id = sa.question_id GROUP BY ua.question_id, ua.answer_id order by ua.question_id, ua.answer_id';
	connection.query(retrieveQueryString, [], function(err,rows) {
		if (err) {
			console.log('err', err);
			connection.end();
			throw err;
		}

		connection.end();

		res.send(rows);
	});
});

app.listen(3000);