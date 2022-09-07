const router = require('express').Router()
const controller = require('../controllers/SketchController')
const middleware = require('../middleware')

router.get('/:user_id', controller.GetSketches)
router.post('/upload/:user_id', controller.UploadSketch)

module.exports = router
