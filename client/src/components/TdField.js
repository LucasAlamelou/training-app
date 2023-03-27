import React from 'react';
import styled from 'styled-components';

/**
 * Pour tableau coté admin
 * @param {Object} props
 */
export const TdField = ({ field }) => {
    return (
        <>
            <Td>{field}</Td>
        </>
    );
};

const Td = styled.td`
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #0554f2;
`;
