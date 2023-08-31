import LabeledInput from "@components/molecules/LabeledInput";
import React from "react";

const SocialMediaFields = React.memo(({ formData, setFormData }) => {
  return (
    <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 gap-5 ">
      <h6 className="text-xl mb-5">Social Media Links</h6>
      <div className="flex flex-col sm:flex-row">
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          <LabeledInput
            label="Website"
            id="website"
            type="url"
            placeholder="https://www.example.com"
            value={formData.website}
            onChange={(e) =>
              setFormData((p) => ({ ...p, website: e.target.value }))
            }
          />
          <LabeledInput
            label="GitHub"
            id="github"
            type="url"
            placeholder="https://github.com/yourusername"
            value={formData.github}
            onChange={(e) =>
              setFormData((p) => ({ ...p, github: e.target.value }))
            }
          />
          <LabeledInput
            label="LinkedIn"
            id="linkedin"
            type="url"
            placeholder="https://www.linkedin.com/in/yourname"
            value={formData.linkedin}
            onChange={(e) =>
              setFormData((p) => ({ ...p, linkedin: e.target.value }))
            }
          />
          <LabeledInput
            label="Twitter"
            id="twitter"
            type="url"
            placeholder="https://twitter.com/yourusername"
            value={formData.twitter}
            onChange={(e) =>
              setFormData((p) => ({ ...p, twitter: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
});

export default SocialMediaFields;
