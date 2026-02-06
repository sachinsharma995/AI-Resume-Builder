import axiosInstance from "../api/axios";

// Get template visibility status from backend
export const getTemplateStatus = async (id) => {
    try {
        const response = await axiosInstance.get("/api/template-settings");
        const settings = response.data;
        // If not in settings, default to true (enabled)
        return settings[id] !== false;
    } catch (error) {
        console.error("Error fetching template status:", error);
        return true; // Default to enabled on error
    }
};

// Toggle template status via backend API
export const toggleTemplateStatus = async (id, templateType = "cv") => {
    try {
        const response = await axiosInstance.post("/api/template-settings/toggle", {
            templateId: id,
            templateType,
        });
        return response.data.isEnabled;
    } catch (error) {
        console.error("Error toggling template status:", error);
        throw error;
    }
};

// Get all template statuses from backend
export const getAllTemplateStatuses = async () => {
    try {
        const response = await axiosInstance.get("/api/template-settings");
        return response.data;
    } catch (error) {
        console.error("Error fetching all template statuses:", error);
        return {}; // Return empty object on error
    }
};

// Get only enabled template IDs from backend
export const getEnabledTemplateIds = async (type = "cv") => {
    try {
        const response = await axiosInstance.get(`/api/template-settings/enabled?type=${type}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching enabled templates:", error);
        return []; // Return empty array on error
    }
};

// Check if a template is enabled (for filtering)
export const isTemplateEnabled = async (id) => {
    const statuses = await getAllTemplateStatuses();
    // If the template is not in the settings, it's enabled by default
    return statuses[id] !== false;
};
