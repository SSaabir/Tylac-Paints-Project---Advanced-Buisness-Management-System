import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import validator from 'validator';


const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},{timestamps: true}
);

customerSchema.statics.signup = async function (username, email, password) {
    //validator
    if (!username || !email || !password || password==='' || username==='' || email===''){
            throw new Error("All Fields are Required");
      } 

      if (!validator.isEmail(email)) {
        throw new Error("Email is Not Valid");
      }

      if(!validator.isStrongPassword(password)){
        throw new Error("Password is Not Strong Enough");
      }

    const exists = await this.findOne({email});
    
    if (exists) {
        throw new Error('Email Already Exists');
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const customer = await this.create({username, email, password: hashPassword})    
    return customer
}

customerSchema.statics.signin = async function (email, password) {

    if (!email || !password || password==='' || email===''){
        throw new Error("All Fields are Required");
  } 

  const customer = await this.findOne({email});

    if (!customer) {
        throw new Error('Incorrect Email');
    }

    const match = await bcryptjs.compare(password, customer.password);

    if(!match){
        throw new Error('Incorrect Password');

    }
    return customer;

}

const customer = mongoose.model('Customer', customerSchema);

export default customer;
