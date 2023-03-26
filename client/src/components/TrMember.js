import React from 'react';
import styled from 'styled-components';
import { TdField } from './TdField.js';
import { ButtonsPanelActions } from './ButtonsPanelActions.js';

export const TrMember = ({ member, deleteMember }) => {
    return (
        <>
            <Tr>
                <TdField field={member.id} />
                <TdField field={member.lastName} />
                <TdField field={member.firstName} />
                <TdField field={new Date(member?.dateOfBirth).toLocaleDateString('fr-FR')} />
                <TdField field={member.favoriteSport} />
                <TdField field={member.userId} />
                <ButtonsPanelActions
                    idTarget={member.id}
                    linkAction={'/admin/member'}
                    functionClick={deleteMember}
                    displayShowMore={false}
                />
            </Tr>
        </>
    );
};

const Tr = styled.tr`
    height: 2rem;
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;
