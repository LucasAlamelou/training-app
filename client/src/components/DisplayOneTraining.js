import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Link, useLoaderData } from 'react-router-dom';
import { ButtonsPanelActions } from './ButtonsPanelActions.js';

export const DisplayOneTraining = ({ deleteTraining }) => {
    const data = useLoaderData();
    const training = data?.data;
    const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
    if (data?.error) {
        Swal.fire('Erreur!', "Lors de la récupération de l'entrainement..", 'error');
    }

    return (
        <>
            {data?.error ? (
                <H3Error style={{ color: 'red' }}>
                    {data.error.message}... rien à afficher veuillez vous reconnectez.
                </H3Error>
            ) : (
                <TrainingContainer>
                    <ButtonBack>
                        <Link to={'/my-training'}>
                            {/* TODO a styliser en css button retour la page des entrainements
                             */}
                            Retour
                        </Link>
                    </ButtonBack>
                    <H2>
                        {training.name} - {training.nameSport}
                    </H2>
                    <DivButtons>
                        <ButtonsPanelActions
                            idTarget={training.idTraining}
                            functionClick={deleteTraining}
                            linkAction={'/training'}
                            displayShowMore={true}
                        />
                    </DivButtons>

                    <Grid>
                        <DisplayData title="Durée" donnee={training.along} />
                        <DisplayData title="Distance" donnee={training.km} />
                        <DisplayData
                            title="Date"
                            donnee={new Date(training.date).toLocaleString('FR-fr', optionsDate)}
                        />
                        <DisplayData title="Fc moyenne" donnee={training.fcMoy} />
                        <DisplayData title="Fc max" donnee={training.fcMax} />
                        <DisplayData title="Sport" donnee={training.nameSport} />
                        <DisplayData title="Moyenne par km" donnee={training.moyPerKm} />
                        <DisplayData title="Vitesse moyenne" donnee={training.speedMoy} />
                        <DisplayData title="Vitesse max" donnee={training.speedMax} />
                        <DisplayData title="Denivelé positif" donnee={training.hikeUp} />
                        <DisplayData title="Denivelé négatif" donnee={training.hikeDown} />
                    </Grid>
                </TrainingContainer>
            )}
        </>
    );
};

const DisplayData = ({ title, donnee }) => {
    return (
        <>
            <Info>
                <h3>{title}</h3>
                <p>{donnee != null ? donnee : '-'}</p>
            </Info>
        </>
    );
};

const TrainingContainer = styled.div`
    width: 90%;
    height: 90%;
    max-height: 90%;
    margin: 0 auto;
    margin-top: 2rem;
    background-color: #fff;
    border: 1px solid #000;
    border-collapse: collapse;
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid lightgray;
`;

const H2 = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #000;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
`;

const DivButtons = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
`;

const ButtonBack = styled.button`
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: #6bb3f2;
        color: #fff;
    }
    > a {
        color: #0554f2;
        font-weight: 700;
        text-transform: uppercase;
    }
`;

const H3Error = styled.h3`
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6rem;
`;
