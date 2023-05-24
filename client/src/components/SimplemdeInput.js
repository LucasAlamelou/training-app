import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styled from 'styled-components';
import { PreviewMDE } from './PreviewMDE.js';

export const SimplemdeInput = ({ value, onClick, id, nameFonctionnalite }) => {
    const [description, setDescription] = useState(value ? value : '');
    const [name, setName] = useState(nameFonctionnalite ? nameFonctionnalite : '');

    return (
        <Container>
            <Input>
                <h2>Modifier le texte de la page d'accueil</h2>
                <label htmlFor="name">Nom de la fonctionnalité</label>
                <input
                    type="text"
                    name="name"
                    required={true}
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                />
                <SimpleMDE value={description} onChange={setDescription} />
                <div className="mde-preview" style={{ width: '50%', overflowY: 'scroll' }}>
                    <PreviewMDE content={description} options={{ forceBlock: true }} />
                </div>
                <Button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        onClick(id, description, name);
                    }}
                >
                    Enregister
                </Button>
            </Input>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Input = styled.div`
    width: 50%;
    margin-left: -1px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    box-sizing: border-box;
`;

export const Button = styled.button`
    width: 40%;
    height: 2.5rem;
    border: 1px solid #0554f2;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #0554f2;
    background-color: #fff;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;
