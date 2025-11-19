"use client"
import { URL_FRONT } from '@/lib/utils';
import React, { useState } from 'react';

export default function Adcionar(){
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [price, setPrice] = useState('');
    const [imagens, setImagens] = useState([]);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'nome') {
            setNome(value);
        } else if (name === 'descricao') {
            setDescricao(value);
        } else if(name === 'preco') {
            setPrice(value)
        }
    };

    const handleImageChange = (event: any) => {
        setImagens(Array.from(event.target.files));
    };

    const handleSubmit = async (event: any) => {
    event.preventDefault(); 

    const formData = new FormData();
    
    formData.append('name', nome);
    formData.append('description', descricao);
    formData.append('price', price);

    const primaryImageFile = imagens[0];
    const secondaryImages = imagens.slice(1);

    if (primaryImageFile) {
        //@ts-ignore
        formData.append('primaryImage', primaryImageFile, primaryImageFile.name);
    }
    
    secondaryImages.forEach((imagem, index) => {
        //@ts-ignore
        formData.append(`images`, imagem, imagem.name);
    });

    try {
        const response = await fetch(`${URL_FRONT}/filhote`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Envio bem-sucedido:', result);
            alert('Filhote adicionado com sucesso!');
            setNome('');
            setDescricao('');
            setPrice('');
            setImagens([]);
        } else {
            console.error('Erro no envio:', response.statusText);
            alert('Erro ao adicionar filhote.');
        }
    } catch (error) {
        console.error('Erro de rede/servidor:', error);
        alert('Erro de conexão com o servidor.');
    }
    };

    return (
        <>
            <h1>Adiciona Filhote</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    id="nome" 
                    name="nome"
                    value={nome}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    placeholder="Descrição" 
                    id="descricao" 
                    name="descricao"
                    value={descricao}
                    onChange={handleInputChange}
                />
                <input 
                    type="number" 
                    placeholder="Valor" 
                    id="preco" 
                    name="preco"
                    value={price}
                    onChange={handleInputChange}
                />
                
                <input 
                    type="file" 
                    placeholder="Adcione imagens" 
                    id="addImagem" 
                    name="addImagem"
                    accept="image/*"
                    multiple 
                    onChange={handleImageChange} 
                />
                <br/>
                <small>{imagens.length} imagem(s) selecionada(s)</small>
                <br/>

                <input type="submit" value="Enviar" />
            </form>
        </>
    )
}