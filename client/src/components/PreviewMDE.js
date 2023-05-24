import React from 'react';
import Markdown from 'markdown-to-jsx';

export const PreviewMDE = ({ content, options }) => {
    return <Markdown options={options}>{content}</Markdown>;
};
