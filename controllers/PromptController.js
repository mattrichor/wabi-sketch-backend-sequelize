const { Prompt } = require('../models')

const GetDailyPrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findOne({
      where: {
        date: req.params.date
      }
    })
    res.send(prompt)
  } catch (error) {
    throw error
  }
}

const CreateDailyPrompt = async (req, res) => {
  try {
    const prompt = await Prompt.create(req.body)
    res.send(prompt)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetDailyPrompt,
  CreateDailyPrompt
}
