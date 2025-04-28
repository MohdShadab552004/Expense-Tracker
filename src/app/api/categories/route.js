import dbConnect from '@/lib/db'
import { Categories } from '@/models/Transaction'

export async function GET() {
  await dbConnect()
  
  let categories = await Categories.findOne()

    console.log(categories);
    

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
    });
    await categories.save()
  }

  return Response.json(categories)
}
