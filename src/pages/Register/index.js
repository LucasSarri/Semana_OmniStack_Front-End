import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Login() {
    //Setando os estados (valores dos inputs)
    const [name,SetName] = useState('');
    const [email,SetEmail] = useState('');
    const [whatsapp,SetWhatsApp] = useState('');
    const [city,SetCity] = useState('');
    const [uf,SetUf] = useState('');

    const history = useHistory();

    async function hadleRegister(e)
    {
        e.preventDefault();
        const data = {name,email,whatsapp,city,uf};
        try 
        {
            const res = await api.post('users',data);
            alert(`Seu ID de Acesso: ${res.data.id} `);
            history.push('/');
        } 
        catch (error) 
        {
            alert('Erro no cadastro, tente novamente');
        }
    }

    return(
       <div className="register-container">
           <div className="content">
               <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma para ajudar pessoas a encontrar animais perdidos ou para doação de animais</p>
                    <Link className='back-link' to="/">
                        <FiArrowLeft size={16} color='#E02041'/>
                        Voltar para Login
                    </Link>
               </section>
               <form onSubmit={hadleRegister}>
                    <input value={name} onChange={e=>SetName(e.target.value)} placeholder='Nome do Usuário'/>
                    <input value={email}  onChange={e=>SetEmail(e.target.value)} type="email" placeholder='Email'/>
                    <input value={whatsapp}  onChange={e=>SetWhatsApp(e.target.value)} placeholder='WhatsApp' />
                    <div className="input-group">
                        <input value={city}  onChange={e=>SetCity(e.target.value)} placeholder='Cidade'/>
                        <input value={uf}  onChange={e=>SetUf(e.target.value)} placeholder='UF' style={ {width:80} }/>
                    </div>
                    <button className="button">
                        Cadastrar
                    </button>
               </form>
           </div>
       </div>
    );
}