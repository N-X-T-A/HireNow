import React, { useEffect, useState } from "react";
import { ApiClient } from "adminjs";

const api = new ApiClient();

const TagList = (props) => {
  const { record, property } = props;
  const [tagNames, setTagNames] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.resourceAction({
          resourceId: "tag",
          actionName: "list",
        });

        const tags = response.data.records;
        const tagMap = tags.reduce((acc, tag) => {
          acc[tag.params._id] = tag.params.name;
          return acc;
        }, {});

        const tagIds = Object.keys(record.params)
          .filter((key) => key.startsWith(`${property.name}.`))
          .map((key) => record.params[key]);

        console.log("Extracted Tag IDs:", tagIds);

        const names = tagIds.map((id) => tagMap[id]).filter(Boolean);
        setTagNames(names);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [record, property.name]);

  if (!tagNames.length) return <span>No tags</span>;

  return (
    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
      {tagNames.map((name, index) => (
        <span
          key={index}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "2px 8px",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
};

export default TagList;
