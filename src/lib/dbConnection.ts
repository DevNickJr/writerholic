import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// const opts = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     bufferCommands: false,
// }

async function dbConnect() {

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URI}`).then(mongoose => {
        // console.log('MongoDB Connected', mongoose, mongoose.connection.readyState)
        return mongoose
    })
  }

  cached.conn = await cached.promise;
  console.log('cached.conn', "connected")
  return cached.conn
}

export default dbConnect;