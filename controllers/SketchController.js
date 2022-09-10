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
    const { sketchData } = req.body
    const userId = req.params.user_id
    const newSketch = await Sketch.create({
      sketchData,
      userId
    })
    res.send(newSketch)
  } catch (error) {
    throw error
  }
}

const SaveSketch = async (req, res) => {
  try {
    const { sketchData } = req.body
    const userId = req.params.user_id
    const newSketch = await Sketch.update(
      {
        sketchData: sketchData,
        userId: userId
      },
      {
        where: {
          id: req.params.sketch_id
        }
      }
    )
    res.send(newSketch)
  } catch (error) {
    throw error
  }
}

const SendSketch = async (req, res) => {
  try {
    const { sketchData } = req.body
    const userId = req.params.friend_id
    const oldSketchId = req.params.sketch_id
    const newSketch = await Sketch.update(
      {
        sketchData: sketchData,
        userId: userId
      },
      {
        where: {
          id: oldSketchId
        }
      }
    )
    res.send(newSketch)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetSketches,
  UploadSketch,
  SendSketch,
  SaveSketch
}
