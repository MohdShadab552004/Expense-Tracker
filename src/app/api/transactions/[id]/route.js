import dbConnect from '@/lib/db'
import {Transaction} from '@/models/Transaction'
import {Categories} from '@/models/Transaction'
 

export async function PUT(req, context) {
  await dbConnect()

  const { params } =await context
  const data = await req.json()

  try {
    const updated = await Transaction.findByIdAndUpdate(params.id, data, { new: true })
    if (!updated) {
      return new Response(JSON.stringify({ error: 'Transaction not found' }), {
        status: 404,
      })
    }

    return Response.json(updated)
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update transaction' }), {
      status: 500,
    })
  }
}


export async function DELETE(_, { params }) {
  await dbConnect();
  // Find the transaction to get category & amount
  const transaction = await Transaction.findById(params.id);
  if (!transaction) {
    return new Response(JSON.stringify({ error: 'Transaction not found' }), { status: 404 });
  }

  //Delete the transaction
  await Transaction.findByIdAndDelete(params.id);

  //Update Categories document
  const categoriesDoc = await Categories.findOne();

  if (categoriesDoc) {
    const categoryIndexMap = {
      'Bills & Utilities': 0,
      'Food': 1,
      'Personal': 2,
      'Healthcare': 3,
      'Education': 4,
      'Investment': 5,
      'Transport': 6,
      'Other': 7,
    };

    const idx = categoryIndexMap[transaction.category];

    if (idx !== undefined) {
      // Make sure it doesn't go below zero
      categoriesDoc.expenses[idx] = Math.max(0, categoriesDoc.expenses[idx] - transaction.amount);
      await categoriesDoc.save();
    }
  }

  return new Response(JSON.stringify({ message: 'Deleted successfully', categories: categoriesDoc }), {
    status: 200,
  });
}

