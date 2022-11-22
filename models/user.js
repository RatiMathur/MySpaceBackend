//Define User schema
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
    validate: {
      validator: (value) => {
        const emailPattern =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return emailPattern.test(value);
      },
      message: (props) => `${props.value} is not a valid username`,
    },
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate: {
      validator: (value) => {
        const passwordPattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
        return passwordPattern.test(value);
      },
      message: (props) => `password is not valid`,
    },
  },
});

module.exports = model("User", userSchema);
