import * as mongoose from "mongoose"
const Schema = mongoose.Schema

export interface IUser extends mongoose.Document {
    name: string; 
    password: string;
    token: string;
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  token: {
    type: String,
    required: true
  }, 
})

export let User = mongoose.model<IUser>('User', userSchema)