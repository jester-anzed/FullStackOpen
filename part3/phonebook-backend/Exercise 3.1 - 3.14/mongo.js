const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://fullstackopen:${password}@cluster0.q9u15xv.mongodb.net/Phonebook?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })


const noteSchema = new mongoose.Schema({
  Name: String,
  Number: String,
})

const Phone = mongoose.model('Phone', noteSchema)

const phone = new Phone({
    Name: process.argv[3],
    Number: process.argv[4],
})

if (process.argv.length === 5) {
    phone.save().then(result => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        console.log(mongoose.connection.close())
    })
}

if (process.argv.length === 3) {
    Phone.find().then(result => {
        console.log("phonebook: ")
        result.forEach(phone => {
            console.log(`${phone.Name} ${phone.Number}`)
        })
        mongoose.connection.close()
    })
}