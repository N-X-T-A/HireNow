import { Blog } from "#model/blog.js";
import { Component } from "#component/component-loader.js";

export const blogResource = {
  resource: Blog,
  options: {
    listProperties: ["image", "title", "short_title", "tags"],
    filterProperties: ["title", "tags"],
    editProperties: ["image", "title", "short_title", "description", "tags"],
    showProperties: ["image", "title", "short_title", "description", "tags"],
    properties: {
      short_title: {
        components: {
          list: Component.TruncateText,
        },
      },
      description: {
        type: "richtext",
      },
      image: {
        components: {
          list: Component.PreviewImage,
          show: Component.ShowImage,
          edit: Component.UploadImage,
        },
      },
      tags: {
        components: {
          edit: Component.TagSelect,
          list: Component.TagList,
          show: Component.TagList,
        },
      },
    },
  },
};
