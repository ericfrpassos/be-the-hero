import React, { useState } from 'react';

import { FiLogIn } from 'react-icons/fi';

import './style.css';

import logoIMG from '../../assets/logo.svg'; 
import heroesIMG from '../../assets/heroes.png'; 

import { Link, useHistory } from 'react-router-dom'; 

import api from '../../services/api';

export default function Logon() {

    const history = useHistory();

    const [id, setId] = useState();

    async function handleLogin(e) {
        e.preventDefault()

        try {
           const response = await api.post('sessions', { id });
           
           localStorage.setItem('ongID', id);
           localStorage.setItem('ongName', response.data.name);

           history.push('/profile');

        } catch (err) {
            alert('Falha no Login, tente novamente.')
        }
    }

    return (
        <div className="logon-container">

            <section className="form">
            
                <img src={logoIMG} alt="Be The Hero"></img>
            
                <form onSubmit={handleLogin}>

                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>
            
                    <Link className="black-link" to="/register">
                    <FiLogIn size={16} color="#E02041" />
                    Não tenho cadastro</Link>

                </form>
                        
            </section>
            
            <img src={heroesIMG} alt="Heroes"></img>
        </div> 
    );
}