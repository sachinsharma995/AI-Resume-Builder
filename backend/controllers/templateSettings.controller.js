import TemplateSettings from "../Models/templateSettings.js";

// Get all template settings
export const getAllTemplateSettings = async (req, res) => {
    try {
        const { type } = req.query; // Optional filter by template type (resume/cv)
        const query = type ? { templateType: type } : {};

        const settings = await TemplateSettings.find(query);

        // Convert to a map for easy lookup: { templateId: isEnabled }
        const settingsMap = {};
        settings.forEach((setting) => {
            settingsMap[setting.templateId] = setting.isEnabled;
        });

        res.status(200).json(settingsMap);
    } catch (error) {
        console.error("Error fetching template settings:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// Get enabled template IDs only
export const getEnabledTemplates = async (req, res) => {
    try {
        const { type } = req.query; // Optional filter by template type (resume/cv)
        const query = type ? { templateType: type, isEnabled: true } : { isEnabled: true };

        const settings = await TemplateSettings.find(query);
        const enabledIds = settings.map((s) => s.templateId);

        res.status(200).json(enabledIds);
    } catch (error) {
        console.error("Error fetching enabled templates:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// Toggle template visibility
export const toggleTemplateVisibility = async (req, res) => {
    try {
        const { templateId, templateType } = req.body;

        if (!templateId || !templateType) {
            return res.status(400).json({ msg: "templateId and templateType are required" });
        }

        // Find existing setting or create new one
        let setting = await TemplateSettings.findOne({ templateId });

        if (setting) {
            // Toggle the existing setting
            setting.isEnabled = !setting.isEnabled;
            await setting.save();
        } else {
            // Create new setting (default is enabled, so create as disabled since we're toggling)
            setting = new TemplateSettings({
                templateId,
                templateType,
                isEnabled: false, // First toggle means disabling (since default is enabled)
            });
            await setting.save();
        }

        res.status(200).json({
            msg: `Template ${setting.isEnabled ? "enabled" : "disabled"} successfully`,
            templateId,
            isEnabled: setting.isEnabled,
        });
    } catch (error) {
        console.error("Error toggling template visibility:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// Set specific template visibility
export const setTemplateVisibility = async (req, res) => {
    try {
        const { templateId, templateType, isEnabled } = req.body;

        if (!templateId || !templateType || isEnabled === undefined) {
            return res.status(400).json({ msg: "templateId, templateType, and isEnabled are required" });
        }

        // Upsert the setting
        const setting = await TemplateSettings.findOneAndUpdate(
            { templateId },
            { templateId, templateType, isEnabled },
            { upsert: true, new: true }
        );

        res.status(200).json({
            msg: `Template ${isEnabled ? "enabled" : "disabled"} successfully`,
            setting,
        });
    } catch (error) {
        console.error("Error setting template visibility:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};
