let express = require('express')
let router = express.Router()

router.get('/canvas', (req, res, next) => {
	res.render('someTest/canvas', {
		title: 'canvas'
	})
})

module.exports = router