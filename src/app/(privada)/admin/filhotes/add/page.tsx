"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, DollarSign, FileText, Tag } from 'lucide-react';
import Link from 'next/link';
import { createFilhote } from '@/app/actions/filhote';
import Image from 'next/image';

export default function AdicionarFilhote() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [price, setPrice] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [imagens, setImagens] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 10MB

    useEffect(() => {
        setNome('');
        setDescricao('');
        setPrice('');
        setAge('');
        setWeight('');
        setImagens([]);
        setPreviewUrls([]);
        setLoading(false);
        setError('');
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setError('');

        const invalidFiles = files.filter(file => file.size > MAX_FILE_SIZE);
        if (invalidFiles.length > 0) {
            setError(`Algumas imagens excedem o limite de 5MB: ${invalidFiles.map(f => f.name).join(', ')}`);
            event.target.value = '';
            return;
        }

        setImagens(files);

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const removeImage = (index: number) => {
        const newImagens = imagens.filter((_, i) => i !== index);
        const newPreviews = previewUrls.filter((_, i) => i !== index);
        setImagens(newImagens);
        setPreviewUrls(newPreviews);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        const numericValue = Number(value) / 100;
        setPrice(numericValue.toFixed(2));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (!nome.trim()) {
            setError('O nome do filhote é obrigatório');
            setLoading(false);
            return;
        }

        if (!descricao.trim()) {
            setError('A descrição é obrigatória');
            setLoading(false);
            return;
        }

        if (!price || Number(price) <= 0) {
            setError('O preço deve ser maior que zero');
            setLoading(false);
            return;
        }

        if (imagens.length === 0) {
            setError('É necessário adicionar pelo menos uma imagem');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', nome);
        formData.append('description', descricao);
        formData.append('price', price);
        if (age) formData.append('age', age);
        if (weight) formData.append('weight', weight);

        if (imagens.length > 0) {
            formData.append('primaryImage', imagens[0], imagens[0].name);

            imagens.slice(1).forEach((imagem) => {
                formData.append('images', imagem, imagem.name);
            });
        }

        try {
            await createFilhote(formData);
            router.push('/admin/filhotes');
        } catch (error: any) {
            if (error.message?.includes('Body exceeded') || error.digest?.includes('Body exceeded')) {
                setError('O tamanho total das imagens excede o limite permitido pelo servidor. Tente enviar menos imagens ou imagens menores (máx 5MB cada).');
            } else {
                setError(error.message || 'Erro ao adicionar filhote. Por favor, tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-7">
            <div className="space-y-1.5">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Adicionar Filhote</h1>
                <p className="text-base text-slate-600">
                    Preencha os dados do novo filhote para cadastrá-lo no sistema.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-6">

                    <div className="space-y-2">
                        <label htmlFor="nome" className="block text-sm font-medium text-slate-700">
                            <Tag className="inline h-4 w-4 mr-1" />
                            Nome do Filhote
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                            placeholder="Ex: Golden Retriever Fêmea"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="descricao" className="block text-sm font-medium text-slate-700">
                            <FileText className="inline h-4 w-4 mr-1" />
                            Descrição
                        </label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                            rows={4}
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                            placeholder="Descreva as características do filhote..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="preco" className="block text-sm font-medium text-slate-700">
                                <DollarSign className="inline h-4 w-4 mr-1" />
                                Preço (R$)
                            </label>
                            <input
                                type="text"
                                id="preco"
                                name="preco"
                                value={price ? `R$ ${Number(price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}
                                onChange={handlePriceChange}
                                required
                                min="0"
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                placeholder="R$ 0,00"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="idade" className="block text-sm font-medium text-slate-700">
                                Idade
                            </label>
                            <input
                                type="text"
                                id="idade"
                                name="idade"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                placeholder="Ex: 3 meses"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="peso" className="block text-sm font-medium text-slate-700">
                            Peso
                        </label>
                        <input
                            type="text"
                            id="peso"
                            name="peso"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                            placeholder="Ex: 2,5 kg"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">
                            <Upload className="inline h-4 w-4 mr-1" />
                            Imagens
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-slate-500" />
                                    <p className="mb-2 text-sm text-slate-500">
                                        <span className="font-semibold">Clique para fazer upload</span> ou arraste as imagens
                                    </p>
                                    <p className="text-xs text-slate-500">Máximo 10MB por imagem</p>
                                    <p className="text-xs text-slate-500">A primeira imagem será a principal</p>
                                </div>
                                <input
                                    type="file"
                                    id="addImagem"
                                    name="addImagem"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    required
                                />
                            </label>
                        </div>

                        {previewUrls.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm text-slate-600 mb-2">{imagens.length} imagem(s) selecionada(s)</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {previewUrls.map((url, index) => (
                                        <div key={index} className="relative group">
                                            <Image
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full max-h-64 object-contain rounded-lg border-2 border-slate-200 bg-gray-50"
                                                height={400}
                                                width={800}
                                            />
                                            {index === 0 && (
                                                <span className="absolute top-2 left-2 bg-slate-900 text-white text-xs px-2 py-1 rounded">
                                                    Principal
                                                </span>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Link href="/admin/filhotes">
                        <button
                            type="button"
                            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        {loading ? 'Salvando...' : 'Salvar Filhote'}
                    </button>
                </div>
            </form>
        </div>
    );
}