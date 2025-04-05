import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ApiClient } from "adminjs";

const api = new ApiClient();

const TagSelect = (props) => {
  const { record, onChange, property } = props;
  const [options, setOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.resourceAction({
          resourceId: "tag",
          actionName: "list",
        });

        const tags = response.data.records;
        const formattedTags = tags.map((tag) => ({
          value: tag.params._id,
          label: tag.params.name,
        }));

        setOptions(formattedTags);

        const selectedTagIds = Object.keys(record.params)
          .filter((key) => key.startsWith(`${property.name}.`))
          .map((key) => record.params[key]);

        const initialSelectedTags = formattedTags.filter((tag) =>
          selectedTagIds.includes(tag.value)
        );
        setSelectedTags(initialSelectedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (selected) => {
    setSelectedTags(selected);
    const selectedIds = selected.map((tag) => tag.value);
    onChange(property.name, selectedIds);
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedTags}
      onChange={handleChange}
      placeholder="Select tags..."
    />
  );
};

export default TagSelect;
