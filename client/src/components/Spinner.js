import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader.js';

export const Spinner = ({ loading }) => {
    let [color, setColor] = useState('#6bb3f2');
    return <ClipLoader color={color} cssOverride={{}} loading={loading} size={120} />;
};
