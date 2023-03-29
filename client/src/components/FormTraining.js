import React, { useState } from 'react';
import { Field, FieldSelect, DivChamp, TextAera } from './FieldsForm.js';
import { DivError, Button } from './FormLogin.js';
import { useActionData, useLoaderData, Form } from 'react-router-dom';
import styled from 'styled-components';

export const FormTraining = () => {
    const loaderData = useLoaderData();
    const typeOfTraining = loaderData.typeOfTraining?.data;
    const training = loaderData.training?.data;
    const errors = useActionData();
    const [showMore, setShowMore] = useState(false);
    const [idTypeOfTraining, setIdTypeOfTraining] = useState(training?.idTypeOfTraining || '');
    const [name, setName] = useState(training?.name || '');
    const [along, setAlong] = useState(training?.along || '');
    const [date, setDate] = useState(training?.date || '');
    const [city, setCity] = useState(training?.city || '');
    const [country, setCountry] = useState(training?.country || '');
    const [note, setNote] = useState(training?.note || '');
    const [km, setKm] = useState(training?.km || '');
    const [moyPerKm, setMoyPerKm] = useState(training?.moyPerKm || '');
    const [speedMoy, setSpeedMoy] = useState(training?.speedMoy || '');
    const [speedMax, setSpeedMax] = useState(training?.speedMax || '');
    const [fcMoy, setFcMoy] = useState(training?.fcMoy || '');
    const [fcMax, setFcMax] = useState(training?.fcMax || '');
    const [hikeUp, setHikeUp] = useState(training?.hikeUp || '');
    const [hikeDown, setHikeDown] = useState(training?.hikeDown || '');
    const [cadenceMoy, setCadenceMoy] = useState(training?.cadenceMoy || '');
    const [cadenceMax, setCadenceMax] = useState(training?.cadenceMax || '');
    const [moyForSwim, setMoyForSwim] = useState(training?.moyForSwim || '');

    const showMoreOptions = () => {
        setShowMore(!showMore);
    };

    return (
        <>
            <Form method="post">
                <DivDouble>
                    <FieldSelect
                        type={'select'}
                        label={'Type de séance'}
                        name={'idTypeOfTraining'}
                        id={'idTypeOfTraining-id'}
                        value={idTypeOfTraining}
                        required={true}
                        setValue={setIdTypeOfTraining}
                        listOptions={typeOfTraining}
                    />
                    <Field
                        label={'Date de la séance'}
                        type={'date'}
                        name={'date'}
                        id={'date-id'}
                        value={date}
                        setValue={setDate}
                        required={true}
                    />
                </DivDouble>
                <DivError>
                    {errors?.date && <span>{errors.date}</span>}
                    {errors?.idTypeOfTraining && <span>{errors.idTypeOfTraining}</span>}
                </DivError>
                <DivDouble>
                    <Field
                        label={'Nom de la séance'}
                        name={'name'}
                        id={'name-id'}
                        value={name}
                        setValue={setName}
                        required={true}
                        placeHolder={'Course à pied'}
                    />

                    <Field
                        type={'time'}
                        label={'Durée de la séance'}
                        name={'along'}
                        id={'along-id'}
                        value={along}
                        setValue={setAlong}
                        placeHolder={'00:00:00'}
                    />
                </DivDouble>
                <DivError>{errors?.name && <span>{errors.name}</span>}</DivError>
                <DivError>{errors?.along && <span>{errors.along}</span>}</DivError>
                <DivDouble>
                    <Field
                        type={'text'}
                        label={'Lieu de la séance'}
                        name={'city'}
                        id={'city-id'}
                        value={city}
                        setValue={setCity}
                        placeHolder={'Paris'}
                    />

                    <Field
                        type={'text'}
                        label={'Pays'}
                        name={'country'}
                        id={'country-id'}
                        value={country}
                        setValue={setCountry}
                        placeHolder={'France'}
                    />
                </DivDouble>
                <DivError>{errors?.city && <span>{errors.city}</span>}</DivError>
                <DivError>{errors?.country && <span>{errors.country}</span>}</DivError>
                <TextAera
                    label={'Note'}
                    name={'note'}
                    id={'note-id'}
                    value={note}
                    setValue={setNote}
                    placeHolder={'Retour sur la séance...'}
                    rows={5}
                    cols={33}
                />
                <DivError>{errors?.note && <span>{errors.note}</span>}</DivError>
                <ButtonOption
                    onClick={(e) => {
                        e.preventDefault();
                        showMoreOptions();
                    }}
                >
                    Ajouter plus d'option
                </ButtonOption>

                {showMore && (
                    <>
                        {optionForDistance(km, moyPerKm, setKm, setMoyPerKm, errors)}
                        {optionForSpeed(speedMoy, speedMax, setSpeedMoy, setSpeedMax, errors)}
                        {optionForHeartRate(fcMoy, fcMax, setFcMoy, setFcMax, errors)}
                        {optionForHike(hikeUp, hikeDown, setHikeUp, setHikeDown, errors)}
                        {optionForCadence(
                            cadenceMoy,
                            cadenceMax,
                            setCadenceMoy,
                            setCadenceMax,
                            errors
                        )}
                        {optionForSwim(moyForSwim, setMoyForSwim, errors)}
                    </>
                )}

                <DivChamp>
                    <DivError>
                        {errors?.error?.message && (
                            <>
                                <span> {errors.error.message}</span>
                                <span>Le champ {errors.error.champ} ne peut pas être vide.</span>
                            </>
                        )}
                    </DivError>
                    <Button type="submit">Ajouter</Button>
                </DivChamp>
            </Form>
        </>
    );
};

const optionForDistance = (km, moyPerKm, setKm, setMoyPerKm, errors) => {
    return (
        <>
            <DivDouble>
                <Field
                    type={'float'}
                    label={'Distance parcourue'}
                    name={'km'}
                    id={'km-id'}
                    value={km}
                    setValue={setKm}
                    placeHolder={'14.2'}
                />

                <Field
                    type={'time'}
                    label={'Moyenne par km'}
                    name={'moyPerKm'}
                    id={'moyPerKm-id'}
                    value={moyPerKm}
                    setValue={setMoyPerKm}
                    placeHolder={'00:05:10'}
                />
            </DivDouble>
            <DivError>{errors?.km && <span>{errors.km}</span>}</DivError>
            <DivError>{errors?.moyPerKm && <span>{errors.moyPerKm}</span>}</DivError>
        </>
    );
};
const optionForSpeed = (speedMoy, speedMax, setSpeedMoy, setSpeedMax, errors) => {
    return (
        <>
            <DivDouble>
                <Field
                    type={'float'}
                    label={'Vitesse moyenne'}
                    name={'speedMoy'}
                    id={'speedMoy-id'}
                    value={speedMoy}
                    setValue={setSpeedMoy}
                    placeHolder={'20.2'}
                />

                <Field
                    type={'float'}
                    label={'Moyenne par km'}
                    name={'speedMax'}
                    id={'speedMax-id'}
                    value={speedMax}
                    setValue={setSpeedMax}
                    placeHolder={'30.4'}
                />
            </DivDouble>
            <DivError>{errors?.speedMoy && <span>{errors.speedMoy}</span>}</DivError>
            <DivError>{errors?.speedMax && <span>{errors.speedMax}</span>}</DivError>
        </>
    );
};
const optionForHeartRate = (fcMoy, fcMax, setFcMoy, setFcMax, errors) => {
    return (
        <>
            <DivDouble>
                <Field
                    type={'number'}
                    label={'Fréquence cardiaque moyenne'}
                    name={'fcMoy'}
                    id={'fcMoy-id'}
                    value={fcMoy}
                    setValue={setFcMoy}
                    placeHolder={'150'}
                />

                <Field
                    type={'number'}
                    label={'Fréquence cardiaque max'}
                    name={'fcMax'}
                    id={'fcMax-id'}
                    value={fcMax}
                    setValue={setFcMax}
                    placeHolder={'198'}
                />
            </DivDouble>
            <DivError>{errors?.fcMax && <span>{errors.fcMax}</span>}</DivError>
            <DivError>{errors?.fcMoy && <span>{errors.fcMoy}</span>}</DivError>
        </>
    );
};

const optionForHike = (hikeUp, hikeDown, setHikeUp, setHikeDown, errors) => {
    return (
        <>
            <DivDouble>
                <Field
                    type={'number'}
                    label={'Dénivelé positf'}
                    name={'hikeUp'}
                    id={'hikeUp-id'}
                    value={hikeUp}
                    setValue={setHikeUp}
                    placeHolder={'950'}
                />

                <Field
                    type={'number'}
                    label={'Dénivelé négatif'}
                    name={'hikeDown'}
                    id={'hikeDown-id'}
                    value={hikeDown}
                    setValue={setHikeDown}
                    placeHolder={'198'}
                />
            </DivDouble>
            <DivError>{errors?.hikeUp && <span>{errors.hikeUp}</span>}</DivError>
            <DivError>{errors?.hikeDown && <span>{errors.hikeDown}</span>}</DivError>
        </>
    );
};

const optionForCadence = (cadenceMoy, cadenceMax, setCadenceMoy, setCadenceMax, errors) => {
    return (
        <>
            <DivDouble>
                <Field
                    type={'number'}
                    label={'Cadence moyenne'}
                    name={'cadenceMoy'}
                    id={'cadenceMoy-id'}
                    value={cadenceMoy}
                    setValue={setCadenceMoy}
                    placeHolder={'90'}
                />

                <Field
                    type={'number'}
                    label={'Cadence max'}
                    name={'cadenceMax'}
                    id={'cadenceMax-id'}
                    value={cadenceMax}
                    setValue={setCadenceMax}
                    placeHolder={'110'}
                />
            </DivDouble>
            <DivError>{errors?.cadenceMoy && <span>{errors.cadenceMoy}</span>}</DivError>
            <DivError>{errors?.cadenceMax && <span>{errors.cadenceMax}</span>}</DivError>
        </>
    );
};

const optionForSwim = (moyForSwim, setMoyForSwim, errors) => {
    return (
        <>
            <Field
                type={'time'}
                label={'Moyenne par 100m'}
                name={'moyForSwim'}
                id={'moyForSwim-id'}
                value={moyForSwim}
                setValue={setMoyForSwim}
                placeHolder={'00:01:30'}
                min={'00:00:00'}
                max={'00:10:00'}
            />

            <DivError>{errors?.moyForSwim && <span>{errors.moyForSwim}</span>}</DivError>
        </>
    );
};

const DivDouble = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (max-width: 768px) {
        justify-content: flex-start;
        flex-direction: rows;
    }
`;
const ButtonOption = styled.button`
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #000;
        color: #fff;
    }
`;
