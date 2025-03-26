import { Component } from "#component/component-loader.js";
import { Box } from "#model/box.js";
import { customProperty } from "#utils/common.js";
export const boxResource = {
  resource: Box,
  options: {
    navigation: {
      name: "Box Management",
    },
    listProperties: ["title", "description", "short_title", "image_url", "box_type_id"],
    filterProperties: ["title", "description", "short_title", "image_url", "box_type_id"],
    editProperties: ["title", "description", "short_title", "image_url", "box_type_id"],
    showProperties: ["title", "description", "short_title", "image_url", "box_type_id"],
    properties: {
      title: {
        components: {
          list: Component.TruncateText
        }
      },
      description: {
        type: "richtext",
        components: {
          list: Component.TruncateText,
        },
      },
      short_title: {
        type: "richtext",
        components: {
          list: Component.TruncateText,
        },
      },
      image_url: {
        components: {
          list: Component.PreviewImage,
          show: Component.ShowImage
        },
      },
      box_type_id: {
        label: "Box Type",
        reference: "box_type",
        isVisible: { list: true, show: true, edit: true, filter: true },
        components: {
          edit: Component.ComboboxDetail
        },
        custom: customProperty("box_type")
      },
    },
  },
};
