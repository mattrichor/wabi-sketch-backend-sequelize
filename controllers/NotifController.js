const { Notification } = require('../models')
const { Op } = require('sequelize')

const GetUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: {
        userId: req.params.user_id
      }
    })
    res.send(notifications)
  } catch (error) {
    throw error
  }
}

const CreateNotification = async (req, res) => {
  try {
    console.log(req)
    const { senderName } = req.body
    const userId = req.params.user_id
    const sketchId = req.params.sketch_id
    const newNotif = await Notification.create({
      senderName,
      userId,
      sketchId
    })
    res.send(newNotif)
  } catch (error) {
    throw error
  }
}

const DestroyNotification = async (req, res) => {
  try {
    const notif = await Notification.destroy({
      where: {
        id: req.params.notif_id
      }
    })
  } catch (error) {
    throw error
  }
}
module.exports = {
  GetUserNotifications,
  CreateNotification,
  DestroyNotification
}
