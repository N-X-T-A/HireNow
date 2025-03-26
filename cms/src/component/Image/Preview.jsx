import React from 'react';

function Display(props) {
    const { record, property } = props;
    const image_url = record?.params[property.name];

    if (!image_url) return <span>No image</span>;

    return (
        <img
            src={image_url}
            alt="preview"
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
        />
    );
}

export default Display;
