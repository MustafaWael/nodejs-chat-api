import { Model, Document, Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const { isEmail } = validator;
const { hash } = bcrypt;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  tokens: string[];
  comparePassword(password: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): Promise<IUser>;
}

const schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Invalid Email address'],
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  tokens: {
    type: [String],
    required: true,
  },
});

// Hash the password before saving the user model
schema.pre<IUser>('save', async function (next) {
  const user = this as IUser;
  if (user.isModified('password')) {
    user.password = await hash(user.password, 8);
  }
  next();
});

// Compare the provided password with the hashed password in the database
schema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

const User: IUserModel = model<IUser, IUserModel>('User', schema);

export default User;
