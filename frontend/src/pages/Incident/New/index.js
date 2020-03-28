import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

import api from '../../../services/api';

import { FiArrowLeft } from 'react-icons/fi';

import logoIMG from '../../../assets/logo.svg'; 

export default function NewIncident() {

    const ongID = localStorage.getItem('ongID');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {

            await api.post('incidents', data, { 
                headers: {
                    Authorization: ongID,
                }});
            
            history.push('/profile');

        } catch(err) {
            alert('Erro ao cadastrar novo caso, tente novamente.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoIMG} alt="Be The Hero"></img>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o cadastro detalhadamente para encontrar um herói para resolver isso.</p>
                
                    <Link className="black-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home</Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar Novo Caso</button>
                </form>
            </div>
        </div>
)}