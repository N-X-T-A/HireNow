import React from 'react'

function Show(props) {
    const { record, property } = props
    const image_url = record?.params[property.name]
    if (!image_url) return <span>No image</span>
    return (
        <div>
            <img
                src={image_url}
                alt='show'
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                className='show-image'
            />
        </div>
    )
}

export default Show
