import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import validator from 'validator';


const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    email: {
        default:'',
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function () {
                // Custom validation to ensure email ends with "@admin.tylac.lk"
                return /^[a-zA-Z0-9._%+-]+@admin\.tylac\.lk$/.test(value);
            },
            message: props => `${props.value} is not a valid admin email! Email must end with "@admin.tylac.lk".`,
    },
},
    password: {
        type: String,
        required: true,
    },
},{timestamps: true}
);

adminSchema.statics.signup = async function (username, email, password) {
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

    const admin = await this.create({username, email, password: hashPassword})    
    return admin
}

adminSchema.statics.signin = async function (email, password) {

    if (!email || !password || password==='' || email===''){
        throw new Error("All Fields are Required");
  } 

  const admin = await this.findOne({email});

    if (!admin) {
        throw new Error('Incorrect Email');
    }

    const match = await bcryptjs.compare(password, admin.password);

    if(!match){
        
        throw new Error('Incorrect Password');

    }
    return admin;

}

const admin = mongoose.model('Admin', adminSchema);

export default admin;
