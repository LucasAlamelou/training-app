import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Navigate, useLoaderData } from 'react-router-dom';
import { MemberInfo } from '../components/MemberInfo.js';
import { ButtonMember } from '../components/ButtonMember.js';
import { faHeartbeat, faRunning, faUser } from '@fortawesome/free-solid-svg-icons';

const UTILISATEUR = 'Utilisateur';
const HEALTH = 'Santé';
const PERFORMANCE = 'Performance';

export const MemberPage = () => {
    const data = useLoaderData();
    const member = data?.member;
    const [viewMember, setViewMember] = React.useState(true);
    const [viewHealth, setViewHealth] = React.useState(false);
    const [viewPerformance, setViewPerformance] = React.useState(false);

    if (!member) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Une erreur est survenu lors de la récupération des données, vous allez etre redirigé vers la page d'accueil",
            showConfirmButton: false,
            timer: 1500,
        });
        return <Navigate to="/home" replace={false} />;
    }
    const onClickRenderView = (e) => {
        switch (e.target.name) {
            case UTILISATEUR:
                setViewMember(true);
                setViewHealth(false);
                setViewPerformance(false);
                break;
            case HEALTH:
                setViewMember(false);
                setViewHealth(true);
                setViewPerformance(false);
                break;
            case PERFORMANCE:
                setViewMember(false);
                setViewHealth(false);
                setViewPerformance(true);
                break;
            default:
                setViewMember(true);
                setViewHealth(false);
                setViewPerformance(false);
                break;
        }
    };

    return (
        <>
            <H3>Votre profil :</H3>
            <DivButton>
                <ButtonMember
                    label={UTILISATEUR}
                    functionClick={onClickRenderView}
                    isActive={viewMember}
                    favicon={faUser}
                />

                <ButtonMember
                    label={HEALTH}
                    functionClick={onClickRenderView}
                    isActive={viewHealth}
                    favicon={faHeartbeat}
                />

                <ButtonMember
                    label={PERFORMANCE}
                    functionClick={onClickRenderView}
                    isActive={viewPerformance}
                    favicon={faRunning}
                />
            </DivButton>
            {viewMember && (
                <DivMember>
                    <MemberInfo label="Nom" data={member.lastName} />
                    <MemberInfo label="Prénom" data={member.firstName} />
                    <MemberInfo
                        label="Adresse"
                        data={[member.adress, member.zipCode, member.city]}
                        multiFiedls={true}
                    />
                    <MemberInfo label="Sport pratiqué" data={member.favoriteSport} />
                </DivMember>
            )}
            {viewHealth && (
                <DivMember>
                    <MemberInfo label="Poids (en kg)" data={member.weight + ' kg'} />
                    <MemberInfo label="Taille (en cm)" data={member.height + ' cm'} />
                    <MemberInfo label="Heure de sommeil" data={member.hourSleep} />
                    <MemberInfo label="Fc repos" data={member.fcRest + ' bpm'} />
                    <MemberInfo label="Fc max" data={member.fcMax + ' bpm'} />
                </DivMember>
            )}
            {viewPerformance && (
                <DivMember>
                    <MemberInfo label="VO2max" data={member.vo2max + ' ml/kg/min'} />
                    <MemberInfo label="Seuil lactique(Bpm)" data={member.seuilLactateFC + ' bpm'} />
                    <MemberInfo label="Seuil lactique (min/km)" data={member.seuilLactate} />
                    <MemberInfo label="VMA" data={member.vma + ' km/h'} />
                </DivMember>
            )}
        </>
    );
};

const DivMember = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-top: 5rem;
    padding: 1rem;
`;

const DivButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #0554f2;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-top: 1rem;
    padding: 1rem;
`;

const H3 = styled.h3`
    font-size: 2rem;
    font-weight: 600;
    color: #0554f2;
    text-align: center;
    margin-top: 2rem;
`;
