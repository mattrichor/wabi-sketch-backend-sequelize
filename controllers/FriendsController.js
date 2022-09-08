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

const ViewFriendRequests = async (req, res) => {
  try {
    let userFriends = await FriendList.findAll({
      where: {
        userId: req.params.user_id
      }
    })
    // gets the ids of people the user has sent a friend request to (including actual friends)
    // 2, 3, 4, 5 -> friend requests sent to FRIENDTEST, Benji, Oliver, FRIENDTWO
    let friendArray = []
    userFriends.map((user) => {
      friendArray.push(user.friendId)
      console.log('friend array')
      console.log(friendArray)
    })
    let userRequests = await FriendList.findAll({
      where: {
        friendId: req.params.user_id
      }
    })
    //gets the ids of people who have sent a friend request to the User
    let requestArray = []
    userRequests.map((user) => {
      requestArray.push(user.userId)
      console.log('user request array')
      console.log(requestArray)
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
            userId: {
              [Op.notIn]: friendArray
            }
          },
          {
            friendId: req.params.user_id
          }
        ]
      }
    })
    let array = []
    friendRequests.map((friend) => {
      array.push(friend.userId)
      console.log('friend request array')
      console.log(array)
    })

    let potentialFriends = await User.findAll({
      where: {
        id: {
          [Op.in]: array
        }
      }
    })
    let friendsTable = await FriendList.findAll({
      where: {
        [Op.and]: [
          {
            friendId: {
              [Op.in]: requestArray
            }
          },
          {
            userId: req.params.user_id
          }
        ]
      }
    })
    let friendTableArray = []
    friendsTable.map((friend) => {
      friendTableArray.push(friend.friendId)
      console.log(friendTableArray)
    })
    let friends = await User.findAll({
      where: {
        id: {
          [Op.in]: friendTableArray
        }
      }
    })
    res.send({ requests: potentialFriends, friends: friends })
  } catch (error) {
    throw error
  }
}

module.exports = {
  SendFriendRequest,
  GetAllPotentialFriends,
  ViewFriendRequests
}
