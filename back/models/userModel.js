const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// OTP Schema (if applicable, include here)
// User Schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    
    lastname: {
      type: String,
      required:true,
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
      type:Number,
      default: function name(params) {
        return Math.random() * 100
      }
    },
    membershipDate: {
      type: Date,
      default: function() { return this.isAdmin ? undefined : Date.now(); }, // Default if not admin
    },
    officeEmail: {
      type: String,
    },

    region : {
      type: String,
      required: true
    },
    city : {
      type: String,
      // required: true
    },
    mainTelephone : {
      type:String,
      required:true
    },
    officeTelephone : {
      type:String,
      // required:true
    },
    address : {
      type:String,
      // required:true
    },
    officeName : {
      type: String,
      // required: true
    }

    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },

    // additionalPhoneNumbers: [{
    //   type: String,
    //   required: function() { return !this.isAdmin; }, // Required if not admin
    // }],

    // additionalEmailAddresses: [{
    //   type: String,
    //   unique: true,
    //   required: function() { return !this.isAdmin; }, // Required if not admin
    // }],

    // website: {
    //   type: String,
    //   required: function() { return !this.isAdmin; }, // Required if not admin
    // },

    // address: {
    //   street: {
    //     type: String,
    //     required: function() { return !this.isAdmin; }, // Required if not admin
    //   },
    //   city: {
    //     type: String,
    //     required: function() { return !this.isAdmin; }, // Required if not admin
    //   },
    //   state: {
    //     type: String,
    //     required: function() { return !this.isAdmin; }, // Required if not admin
    //   },
    //   postalCode: {
    //     type: String,
    //     required: function() { return !this.isAdmin; }, // Required if not admin
    //   }
    // },

    // gpsLocation: {
    //   latitude: {
    //     type: Number,
    //     required: function() { return !this.isAdmin; }, // Required if not admin
    //   },
    //   longitude: {
    //     type: Number,
    //     required: function() { return !this.isAdmin; }, // Required if not admin
    //   }
    // },

    // otherPersonalInformation: {
    //   type: String,
    //   required: function() { return !this.isAdmin; }, // Required if not admin
    // },

    // memberNumber: {
    //   type: String,
    //   unique: true,
    //   required: function() { return !this.isAdmin; }, // Required if not admin
    // },


  },
  { timestamps: true }
);

// Method to match entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash password if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
