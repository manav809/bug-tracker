import mongoose from 'mongoose'

const bugSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  story_points: { type: Number, required: false }
})

bugSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Bug = mongoose.model('Bug', bugSchema)
module.exports = Bug
