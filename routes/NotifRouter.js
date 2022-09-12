const router = require('express').Router()
const controller = require('../controllers/NotifController')
const middleware = require('../middleware')

router.get('/get/:user_id', controller.GetUserNotifications)
router.delete('/destroy/:notif_id', controller.DestroyNotification)
router.post('/create/:user_id/:sketch_id', controller.CreateNotification)

module.exports = router
