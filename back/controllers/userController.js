const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const crypto = require('crypto');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const {
  sendEmail
} = require('../utils/send email');

// ------------------------------------Login Controller----------------------------------------------
const login = asyncHandler(async (req, res) => {
  const { mainEmail, password } = req.body;
  console.log(mainEmail);

  const user = await User.findOne({ mainEmail });

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  
  // Verify password before generating OTP
  if (!(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP

  // Store OTP and expiry time in the user document or a separate collection
  user.otp = otp;
  // user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  await user.save();

  // Send OTP via email
  sendEmail(mainEmail, otp);

  res.json({
    _id: user._id,
    firstname: user.firstname,
    otp:user.otp,
    email: user.mainEmail,
    token: generateToken(user._id), // This could be a temporary token if needed
  });
});
// --------------------------match Otp----------------------------------------
const matchOtp = asyncHandler(async (req, res) => {
  const { mainEmail, otp } = req.body;

  const user = await User.findOne({ mainEmail });
  console.log(user);
  
  if (!user || !user.otp || !user.otpExpiry) {
    res.status(400);
    throw new Error('OTP verification failed');
  }

  // Check if OTP is valid and not expired
  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  // Clear OTP and expiry time
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  // Send the final response with the actual token if needed
  res.json({
    _id: user._id,
    firstname: user.firstname,
    email: user.mainEmail,
    token: generateToken(user._id),
  });
});

//--------------------------------------- Register Controller-----------------------------
const register = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    mainEmail,
    password,
    region,
    officeEmail,
    city,
    mainTelephone,
    officeTelephone,
    address,
    officeName

  } = req.body;
  // console.log(firstname,lastname,email,country,telephone);
  
  if (!firstname || !mainEmail || !password) {
    res.status(400);
    throw new Error('Please provide all required fields: name, email, and password');
  }
  const userExists = await User.findOne({ mainEmail });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    firstname,
    lastname,
    mainEmail,
    password,
    region,
    mainTelephone
  });
  // user.save();
  res.status(201).json({
    _id: user._id,
    name: user.firstname + ' ' + user.lastname,
    email: user.mainEmail,
    // isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

//---------------------------------getUsers--------------------------------------
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching users');
  }
});

// /----------------------------Profile Update -------------------------------------
const requestProfileUpdate = asyncHandler(async (req, res) => {
  const userid = req.params.id;

  const user = await User.findById(userid);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // const otp = generateOTP();
  // storeOTP(email, otp);
  // await sendEmail(email, otp);
  console.log(user);
  

  res.status(200).json({ message: user });
});

// -----------------------------VerifyAndUpdateProfile-------------------------------
const verifyAndUpdateProfile = asyncHandler(async (req, res) => {
  // const userId = req.query.id
  const userId = req.params.id;
  const officeEmail = req.body.officeEmail;
  const officeTelephone = req.body.officeTelephone;
  const address = req.body.address;
  const city = req.body.city;
  const region = req.body.region;
  const officeName = req.body.officeName;
  // const { otp, ...updateData } = req.body;

  // Retrieve user based on userId
  const user = await User.findById(userId);

  // if (!user) {
  //   return res.status(404).json({ message: "User not found" });
  // }

  // // Retrieve stored OTP for the user's email
  // const storedOtp = getStoredOTP(user.email);

  // if (!storedOtp) {
  //   return res
  //     .status(400)
  //     .json({
  //       message: "OTP is required or expired. Please request a new OTP.",
  //     });
  // }

  // if (storedOtp !== otp) {
  //   return res.status(400).json({ message: "Invalid OTP" });
  // }

  // deleteStoredOTP(user.email);

  // // Update user profile fields
  // Object.keys(updateData).forEach((field) => {
  //   if (user[field] !== undefined) {
  //     user[field] = updateData[field];
  //   }
  // });

  // if (updateData.password) {
  //   user.password = await bcrypt.hash(updateData.password, 10);
  // }
  user.officeEmail = officeEmail;
  user.officeTelephone = officeTelephone;
  user.address = address;
  user.city = city;
  user.region = region;
  user.officeName = officeName;
  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    memberNumber: updatedUser.memberNumber,
    membershipDate: updatedUser.membershipDate,
    token: generateToken(updatedUser._id),
  });
});


// ----------------dellete user--------------------------------
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    // Ensure the user to delete exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})


module.exports = { matchOtp ,login, register, requestProfileUpdate, verifyAndUpdateProfile, getUsers ,deleteUser };
