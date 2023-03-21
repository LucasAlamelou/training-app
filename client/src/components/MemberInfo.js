import React from 'react';
import styled from 'styled-components';

export const MemberInfo = ({ label, data, multiFiedls }) => {
    return (
        <>
            {multiFiedls ? (
                <Field label={label} data={data.join(' ')} />
            ) : (
                <Field label={label} data={data} />
            )}
        </>
    );
};

const Field = ({ label, data }) => {
    return (
        <>
            <MemberField>
                <TitleField>{label}</TitleField>
                <DataField>{data}</DataField>
            </MemberField>
        </>
    );
};

const MemberField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 0.5rem;
    border: 0.1px solid #0554f2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.7rem;
    width: 250px;
    height: 150px;
`;

const TitleField = styled.p`
    font-size: 1.5rem;
    font-weight: 600;
    color: #0554f2;
`;

const DataField = styled.p`
    margin-top: 0.2rem;
    margin-bottom: 1rem;
`;
