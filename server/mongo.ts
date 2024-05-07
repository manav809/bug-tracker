const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const username = process.argv[2]

const password = process.argv[3]

const url = `mongodb+srv://${username}:${password}@cluster0.zdpcfpo.mongodb.net/bug-tracker?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  stories: { type: mongoose.Schema.Types.ObjectId, ref: "Bug" },
})
const userInformation = mongoose.model("user", userSchema)

const user = new userInformation({
  name: "Tony",
  email: "bkjd@vfdj.com",
  role: "scrum master",
})

user.save().then(() => {
  console.log(`added ${user.name}'s number: ${user.email} to phonebook`)
})

userInformation.find({}).then((result: any[]) => {
  result.forEach((user: { name: any; email: any }) => {
    console.log(`${user.name} ${user.email}`)
  })
  mongoose.connection.close()
})
