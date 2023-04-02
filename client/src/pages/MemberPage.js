import React, { useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { DEVICE_WIDTH } from '../util/SizeDevice.js';
import { useLoaderData } from 'react-router-dom';
import { MemberInfo } from '../components/MemberInfo.js';
import { ButtonMember } from '../components/ButtonMember.js';
import { faHeartbeat, faRunning, faUser } from '@fortawesome/free-solid-svg-icons';
import { logoutUser, setUserNotConnected } from '../util/LogoutUser.js';
import { useSelector, useDispatch } from 'react-redux';
import { memberActions } from '../store/member-slice.js';
import { ActionFormMember } from '../util/ActionForm.js';
import { convertDateToFrenchDate } from '../util/DateUtils.js';
import { onModifyPassword } from '../util/EditPassword.js';

const UTILISATEUR = 'Utilisateur';
const HEALTH = 'Santé';
const PERFORMANCE = 'Performance';

export const MemberPage = ({ isAdmin }) => {
    const data = useLoaderData();
    const dispatch = useDispatch();
    const member = data?.member;
    const { memberState } = useSelector((state) => state.member);
    const { user } = useSelector((state) => state);
    const [memberStateList, setMemberStateList] = React.useState({});
    const [viewMember, setViewMember] = React.useState(true);
    const [viewHealth, setViewHealth] = React.useState(false);
    const [viewPerformance, setViewPerformance] = React.useState(false);
    const [fieldModify, setFieldModify] = React.useState({});

    useEffect(() => {
        setUserNotConnected(data, dispatch);
    }, [data, dispatch]);

    if (!member && !memberState) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenu lors de la récupération des données...',
            showConfirmButton: false,
            timer: 2000,
        });
        logoutUser(data);
        // return <Navigate to="/login" replace={false} />;
    }

    if (member && Object.keys(memberState).length === 0) {
        console.log('dispatch');
        if (!isAdmin) {
            dispatch(memberActions.addMember({ member }));
            setMemberStateList(member);
        }
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

    const openModal = (e) => {
        const nameLabel = e.target.firstChild.outerText;
        const dataField = e.target.lastChild.outerText;
        const nameField = e.target.name;
        const arrayValue = dataField.split(' ');
        console.log(arrayValue);
        let html;
        if (nameField === 'password') {
            onModifyPassword(e, user);
            return;
        }
        if (nameField === 'adress') {
            html = `
            <div class="swal2-input-group">
                <label class="swal2-label" for="swal2-input">Adresse</label>
                <input class="swal2-input" id="swal2-input-adress" name="adress" value="">
            </div>
            <div class="swal2-input-group">
                <label class="swal2-label" for="swal2-input">Code postal</label>
                <input class="swal2-input" id="swal2-input-zipCode" name="zipCode" value="">
            </div>
            <div class="swal2-input-group">
                <label class="swal2-label" for="swal2-input">Ville</label>
                <input class="swal2-input" id="swal2-input-city" name="city" value="">
            </div>
            <div class="swal2-input-group">
                <label class="swal2-label" for="swal2-input">Pays</label>
                <input class="swal2-input" id="swal2-input-country" name="country" value="">
            </div>`;
        } else {
            html = `
            <div class="swal2-input-group">
            <label class="swal2-label" for="swal2-input">${nameLabel}</label>
            <input class="swal2-input" id="swal2-input-${nameField}" name="${nameField}" value="${
                arrayValue.length === 2 ? arrayValue[0] : dataField
            }">
            </div>`;
        }

        Swal.fire({
            title: 'Modification du champ : ' + nameLabel,
            html: html,
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Modifier',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                let data = {
                    idMember: memberState.id,
                };
                document.querySelectorAll('.swal2-input').forEach((input) => {
                    data[input.name] = input.value;
                });
                //const input = document.querySelector(`#swal2-input-${nameField}`);
                //data[nameField] = input.value;
                const result = await ActionFormMember(memberState, data);

                if (result.error) {
                    if (result?.error[nameField]) {
                        Swal.showValidationMessage(`${result.error[nameField]}`);
                    } else {
                        Swal.showValidationMessage(`${result.error.message}`);
                    }
                    return result;
                } else {
                    if (result?.infoChanged.changedRows > 0) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Modification réussie',
                            text: `Le champ ${nameLabel} a bien été modifié.`,
                            showConfirmButton: false,
                            timer: 2500,
                        });

                        setFieldModify({ [nameField]: data[nameField] });
                        return result;
                    }
                }
                return result;
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });
    };
    useEffect(() => {
        function onFetchMember() {
            dispatch(
                memberActions.modifyMember({
                    fieldModify,
                })
            );
            setMemberStateList(memberState);
        }
        onFetchMember();
    }, [dispatch, fieldModify]);

    return (
        <>
            <H3>Votre profil</H3>
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
                <>
                    <DivMember>
                        {isAdmin && (
                            <>
                                <MemberInfo
                                    label="Email"
                                    data={memberState ? memberState?.email : member?.email}
                                    name="email"
                                    functionOnClick={openModal}
                                    isModify={user?.isConnected ? true : false}
                                />
                                <MemberInfo
                                    label="Nb Entrainement"
                                    data={
                                        memberState ? memberState?.nbTraining : member?.nbTraining
                                    }
                                    name="nbTraining"
                                />
                            </>
                        )}
                        <MemberInfo
                            label="Nom"
                            data={memberState ? memberState?.lastName : member?.lastName}
                            name="lastName"
                            functionOnClick={openModal}
                            isModify={user?.isConnected ? true : false}
                        />
                        <MemberInfo
                            label="Prénom"
                            name="firstName"
                            data={memberState ? memberStateList?.firstName : member?.firstName}
                            functionOnClick={openModal}
                            isModify={user?.isConnected ? true : false}
                        />
                        <MemberInfo
                            label="Adresse"
                            name={'adress'}
                            data={[memberState?.adress, memberState?.zipCode, memberState?.city]}
                            multiFiedls={true}
                            functionOnClick={openModal}
                            isModify={user?.isConnected ? true : false}
                        />
                        <MemberInfo
                            label="Date de naissance"
                            name={'dateOfBirth'}
                            data={
                                memberState
                                    ? convertDateToFrenchDate(memberState?.dateOfBirth)
                                    : convertDateToFrenchDate(member?.dateOfBirth)
                            }
                            functionOnClick={openModal}
                            isModify={user?.isConnected ? true : false}
                        />
                        <MemberInfo
                            label="Sport pratiqué"
                            name={'favoriteSport'}
                            data={memberState ? memberState?.favoriteSport : member?.favoriteSport}
                            functionOnClick={openModal}
                            isModify={user?.isConnected ? true : false}
                        />
                    </DivMember>
                    <DivMember>
                        <MemberInfo
                            label="Email"
                            data={user?.email} //TODO : EMAIL a rajouter non modifiable
                            name="email"
                        />
                        <MemberInfo
                            label="Mot de passe"
                            name={'password'}
                            data={'********'}
                            functionOnClick={openModal}
                            isModify={user?.isConnected ? true : false}
                        />
                    </DivMember>
                </>
            )}
            {viewHealth && (
                <DivMember>
                    <MemberInfo
                        label="Poids (en kg)"
                        data={memberState ? memberState?.weight + ' kg' : member?.weight + ' kg'}
                        name={'weight'}
                        functionOnClick={openModal}
                        isModify={user?.isConnected ? true : false}
                    />
                    <MemberInfo
                        label="Taille (en cm)"
                        data={memberState ? memberState?.height + ' cm' : member?.height + ' cm'}
                        name={'height'}
                        functionOnClick={openModal}
                        isModify={user?.isConnected ? true : false}
                    />
                    <MemberInfo
                        label="Heure de sommeil"
                        data={
                            memberState ? memberState?.hourSleep + ' h' : member?.hourSleep + ' h'
                        }
                        name={'hourSleep'}
                        functionOnClick={openModal}
                        isModify={user?.isConnected ? true : false}
                    />
                    <MemberInfo
                        label="Fc repos"
                        data={memberState ? memberState?.fcRest + ' bpm' : member?.fcRest + ' bpm'}
                        name={'fcRest'}
                        functionOnClick={openModal}
                        isModify={user?.isConnected ? true : false}
                    />
                    <MemberInfo
                        label="Fc max"
                        data={memberState ? memberState?.fcMax + ' bpm' : member?.fcMax + ' bpm'}
                        name={'fcMax'}
                        functionOnClick={openModal}
                        isModify={user?.isConnected ? true : false}
                    />
                </DivMember>
            )}
            {viewPerformance && (
                <DivMember>
                    <MemberInfo
                        label="VO2max"
                        data={
                            memberState
                                ? memberState?.vo2max + ' ml/kg/min'
                                : member?.vo2max + ' ml/kg/min'
                        }
                        name={'vo2max'}
                        functionOnClick={openModal}
                        isModify={user?.isConnected ? true : false}
                    />
                    <MemberInfo
                        label="Seuil lactique(Bpm)"
                        data={
                            memberState
                                ? memberState?.seuilLactateFC + ' bpm'
                                : member?.seuilLactateFC + ' bpm'
                        }
                        name={'seuilLactateFC'}
                        functionOnClick={openModal}
                        isModify={user?.isConnected ? true : false}
                    />
                    <MemberInfo
                        label="Seuil lactique (min/km)"
                        data={
                            memberState
                                ? memberState?.seuilLactate + ' min/km'
                                : member?.seuilLactate + ' min/km'
                        }
                        name={'seuilLactate'}
                        functionOnClick={openModal}
                        isModify={user?.isConnected ? true : false}
                    />
                    <MemberInfo
                        label="VMA"
                        data={memberState ? memberState?.vma + ' km/h' : member?.vma + ' km/h'}
                        name={'vma'}
                        functionOnClick={openModal}
                        isModify={user?.isConnected ? true : false}
                    />
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    @media ${DEVICE_WIDTH.tablet} {
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin: 0 auto;
        margin-top: 1rem;
        padding: 1rem;
        border-bottom: 1px solid #0554f2;
    }
`;

const H3 = styled.h3`
    font-weight: 800;
    color: #0554f2;
    font-size: 1.5rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    @media ${DEVICE_WIDTH.tablet} {
        font-size: 2rem;
        text-align: center;
        margin-top: 2rem;
    }
`;
