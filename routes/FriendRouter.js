const router = require('express').Router()
const controller = require('../controllers/FriendsController')
const middleware = require('../middleware')

router.post('/request/:user_id/:friend_id', controller.SendFriendRequest)
router.get('/users/:user_id', controller.GetAllUsers)

module.exports = router
