import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import validator from "validator";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._%+-]+@admin\.tylac\.lk$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid admin email! Email must end with "@admin.tylac.lk".`,
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "any", { strictMode: false });
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    image: {
      type: String,
      default: "https://example.com/default-profile.png", // Default image URL
      validate: {
        validator: function (value) {
          return validator.isURL(value);
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Signup method
adminSchema.statics.signup = async function (username, email, phone, password, image) {
  // Validate fields
  if (!username || !email || !phone || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isMobilePhone(phone, "any", { strictMode: false })) {
    throw new Error("Phone number is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  if (image && !validator.isURL(image)) {
    throw new Error("Invalid image URL");
  }

  // Check if email or phone already exists
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error("Email already exists");
  }

  const phoneExists = await this.findOne({ phone });
  if (phoneExists) {
    throw new Error("Phone number already exists");
  }

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create and return the admin
  const admin = await this.create({
    username,
    email,
    phone,
    password: hashedPassword,
    image: image || "https://example.com/default-profile.png", // Use provided image or default
  });

  return admin;
};

// Signin method
adminSchema.statics.signin = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const admin = await this.findOne({ email });

  if (!admin) {
    throw new Error("Incorrect email");
  }

  const match = await bcryptjs.compare(password, admin.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return admin;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
