import AtsScans from "../Models/atsScan.js";
import User from "../Models/User.js";
import Payment from "../Models/payment.js";
import Resume from "../Models/resume.js";
import Subscription from "../Models/subscription.js";
import bcrypt from "bcryptjs";

// Helper: last month date
const getLastMonthDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
};

// -------------------- USER DASHBOARD --------------------
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("username email");

    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    const totalResumes = await Resume.countDocuments({ user: userId });
    const resumesThisWeek = await Resume.countDocuments({
      user: userId,
      createdAt: { $gte: oneWeekAgo },
    });

    const atsScans = await AtsScans.find({ userId })
      .sort({ createdAt: -1 })
      .limit(2);

    const latestAts = atsScans[0]?.overallScore || 0;
    const previousAts = atsScans[1]?.overallScore || latestAts;
    const atsDelta = latestAts - previousAts;

    const recentResumes = await Resume.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      user: {
        name: user?.username || "User",
        email: user?.email,
      },
      stats: {
        resumesCreated: totalResumes,
        resumesThisWeek,
        avgAtsScore: latestAts,
        atsDelta,
        profileViews: 0,
      },
      recentResumes: recentResumes.map((r) => ({
        id: r._id,
        name: r.title,
        date: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

// -------------------- ADMIN: GET ALL USERS --------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// ================== USER PROFILE (SELF) ==================
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { fullName, username, email, phone, location, bio, github, linkedin } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: "Email already exists" });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (bio !== undefined) user.bio = bio;
    if (github !== undefined) user.github = github;
    if (linkedin !== undefined) user.linkedin = linkedin;

    await user.save();
    res.status(200).json({ 
      message: "Profile updated", 
      user: await User.findById(userId).select("-password") 
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) 
      return res.status(400).json({ message: "Both passwords are required" });
    if (newPassword.length < 8) 
      return res.status(400).json({ message: "Password must be at least 8 characters" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Current password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Failed to change password" });
  }
};

// -------------------- ADMIN: UPDATE USER --------------------
export const updateUser = async (req, res) => {
  try {
    const { username, email, isAdmin, isActive } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already exists" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    if (typeof isAdmin === "boolean") user.isAdmin = isAdmin;
    if (typeof isActive === "boolean") {
      console.log(`Updating user ${user.email} isActive from ${user.isActive} to ${isActive}`);
      user.isActive = isActive;
    }
    if (req.body.createdAt) user.createdAt = req.body.createdAt;
    if (req.body.plan) user.plan = req.body.plan;

    await user.save();
    console.log(`User ${user.email} updated - isActive is now: ${user.isActive}`);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// -------------------- ADMIN: DELETE USER --------------------
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// [REST OF YOUR ANALYTICS FUNCTIONS - KEEP AS IS]
export const getAnalyticsStats = async (req, res) => {
  // ... your existing analytics code (unchanged)
};

export const getAdminDashboardStats = async (req, res) => {
  // ... your existing dashboard stats code (unchanged)
};

export const getUserName = async (req, res) => {
  // ... your existing getUserName code (unchanged)
};
