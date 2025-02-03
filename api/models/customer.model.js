import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
import moment from 'moment'; // For DOB validation

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Simple phone number validation
                return /^\d{10}$/.test(value); // Assumes 10 digit phone numbers
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    image: {
        type: String,  // URL or file path for the image
        required: false,
    },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // Ensure DOB is at least 18 years ago
                const age = moment().diff(value, 'years');
                return age >= 18; // User must be 18 or older
            },
            message: props => `User must be at least 18 years old!`
        }
    }
}, {timestamps: true});

// Signup method
customerSchema.statics.signup = async function (firstName, lastName, email, phoneNumber, password, address, image, dob) {
    // Validation
    if (!firstName || !lastName || !email || !phoneNumber || !password || !address || !dob) {
        throw new Error("All Fields are Required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Email is Not Valid");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is Not Strong Enough");
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw new Error('Email Already Exists');
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const customer = await this.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashPassword,
        address,
        image,
        dob
    });

    return customer;
}

// Signin method
customerSchema.statics.signin = async function (email, password) {
    if (!email || !password) {
        throw new Error("All Fields are Required");
    }

    const customer = await this.findOne({ email });

    if (!customer) {
        throw new Error('Incorrect Email');
    }

    const match = await bcryptjs.compare(password, customer.password);

    if (!match) {
        throw new Error('Incorrect Password');
    }

    return customer;
}

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
