// Imports the User model, which is used to interact with the users collection in MongoDB.
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Retrieves and returns all users from the database.
const getAll = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error in getAll:', error); // Detailed error logging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getUser = async (req, res) => {
  try {
    console.log("Received user ID:", req.params.id); // Add this line
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    console.error('Error in getUser:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      if (req.body.password) {
        const newHashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = newHashedPassword;
      }

      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("User does not exist");
      }

      // Handle profilePic and coverPic paths if provided
      if (req.body.profilePic) {
        req.body.profilePic = req.body.profilePic.replace(/\\/g, '/'); // Fix Windows backslashes
      } else {
        req.body.profilePic = user.profilePic; // Keep existing profile picture if not updated
      }

      if (req.body.coverPic) {
        req.body.coverPic = req.body.coverPic.replace(/\\/g, '/'); // Fix Windows backslashes
      } else {
        req.body.coverPic = user.coverPic; // Keep existing cover picture if not updated
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(403).json({ msg: "You can update only your profile!" });
  }
};


// Deletes the user if the user ID matches the logged-in user’s ID.
const deleteUser = async (req, res) => {
  if (req.params.id === req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({ msg: "Successfully deleted!" });
    } catch (error) {
      console.error('Error in deleteUser:', error); // Detailed error logging
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(403).json({ msg: "You can delete only your profile!" });
  }
};

// Retrieves and returns all friends of a user based on the followings list.
const getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friends = await User.find({ _id: { $in: user.followings } });
    return res.status(200).json(friends);
  } catch (error) {
    console.error('Error in getUserFriends:', error); // Detailed error logging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Allows a user to follow another user if they are not already following them and are not trying to follow themselves.
const followUser = async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const friend = await User.findById(req.params.id);
      if (!friend) {
        return res.status(404).json({ message: "User does not exist" });
      }

      if (friend.followers.includes(req.body.userId)) {
        return res.status(400).json({ message: "Can't follow the same user twice" });
      }

      await User.findByIdAndUpdate(req.params.id, {
        $push: { followers: req.body.userId },
      });
      await User.findByIdAndUpdate(req.body.userId, {
        $push: { followings: req.params.id },
      });

      return res.status(200).json({ msg: "User successfully followed" });
    } catch (error) {
      console.error('Error in followUser:', error); // Detailed error logging
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ message: "Can't follow yourself" });
  }
};

// Allows a user to unfollow another user if they are currently following them and are not trying to unfollow themselves.
const unfollowUser = async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const friend = await User.findById(req.params.id);
      const user = await User.findById(req.body.userId);

      if (!friend) {
        return res.status(404).json({ message: "User to unfollow does not exist" });
      }

      if (!user) {
        return res.status(404).json({ message: "User who is trying to unfollow does not exist" });
      }

      if (!friend.followers.includes(req.body.userId)) {
        return res.status(400).json({ message: "Can't unfollow someone you don't follow in the first place" });
      }

      await User.findByIdAndUpdate(req.params.id, {
        $pull: { followers: req.body.userId },
      });
      await User.findByIdAndUpdate(req.body.userId, {
        $pull: { followings: req.params.id },
      });

      return res.status(200).json({ msg: "User successfully unfollowed" });
    } catch (error) {
      console.error('Error in unfollowUser:', error); // Detailed error logging
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ message: "Can't unfollow yourself" });
  }
};

// Search users by username
const searchUsers = async (req, res) => {
  const { username } = req.query;
  try {
    const users = await User.find({ username: new RegExp(username, 'i') }); // Case-insensitive search
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error in searchUsers:', error);
    return res.status(500).json({ message: 'Error searching for users', error });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getUserFriends,
  followUser,
  unfollowUser,
  getAll,
  searchUsers
};
