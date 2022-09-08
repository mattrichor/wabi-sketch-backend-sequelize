const { User, FriendList } = require('../models')
const { Op } = require('sequelize')

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: req.params.user_id
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
