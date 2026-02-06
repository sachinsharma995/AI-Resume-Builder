import mongoose from "mongoose";

const templateSettingsSchema = new mongoose.Schema(
    {
        templateId: {
            type: String,
            required: true,
            unique: true,
        },
        templateType: {
            type: String,
            enum: ["resume", "cv"],
            required: true,
        },
        isEnabled: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const TemplateSettings = mongoose.model("TemplateSettings", templateSettingsSchema);
export default TemplateSettings;
