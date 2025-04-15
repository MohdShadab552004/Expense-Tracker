import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  description: { type: String, required: true },
})

const CategoriesExpensesSchema = new mongoose.Schema({
  expenses: {
    type: [Number], // Array of category names
    default: () => Array(8).fill(0)
  }
})

// Define Models
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)
const Categories = mongoose.models.Categories || mongoose.model('Categories', CategoriesExpensesSchema)

export { Transaction,Categories }
