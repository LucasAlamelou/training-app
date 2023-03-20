import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Link, useLoaderData, useSubmit } from 'react-router-dom';
import { FieldTraining } from '../components/FieldTraining.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from '../components/Pagination.js';

const PageSize = 5;

export const AllTraining = () => {
    let submit = useSubmit();
    const data = useLoaderData();
    const [currentPage, setCurrentPage] = useState(1);
    const trainingList = data?.data;

    if (data?.error) {
        Swal.fire('Erreur!', 'Lors de la récupération des entrainements..', 'error');
    }
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        if (trainingList) {
            return trainingList.slice(firstPageIndex, lastPageIndex);
        }
        return [];
    }, [currentPage]);

    const confirmDeleteTraining = (training) => {
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
                submit(
                    { idTraining: training.idTraining },
                    {
                        method: 'post',
                        action: '/my-training',
                    }
                );
                Swal.fire('Supprimer!', 'Votre entrainement a été supprimer.', 'success');
            }
        });
    };

    return (
        <>
            {data?.error ? (
                <H3Error style={{ color: 'red' }}>
                    {data.error.message}... rien à afficher veuillez vous reconnectez.
                </H3Error>
            ) : (
                <>
                    <H2>Mes entrainements</H2>
                    <DivButton>
                        <Link to="/my-training/new" style={{ color: 'black' }}>
                            <p>Ajouter un entrainement</p>
                            <FontAwesomeIcon icon={faPlusCircle} color="black"></FontAwesomeIcon>
                        </Link>
                    </DivButton>

                    <TrainingContainer>
                        <thead>
                            <HeaderTable>
                                <Th>Nom</Th>
                                <Th>Distance</Th>
                                <Th>Temps</Th>
                                <Th>Commentaires</Th>
                                <Th>Lieu</Th>
                            </HeaderTable>
                        </thead>
                        <tbody>
                            {currentTableData.map((training) => {
                                return (
                                    <FieldTraining
                                        training={training}
                                        key={training.idTraining}
                                        deleteTraining={confirmDeleteTraining}
                                    />
                                );
                            })}
                        </tbody>
                        <Tfoot>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={trainingList ? trainingList.length : 0}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </Tfoot>
                    </TrainingContainer>
                </>
            )}
        </>
    );
};

const TrainingContainer = styled.table`
    width: 90%;
    height: 90%;
    max-height: 90%;
    margin: 0 auto;
    margin-top: 2rem;
    background-color: #fff;
    border: 1px solid #000;
    border-collapse: collapse;
`;

const HeaderTable = styled.tr`
    align-items: center;
    margin: 0 auto;
    margin-top: 1.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
`;

const Tfoot = styled.tfoot`
    margin: 0 auto;
    margin-top: 1.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
`;

const H2 = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #000;
    margin-top: 1rem;
    margin-left: 50%;
    transform: translateX(-25%);
`;

const Th = styled.th`
    padding: 1rem;
`;

const DivButton = styled.div`
    display: flex;
    justify-content: end;
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
`;

const H3Error = styled.h3`
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6rem;
`;
