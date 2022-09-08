const router = require('express').Router()
const controller = require('../controllers/FriendsController')
const middleware = require('../middleware')

router.post('/request/:user_id/:friend_id', controller.SendFriendRequest)
router.get('/users/:user_id', controller.GetAllPotentialFriends)
router.get('/friend_requests/:user_id', controller.ViewFriedRequests)

module.exports = router
