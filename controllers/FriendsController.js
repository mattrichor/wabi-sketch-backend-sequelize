const { User, FriendList } = require('../models')
const { Op } = require('sequelize')

const GetAllUsers = async (req, res) => {
  try {
    const friends = await FriendList.findAll({
      where: { userId: req.params.user_id }
    })
    const friendIdArray = [parseInt(req.params.user_id)]
    friends.map((friend) => {
      friendIdArray.push(friend.friendId)
      console.log(friendIdArray)
    })
    const users = await User.findAll({
      where: {
        id: {
          [Op.notIn]: friendIdArray
        }
      }
    })
    res.send(users)
  } catch (error) {
    throw error
  }
}

const SendFriendRequest = async (req, res) => {
  try {
    let user = parseInt(req.params.user_id)
    let friend = parseInt(req.params.friend_id)
    let body = {
      userId: user,
      friendId: friend
    }
    let newFollow = await FriendList.create(body)
    res.send(newFollow)
  } catch (error) {
    throw error
  }
}

module.exports = {
  SendFriendRequest,
  GetAllUsers
}
