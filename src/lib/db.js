import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI')

let cached = global.mongoose || { conn: null, promise: null }

async function dbConnect() {
  if (cached.conn) {
    console.log('Using existing MongoDB connection')
    return cached.conn
  }

  if (!cached.promise) {
    console.log('🔄 Connecting to MongoDB...')
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('✅ New MongoDB connection established')
      return mongoose
    }).catch((err) => {
      console.error('MongoDB connection error:', err)
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
