const router = require('express').Router()
const controller = require('../controllers/PromptController')
const middleware = require('../middleware')

router.get('/:date', controller.GetDailyPrompt)
router.post('/create', controller.CreateDailyPrompt)

module.exports = router
