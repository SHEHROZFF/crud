const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { stringify } = require('uuid');

// User Schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mainEmail: {
      type: String,
      required: true,
      unique: true,
    },
    memberId: {
      type: String,
    },
    membershipDate: {
      type: Date,
      default: function() { return this.isAdmin ? undefined : Date.now(); }, // Default if not admin
    },
    officeEmail: {
      type: String,
    },
    region: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
    },
    mainTelephone: {
      type: String,
      required: true,
    },
    officeTelephone: {
      type: String,
    },
    address: {
      type: String,
    },
    officeName: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: String,
    },
    promotionYear: {
      type: String,
    },
    association: {
      type: String,
    },
    assoc: {
      type: String,
    },
    yourTitle: {
      type: String,
    },
    profilePicture : {
      type: String
    },
    isAdmin : {
      type:Boolean,
      // default: false
    }
  },
  { timestamps: true }
);

// Method to match entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash password if modified and to set memberId
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  
  if (!this.memberId) {
    this.memberId = this._id.toString();
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
