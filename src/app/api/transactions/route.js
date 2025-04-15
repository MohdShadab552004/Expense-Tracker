import dbConnect from '@/lib/db'
import { Transaction, Categories } from '@/models/Transaction'

export async function GET() {
  await dbConnect()
  const transactions = await Transaction.find().sort({ date: -1 })
  return Response.json(transactions)
}

export async function POST(req) {
  await dbConnect()
  const data = await req.json()

  const created = await Transaction.create(data)

  let categories = await Categories.findOne()
  
  if (!categories) {
    categories = new Categories({
      expenses: new Array(8).fill(0),
      categories: [
        'Bills & Utilities',
        'Food',
        'Personal',
        'Healthcare',
        'Education',
        'Investment',
        'Transport',
        'Other'
      ]
    })
    await categories.save(); 
  }

  if (!Array.isArray(categories.expenses)) {
    categories.expenses = new Array(8).fill(0)
  } else if (categories.expenses.length < 8) {
    for (let i = categories.expenses.length; i < 8; i++) {
      categories.expenses[i] = 0
    }
  }

  const categoryIndexMap = {
    'Bills & Utilities': 0,
    'Food': 1,
    'Personal': 2,
    'Healthcare': 3,
    'Education': 4,
    'Investment': 5,
    'Transport': 6,
    'Other': 7
  }

  const idx = categoryIndexMap[data.category]
  if (idx === undefined) {
    return Response.json({ error: 'Invalid category' }, { status: 400 })
  }

  categories.expenses[idx] = Number(categories.expenses[idx]) + Number(data.amount);  

  await categories.save()

  return Response.json({ created, categories }, { status: 201 })
}
