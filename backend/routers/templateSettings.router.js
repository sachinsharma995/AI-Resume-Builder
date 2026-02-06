import express from "express";
import {
    getAllTemplateSettings,
    getEnabledTemplates,
    toggleTemplateVisibility,
    setTemplateVisibility,
} from "../controllers/templateSettings.controller.js";

const router = express.Router();

// Get all template settings (returns map of templateId -> isEnabled)
router.get("/", getAllTemplateSettings);

// Get only enabled template IDs
router.get("/enabled", getEnabledTemplates);

// Toggle template visibility (admin only)
router.post("/toggle", toggleTemplateVisibility);

// Set specific template visibility (admin only)
router.post("/set", setTemplateVisibility);

export default router;
