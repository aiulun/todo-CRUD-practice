const mongoose = require('mongoose')

const connectDB = async () => {
    // Try/ Catch
    try {
      // Declare a variable called con which awaits the promise from mongoose connecting to the DB_STRING variable within the .env file
      const conn = await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true
      })
      // Console log connection is successful
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
      // Console log the error in the catch
      console.error(err)
      process.exit(1)
    }
  }

  module.exports = connectDB