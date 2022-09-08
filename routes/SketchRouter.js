const router = require('express').Router()
const controller = require('../controllers/SketchController')
const middleware = require('../middleware')

router.get('/:user_id', controller.GetSketches)
router.post('/upload/:user_id', controller.UploadSketch)
router.post('/send/:friend_id/:sketch_id', controller.SendSketch)

module.exports = router
