import React from 'react';
import styled from 'styled-components';

export const MemberInfo = ({ label, data, multiFiedls, name, functionOnClick, isModify }) => {
    if (isModify) {
        return (
            <>
                {multiFiedls ? (
                    <FieldModify
                        label={label}
                        data={data.join(' ')}
                        name={name}
                        functionOnClick={functionOnClick}
                    />
                ) : (
                    <FieldModify
                        label={label}
                        data={data}
                        name={name}
                        functionOnClick={functionOnClick}
                    />
                )}
            </>
        );
    }
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

const FieldModify = ({ label, data, functionOnClick, name }) => {
    return (
        <>
            <MemberFieldModify name={name} onClick={(e) => functionOnClick(e)}>
                <TitleField>{label}</TitleField>
                <DataField>{data}</DataField>
            </MemberFieldModify>
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

const MemberFieldModify = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 0.5rem;
    border: 0.1px solid #0554f2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.7rem;
    width: 250px;
    height: 150px;
    cursor: pointer;
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
