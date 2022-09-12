const router = require('express').Router()
const controller = require('../controllers/SketchController')
const middleware = require('../middleware')

router.get('/:user_id', controller.GetSketches)
router.get('/get/:sketch_id', controller.GetSketchById)
router.post('/upload/:user_id', controller.UploadSketch)
router.put('/save/:user_id/:sketch_id', controller.SaveSketch)
router.put('/send/:friend_id/:sketch_id', controller.SendSketch)

module.exports = router
