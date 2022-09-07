const { Sketch } = require('../models')

const GetSketches = async (req, res) => {
  try {
    const sketches = await Sketch.findAll({
      where: {
        userId: req.params.user_id
      }
    })
    res.send(sketches)
  } catch (error) {
    throw error
  }
}

const UploadSketch = async (req, res) => {
  try {
    const { sketchData, thumbnail } = req.body
    const userId = req.params.user_id
    const newSketch = await Sketch.create({
      sketchData,
      thumbnail,
      userId
    })
    res.send(newSketch)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetSketches,
  UploadSketch
}