import mongoose from "mongoose";
import { Password } from "../helpers/password";

// An  interface that describes that are required to create a new user

interface UserAttrs {
  email: String;
  password: String;
}

//An interface that describes the properties that the user model has
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs:UserAttrs):UserDoc;
}

//An interface that describes the properties that the user Document in mongoDB database has

interface UserDoc extends mongoose.Document{
    email: String,
    password: String,
    // createdAt :String
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},{     // not understanding properly; 
  toJSON:{
    transform(doc,ret){
      ret.id = ret._id;
      delete ret._id; 
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.pre('save', async function(done){
    if(this.isModified('password'))
    {
        const hashed =  await Password.toHash(this.get('password'));
        this.set('password',hashed); 
    }
    done();
})

userSchema.statics.build = (attrs:UserAttrs) =>{
    return new User(attrs);
}

const User = mongoose.model<UserDoc,UserModel>("User", userSchema);

User.build({
    email: '',
    password: 'undefined'
})


export { User };
