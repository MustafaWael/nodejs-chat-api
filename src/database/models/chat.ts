import { Document, Schema, model, ObjectId } from 'mongoose';

export interface IChat extends Document {
  participants: ObjectId[];
  messages: ObjectId[];
}

const chatSchema = new Schema<IChat>({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

const Chat = model<IChat>('Chat', chatSchema);

export default Chat;
