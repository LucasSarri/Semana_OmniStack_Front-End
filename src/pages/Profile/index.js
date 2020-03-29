import React, {useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import {FiPower,FiTrash2} from 'react-icons/fi';
import './styles.css';

export default function Login() {
    const [incidents,setIncidents] = useState([]);
    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('/incidents/slist',{
            headers: {
                Authorization:userId
            }
        }).then(res => {
            setIncidents(res.data);
        });
    }, [userId]);

    async function handleDelete(id)
    {
        try 
        {
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization:userId
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } 
        catch (error) 
        {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout()
    {
        localStorage.clear();
        history.push('/');
    }

    return(
       <div className="profile-container">
           <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo(a), {userName}</span>
                <Link className='button' to='/incidents/new'> Cadastrar Novo Caso </Link>
                <button onClick={handleLogout} type='button'>
                    <FiPower size={18} color='#E02041' />
                </button>
           </header>
           <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso: </strong>
                        <p> {incident.title} </p>

                        <strong>Descrição: </strong>
                        <p> {incident.description}</p>

                        <strong>Valor: </strong>
                        <p> {Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)} </p>

                        <button onClick={() => handleDelete(incident.id)} type='button'>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>

       </div>
    );
}