import { Tag } from "#model/tag.js";
export const TagResource = {
  resource: Tag,
  options: {
    listProperties: ["name", "description"],
    filterProperties: ["name", "description"],
    editProperties: ["name", "description"],
    showProperties: ["name", "description"],
  },
};
