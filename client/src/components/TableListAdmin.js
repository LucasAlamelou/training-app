import React from 'react';
import styled from 'styled-components';
import { TrMember } from './TrMember.js';
import { TrUser } from './TrUser.js';

export const TableListAdmin = ({ isMember, isUser, members, users, onDeleteAction }) => {
    return (
        <>
            <DivTable>
                <Table>
                    <thead>
                        <Tr>
                            {isMember && (
                                <>
                                    <Th>Id</Th>
                                    <Th>Lastname</Th>
                                    <Th>Firstname</Th>
                                    <Th>Date de naissance</Th>
                                    <Th>Sport Favori</Th>
                                    <Th>userId</Th>
                                    <Th>Action</Th>
                                </>
                            )}
                            {isUser && (
                                <>
                                    <Th>Id</Th>
                                    <Th>Email</Th>
                                    <Th>Roles</Th>
                                    <Th>Action</Th>
                                </>
                            )}
                        </Tr>
                    </thead>
                    <tbody>
                        {isMember && (
                            <>
                                {members?.map((member) => (
                                    <TrMember
                                        key={`member_${member.userId}`}
                                        member={member}
                                        deleteMember={onDeleteAction}
                                    />
                                ))}
                            </>
                        )}

                        {isUser && (
                            <>
                                {users?.map((user) => (
                                    <TrUser
                                        key={`user_${user.id}`}
                                        user={user}
                                        deleteUser={onDeleteAction}
                                    />
                                ))}
                            </>
                        )}
                    </tbody>
                </Table>
            </DivTable>
        </>
    );
};

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    font-size: 1.4rem;
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const Th = styled.th`
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
`;

const DivTable = styled.div`
    margin: 0 auto;
    margin-top: 5rem;
    width: 80%;
    height: 60%;
    padding: 1rem;
    background-color: #fff;
    border: 2px solid #0554f2;
    border-radius: 0.5rem;
`;
