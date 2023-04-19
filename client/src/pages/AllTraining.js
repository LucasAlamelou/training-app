import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Link, useLoaderData, useSubmit } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { trainingActions } from '../store/index.js';
import { FieldTraining } from '../components/FieldTraining.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from '../components/Pagination.js';
import { DisplayOneTraining } from '../components/DisplayOneTraining.js';
import { ButtonMember } from '../components/ButtonMember.js';
import { faPersonRunning, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FilterRecap } from '../components/FilterRecap.jsx';
import { logoutUser, setUserNotConnected } from '../util/LogoutUser.js';
import { DEVICE_WIDTH } from '../util/SizeDevice.js';

const PageSize = 5;

export const AllTraining = ({ isUniqueTraining }) => {
    let submit = useSubmit();
    const dispatch = useDispatch();
    const data = useLoaderData();
    const [currentPage, setCurrentPage] = useState(1);
    const [viewTraining, setViewTraining] = useState(true);
    const trainingList = data?.training?.data;
    const { trainingListState } = useSelector((state) => state.training);

    useEffect(() => {
        setUserNotConnected(data, dispatch);
    }, [data, dispatch]);

    if (data) {
        logoutUser(data, dispatch);
        if (trainingList?.length > 0) {
            dispatch(trainingActions.addAllTraining({ training: trainingList }));
        }
    }

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        if (trainingListState?.length > 0) {
            return trainingListState.slice(firstPageIndex, lastPageIndex);
        }
        return [];
    }, [currentPage, trainingListState]);

    const confirmDeleteTraining = (idTraining) => {
        let isDelete = false;
        Swal.fire({
            title: 'Vous êtes sur de vouloir supprimer?',
            text: 'Vous ne pouvez pas revenir en arrière!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-le!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                isDelete = true;
                submit(
                    { idTraining: idTraining },
                    {
                        method: 'post',
                        action: '/my-training',
                    }
                );
                Swal.fire('Supprimer!', 'Votre entrainement a été supprimer.', 'success');
            }
        });
        if (isDelete) {
            dispatch(trainingActions.removeTrainingById({ idTraining: idTraining }));
        }
    };

    const changeView = (e) => {
        setViewTraining(!viewTraining);
    };
    const headerTable = ['Nom', 'Distance', 'Temps', 'Date', 'Notes', 'Lieu', 'Actions'];
    return (
        <>
            {isUniqueTraining ? (
                <DisplayOneTraining deleteTraining={confirmDeleteTraining} />
            ) : data?.error ? (
                <>
                    <H3Error style={{ color: 'red' }}>
                        {data.error.message}... rien à afficher veuillez vous reconnectez.
                    </H3Error>
                    <DivButton center={true}>
                        <Link
                            to="/login"
                            style={{
                                color: 'black',
                                margin: '0 auto',
                                height: '100%',
                                width: '100%',
                                hover: 'text-decoration: underline',
                            }}
                        >
                            {'Se connecter'.toUpperCase()}
                            <FontAwesomeIcon
                                icon={faUser}
                                color="black"
                                style={{ marginLeft: '10px' }}
                            />
                        </Link>
                    </DivButton>
                </>
            ) : (
                <>
                    <H2>Mes entrainements</H2>
                    <DivButton center={true}>
                        <ButtonMember
                            label="Entrainements"
                            functionClick={changeView}
                            favicon={faPersonRunning}
                            isActive={viewTraining}
                        />
                        <ButtonMember
                            label="Statistiques"
                            functionClick={changeView}
                            favicon={faChartSimple}
                            isActive={!viewTraining}
                        />
                    </DivButton>
                    <DivButton>
                        <Link to="/my-training/new" style={{ color: 'black' }}>
                            <p>Ajouter un entrainement</p>
                            <FontAwesomeIcon icon={faPlusCircle} color="black"></FontAwesomeIcon>
                        </Link>
                    </DivButton>

                    {viewTraining ? (
                        <TrainingContainer>
                            <Thead>
                                <HeaderTable>
                                    {headerTable.map((header) => {
                                        return (
                                            <Th key={header} datalabel={header}>
                                                {header}
                                            </Th>
                                        );
                                    })}
                                </HeaderTable>
                            </Thead>
                            <Tbody>
                                {currentTableData.map((training, index) => {
                                    return (
                                        <FieldTraining
                                            training={training}
                                            key={training.idTraining}
                                            deleteTraining={confirmDeleteTraining}
                                            content={headerTable}
                                        />
                                    );
                                })}
                            </Tbody>
                            <Tfoot>
                                <Pagination
                                    className="pagination-bar"
                                    currentPage={currentPage}
                                    totalCount={trainingList ? trainingList.length : 0}
                                    pageSize={PageSize}
                                    onPageChange={(page) => setCurrentPage(page)}
                                    key={'pagination-bar'}
                                />
                            </Tfoot>
                        </TrainingContainer>
                    ) : (
                        <>
                            <FilterRecap />
                        </>
                    )}
                </>
            )}
        </>
    );
};

const TrainingContainer = styled.table`
    width: 80%;
    background-color: #fff;
    border: 2px solid #0554f2;
    border-collapse: collapse;
    overflow-x: auto;
    margin: 0 auto;
    @media ${DEVICE_WIDTH.tablet} {
        display: table;
        width: 90%;
        height: 90%;
        max-height: 90%;
        margin: 0 auto;
        margin-top: 2rem;
    }
`;

const HeaderTable = styled.tr`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-top: 1.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
    @media ${DEVICE_WIDTH.tablet} {
        display: table-row;
    }
`;

const Tfoot = styled.tfoot`
    margin: 0 auto;
    margin-top: 1.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
`;

const H2 = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #000;

    @media ${DEVICE_WIDTH.tablet} {
        font-size: 2rem;
        margin-top: 2rem;
    }
`;

const Thead = styled.thead`
    display: none;
    flex-direction: column;
    height: 250px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #000;
    border-collapse: collapse;
    overflow-x: auto;
    > th {
        display: block;
        align-items: center;
        margin: 0 auto;
        margin-top: 1.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    @media ${DEVICE_WIDTH.tablet} {
        display: table;
        width: 90%;
        height: 90%;
        max-height: 90%;
        margin: 0 auto;
        margin-top: 2rem;

        > th {
            display: table-row;
        }
    }
`;

const Tbody = styled.tbody`
    background-color: #fff;
    border-collapse: collapse;
    overflow-x: auto;
    @media ${DEVICE_WIDTH.tablet} {
        display: table;
        width: 90%;
        height: 90%;
        max-height: 90%;
        border: 1px solid #000;
        margin: 0 auto;
        margin-top: 2rem;
    }
`;

const Th = styled.th`
    padding: 1rem;
`;

const DivButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => (props.center ? 'center' : 'flex-end')};
    align-items: center;
    > a {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
        padding: 0.5rem;
        > p {
            margin-right: 0.5rem;
        }
    }
    @media ${DEVICE_WIDTH.tablet} {
        flex-direction: row;
    }
`;

const H3Error = styled.h3`
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6rem;
`;
