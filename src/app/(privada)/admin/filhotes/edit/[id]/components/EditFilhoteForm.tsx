"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, DollarSign, FileText, Tag, Trash2, Star } from 'lucide-react';
import Link from 'next/link';
import { patchMedia } from '@/services/patch-media.service';
import Image from 'next/image';
import { PuppyData, PuppyImage } from '@/types/models';

interface EditFilhoteFormProps {
  initialData: PuppyData;
  id: string;
}

export default function EditFilhoteForm({ initialData, id }: EditFilhoteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState(initialData.name);
  const [descricao, setDescricao] = useState(initialData.description);
  const [price, setPrice] = useState(initialData.price.toString());
  const [age, setAge] = useState(initialData.age || '');
  const [weight, setWeight] = useState(initialData.weight || '');
  const [status, setStatus] = useState(initialData.status || 'ativo');
  const [existingImages, setExistingImages] = useState<PuppyImage[]>(initialData.images || []);
  const [primaryImage, setPrimaryImage] = useState(initialData.primaryImage || '');
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);
  const [newPrimaryImage, setNewPrimaryImage] = useState<File | null>(null);
  const [newPrimaryPreview, setNewPrimaryPreview] = useState<string>('');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const numericValue = Number(value) / 100;
    setPrice(numericValue.toFixed(2));
  };

  const handleNewImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setNewImages(prev => [...prev, ...files]);

    const urls = files.map(file => URL.createObjectURL(file));
    setNewPreviewUrls(prev => [...prev, ...urls]);
  };

  const removeNewImage = (index: number) => {
    const newImagesFiltered = newImages.filter((_, i) => i !== index);
    const newPreviewsFiltered = newPreviewUrls.filter((_, i) => i !== index);
    setNewImages(newImagesFiltered);
    setNewPreviewUrls(newPreviewsFiltered);
  };

  const removeExistingImage = (imageId: string) => {
    setExistingImages(prev => prev.filter(img => img.id !== imageId));
  };

  const setPrimaryImageUrl = (url: string) => {
    setPrimaryImage(url);
  };

  const handlePrimaryImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPrimaryImage(file);
      setNewPrimaryPreview(URL.createObjectURL(file));
    }
  };

  const removePrimaryImageChange = () => {
    setNewPrimaryImage(null);
    setNewPrimaryPreview('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', nome);
      formData.append('description', descricao);
      formData.append('price', price);
      if (age) formData.append('age', age);
      if (weight) formData.append('weight', weight);
      if (primaryImage && primaryImage !== 'undefined' && primaryImage !== 'null') {
        formData.append('primaryImage', primaryImage);
      }
      formData.append('status', status);
      if (newPrimaryImage) {
        formData.append('newPrimaryImage', newPrimaryImage, newPrimaryImage.name);
      }
      existingImages.forEach(img => {
        formData.append('keepImages', img.url);
      });

      newImages.forEach((image) => {
        formData.append('images', image, image.name);
      });

      await patchMedia(`/api/filhote/${id}`, formData);
      router.push('/admin/filhotes');
    } catch (error: any) {
      console.error('Erro ao atualizar filhote:', error);
      alert('Erro ao atualizar filhote');
    } finally {
      setLoading(false);
    }
  };

  const allImages = [
    { id: 'primary', url: primaryImage, isPrimary: true },
    ...existingImages.map(img => ({ ...img, isPrimary: false }))
  ];

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Editar Filhote</h1>
        <p className="text-base text-slate-600">
          Atualize as informações do filhote.
        </p>
      </div>

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
            <label htmlFor="status" className="block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="pedding">Pendente</option>
            </select>
          </div>

          {primaryImage && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Imagens Cadastradas
              </label>
              <p className="text-sm text-slate-500 mb-3">
                Clique na estrela para definir como imagem principal. Clique no X para remover.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <Image
                      src={image.isPrimary && newPrimaryPreview ? newPrimaryPreview : image.url}
                      alt={image.isPrimary ? "Imagem Principal" : "Imagem"}
                      className="w-full h-48 object-cover rounded-lg border-2 border-slate-200 bg-gray-50"
                      height={400}
                      width={800}
                    />
                    {image.isPrimary ? (
                      <>
                        <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                          <Star className="h-3 w-3 fill-white" />
                          Principal
                        </span>
                        {newPrimaryPreview ? (
                          <button
                            type="button"
                            onClick={removePrimaryImageChange}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Cancelar mudança"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        ) : (
                          <label
                            htmlFor="replacePrimary"
                            className="absolute bottom-2 left-2 right-2 bg-slate-900/90 text-white text-xs px-2 py-1.5 rounded cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity text-center"
                          >
                            📷 Trocar imagem
                          </label>
                        )}
                        <input
                          type="file"
                          id="replacePrimary"
                          accept="image/*"
                          onChange={handlePrimaryImageChange}
                          className="hidden"
                        />
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPrimaryImageUrl(image.url)}
                        className="absolute top-2 left-2 bg-slate-700 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Definir como principal"
                      >
                        <Star className="h-3 w-3" />
                      </button>
                    )}
                    {!image.isPrimary && (
                      <button
                        type="button"
                        onClick={() => removeExistingImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remover imagem"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              <Upload className="inline h-4 w-4 mr-1" />
              Adicionar Novas Imagens
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-slate-500" />
                  <p className="mb-2 text-sm text-slate-500">
                    <span className="font-semibold">Clique para fazer upload</span> ou arraste as imagens
                  </p>
                  <p className="text-xs text-slate-500">Adicione quantas imagens quiser</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleNewImagesChange}
                  className="hidden"
                />
              </label>
            </div>

            {newPreviewUrls.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-slate-600 mb-2">{newImages.length} nova(s) imagem(ns) para upload</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {newPreviewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={url}
                        alt={`Nova imagem ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border-2 border-green-200 bg-gray-50"
                        height={400}
                        width={800}
                      />
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Nova
                      </span>
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
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
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form >
    </div >
  );
}
