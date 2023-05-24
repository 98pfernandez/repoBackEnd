import mongoose from'mongoose';
import { v4 as uuid } from 'uuid';

const ticketCollection = 'ticket'

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    default: uuid()
  },
  purchase_datetime: Date,
  amount:Number,
  purchaser: String,
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
      quantity: {
      type: Number,
      default: 1
    }
      }
    ],
    default: []
  }
})

const TicketModel = mongoose.model(ticketCollection, ticketSchema)

export default TicketModel;