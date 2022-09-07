const { Sketch } = require('../models')

const GetSketches = async (req, res) => {
  try {
    const sketches = await Sketch.findAll({
      where: {
        userId: req.params.User_id
      }
    })
    res.send(sketches)
  } catch (error) {
    throw error
  }
}

const UploadSketch = async (req, res) => {
  try {
    const newSketch = await Sketch.create({ ...req.body })
    res.send(newSketch)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetSketches,
  UploadSketch
}
