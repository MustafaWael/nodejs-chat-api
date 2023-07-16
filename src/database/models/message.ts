import { Document, Schema, model, ObjectId } from 'mongoose';

export interface IMessage extends Document {
  sender: ObjectId;
  receiver: ObjectId;
  chatId: ObjectId;
  message: string;
  status: 'pending' | 'sent' | 'read';
  timeStamp: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'sent', 'read'],
    default: 'pending',
  },
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  timeStamp: { type: Date, default: Date.now },
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;
