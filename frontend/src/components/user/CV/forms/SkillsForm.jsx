import { useState } from 'react';

const SkillsForm = ({ formData, setFormData }) => {
  const [newSkill, setNewSkill] = useState('');
  const [skillType, setSkillType] = useState('technical');

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
<<<<<<< Updated upstream
          [skillType]: [...prev.skills[skillType], newSkill.trim()],
        },
=======
          [skillType]: [...prev.skills[skillType], newSkill.trim()]
        }
>>>>>>> Stashed changes
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (type, index) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
<<<<<<< Updated upstream
        [type]: prev.skills[type].filter((_, i) => i !== index),
      },
=======
        [type]: prev.skills[type].filter((_, i) => i !== index)
      }
>>>>>>> Stashed changes
    }));
  };

  const addSuggestedSkill = (skill) => {
    if (!formData.skills[skillType].includes(skill)) {
<<<<<<< Updated upstream
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillType]: [...prev.skills[skillType], skill],
        },
=======
      setFormData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillType]: [...prev.skills[skillType], skill]
        }
>>>>>>> Stashed changes
      }));
    }
  };

<<<<<<< Updated upstream
  const suggestedSkills =
    skillType === "technical"
      ? ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"]
      : ["Leadership", "Communication", "Problem Solving", "Teamwork"];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-center font-medium transition-colors ${
            skillType === "technical"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setSkillType("technical")}
=======
  const suggestedSkills = skillType === 'technical'
    ? ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS']
    : ['Leadership', 'Communication', 'Problem Solving', 'Teamwork'];

  return (
    <div className="form-section">
      <div className="skills-type-tabs">
        <button
          className={`skill-type-tab ${skillType === 'technical' ? 'active' : ''}`}
          onClick={() => setSkillType('technical')}
>>>>>>> Stashed changes
        >
          Technical Skills
        </button>
        <button
<<<<<<< Updated upstream
          className={`flex-1 py-2 text-center font-medium transition-colors ${
            skillType === "soft"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setSkillType("soft")}
=======
          className={`skill-type-tab ${skillType === 'soft' ? 'active' : ''}`}
          onClick={() => setSkillType('soft')}
>>>>>>> Stashed changes
        >
          Soft Skills
        </button>
      </div>
<<<<<<< Updated upstream

      {/* Add Skill Input */}
      <div className="flex gap-2">
=======
      <div className="add-skill-row">
>>>>>>> Stashed changes
        <input
          type="text"
          placeholder={`Add a ${skillType} skill...`}
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => {
<<<<<<< Updated upstream
            if (e.key === "Enter" && newSkill.trim()) addSkill();
=======
            if (e.key === 'Enter' && newSkill.trim()) {
              addSkill();
            }
>>>>>>> Stashed changes
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
<<<<<<< Updated upstream
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2">
        {formData.skills[skillType].map((skill, idx) => (
          <span
            key={idx}
            className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(skillType, idx)}
              className="hover:text-red-600 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Suggested Skills */}
      <div className="space-y-2">
        <p className="font-medium text-gray-700">Suggested skills:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map((skill, idx) => (
            <button
              key={idx}
=======
        <button onClick={addSkill}>Add</button>
      </div>
      <div className="skills-list">
        {formData.skills[skillType].map((skill, idx) => (
          <span key={idx} className="skill-tag">
            {skill}
            <button onClick={() => removeSkill(skillType, idx)}>×</button>
          </span>
        ))}
      </div>
      <div className="suggested-skills">
        <p>Suggested skills:</p>
        <div className="suggested-tags">
          {suggestedSkills.map((skill, idx) => (
            <button
              key={idx}
              className="suggested-tag"
>>>>>>> Stashed changes
              onClick={() => addSuggestedSkill(skill)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
