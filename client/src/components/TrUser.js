import React from 'react';
import styled from 'styled-components';
import { TdField } from './TdField.js';
import { ButtonsPanelActions } from './ButtonsPanelActions.js';

export const TrUser = ({ user, deleteUser }) => {
    return (
        <>
            <Tr>
                <TdField field={user.id} />
                <TdField field={user.email} />
                <TdField field={user.roles} />
                <ButtonsPanelActions
                    displayDelete={true}
                    idTarget={user.id}
                    linkAction={'/admin/user'}
                    functionClick={deleteUser}
                    displayShowMore={true}
                />
            </Tr>
        </>
    );
};

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;
