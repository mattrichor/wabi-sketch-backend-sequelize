const { User, FriendList } = require('../models')
const { Op } = require('sequelize')

const GetAllPotentialFriends = async (req, res) => {
  try {
    const friends = await FriendList.findAll({
      where: { userId: req.params.user_id }
    })
    const friendIdArray = [parseInt(req.params.user_id)]
    friends.map((friend) => {
      friendIdArray.push(friend.friendId)
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
    let friendRequest = await FriendList.create(body)
    res.send(friendRequest)
  } catch (error) {
    throw error
  }
}

const ViewFriedRequests = async (req, res) => {
  try {
    let userFriends = await FriendList.findAll({
      where: {
        userId: req.params.user_id
      }
    })
    let friendArray = []
    userFriends.map((user) => {
      friendArray.push(user.id)
    })
    let userRequests = await FriendList.findAll({
      where: {
        friendId: req.params.user_id
      }
    })
    let requestArray = []
    userRequests.map((user) => {
      requestArray.push(user.userId)
    })
    let friendRequests = await FriendList.findAll({
      where: {
        [Op.and]: [
          {
            userId: {
              [Op.in]: requestArray
            }
          },
          {
            id: {
              [Op.notIn]: friendArray
            }
          },
          {
            friendId: req.params.user_id
          }
        ]
      }
    })
    console.log(friendRequests)
    res.send(friendRequests)
  } catch (error) {
    throw error
  }
}

module.exports = {
  SendFriendRequest,
  GetAllPotentialFriends,
  ViewFriedRequests
}
