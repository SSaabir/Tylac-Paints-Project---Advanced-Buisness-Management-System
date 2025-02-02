import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import validator from "validator";

const employeeSchema = new mongoose.Schema(
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
          // Custom validation to ensure email ends with "@tylac.lk"
          return /^[a-zA-Z0-9._%+-]+@employee\.tylac\.lk$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid employee email! Email must end with "@employee.tylac.lk".`,
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
employeeSchema.statics.signup = async function (username, email, password) {
  // Validate fields
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  // Check if email already exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already exists");
  }

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create and return the employee
  const employee = await this.create({
    username,
    email,
    password: hashedPassword,
  });

  return employee;
};

// Signin method
employeeSchema.statics.signin = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const employee = await this.findOne({ email });

  if (!employee) {
    throw new Error("Incorrect email");
  }

  const match = await bcryptjs.compare(password, employee.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return employee;
};

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
