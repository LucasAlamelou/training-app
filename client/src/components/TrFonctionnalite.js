import React, { useState } from 'react';
import styled from 'styled-components';
import { useSubmit } from 'react-router-dom';
import { TdField } from './TdField.js';
import { ButtonsPanelActions } from './ButtonsPanelActions.js';
import { convertDateToFrenchDate } from '../util/DateUtils.js';
import { Switch } from '@mui/material';
import { ACTION_SET_ACTIVE_FONCTIONNALITE } from '../pages/AdminPage.js';

export const TrFonctionnalite = ({ fonctionnalite, deleteFonctionnalite }) => {
    const [fonctionnaliteActive, setFonctionnaliteActive] = useState(
        fonctionnalite.isActive ? true : false
    );
    const submit = useSubmit();
    const onChangeFonctionnaliteActive = (e) => {
        setFonctionnaliteActive(e.target.checked);
        const action = ACTION_SET_ACTIVE_FONCTIONNALITE;
        submit(
            { id: fonctionnalite.id, isActive: e.target.checked ? 1 : 0, actionMethod: action },
            { method: 'put', action: 'admin' }
        );
    };
    return (
        <>
            <Tr>
                <TdField field={fonctionnalite.id} />
                <TdField field={fonctionnalite.name} />
                <TdField
                    field={
                        <Switch
                            checked={fonctionnaliteActive}
                            onChange={onChangeFonctionnaliteActive}
                            color="info"
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                />

                <TdField field={convertDateToFrenchDate(fonctionnalite.date)} />
                <TdField
                    field={
                        fonctionnalite.updateDate
                            ? convertDateToFrenchDate(fonctionnalite.updateDate)
                            : 'N/A'
                    }
                />
                <ButtonsPanelActions
                    idTarget={fonctionnalite.id}
                    linkAction={'/admin/fonctionnalite'}
                    functionClick={deleteFonctionnalite}
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
