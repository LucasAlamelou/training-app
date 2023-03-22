import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FieldSelect } from './FieldsForm';
import { getListDay, getListMonth, getListYear } from '../util/DateUtils.js';
import { API_call } from '../contexts/API_call.js';
import { MemberInfo } from './MemberInfo.js';
import { useSelector } from 'react-redux';

export const FilterRecap = () => {
    const user = useSelector((x) => x.user);
    const idMember = user.member;
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [day, setDay] = useState(new Date().getDate());
    const [listDay, setListDay] = useState(getListDay(month, year));
    const [along, setAlong] = useState('00:00:00');
    const [km, setKm] = useState(0);
    const [fcMoy, setFcMoy] = useState(0);
    const [fcMax, setFcMax] = useState(0);
    const [speedMoy, setSpeedMoy] = useState(0);
    const [hikeUp, setHikeUp] = useState(0);
    const [hikeDown, setHikeDown] = useState(0);

    useEffect(() => {
        async function getRecap() {
            const params = { idMember, year, month, day };
            const result = await API_call(`recapitualtif/all`, 'GET', params);
            const { total_training, km_total, fc_moy, fc_max, speed_moy, hike_up, hike_down } =
                result.info?.data;

            if (!total_training) {
                setAlong('00:00:00');
            } else {
                setAlong(total_training);
            }
            if (!km_total) {
                setKm(0);
            } else {
                setKm(km_total);
            }
            if (!fc_moy) {
                setFcMoy(0);
            } else {
                setFcMoy(parseInt(fc_moy));
            }
            if (!fc_max) {
                setFcMax(0);
            } else {
                setFcMax(fc_max);
            }
            if (!speed_moy) {
                setSpeedMoy(0);
            } else {
                setSpeedMoy(speed_moy);
            }
            if (!hike_up) {
                setHikeUp(0);
            } else {
                setHikeUp(hike_up);
            }
            if (!hike_down) {
                setHikeDown(0);
            } else {
                setHikeDown(hike_down);
            }
        }
        getRecap();
    }, [year, month, day, idMember]);

    useEffect(() => {
        setListDay(getListDay(parseInt(month), parseInt(year)));
    }, [month, year]);

    return (
        <>
            <DivFieldSelect>
                <FieldSelect
                    id="year"
                    name="year"
                    value={year}
                    setValue={setYear}
                    label="Année"
                    listOptions={getListYear()}
                />
                <FieldSelect
                    id="month"
                    name="month"
                    value={month}
                    setValue={setMonth}
                    label="Mois"
                    listOptions={getListMonth()}
                />
                <FieldSelect
                    id="day"
                    name="day"
                    value={day}
                    setValue={setDay}
                    label="Jour"
                    listOptions={listDay}
                />
            </DivFieldSelect>
            <DivData>
                <MemberInfo label={'Total Km'} data={[km, 'km']} multiFiedls={true} />
                <MemberInfo label={'Total Heures'} data={along} />
                <MemberInfo label={'Fc moyenne'} data={[fcMoy, 'bpm']} multiFiedls={true} />
                <MemberInfo label={'Fc max(atteint)'} data={[fcMax, 'bpm']} multiFiedls={true} />
                <MemberInfo
                    label={'Vitesse moyenne'}
                    data={[speedMoy, 'km/h']}
                    multiFiedls={true}
                />
                <MemberInfo label={'Dénivelé postif'} data={[hikeUp, 'd+']} multiFiedls={true} />
                <MemberInfo label={'Dénivelé négatif'} data={[hikeDown, 'd-']} multiFiedls={true} />
            </DivData>
        </>
    );
};

const DivFieldSelect = styled.div`
    display: flex;
    align-items: center;
    max-width: 25%;
    margin-left: 0.3rem;
    padding: 0.5rem;
    border: 1px solid #0554f2;
`;

const DivData = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-top: 5rem;
    padding: 1rem;
`;
