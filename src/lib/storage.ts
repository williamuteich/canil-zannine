import { supabase } from './supabase';
import { randomUUID } from 'crypto';

const BUCKET_NAME = 'CanilZannine';

/**
 * Faz upload de uma imagem para o Supabase Storage
 * @param file - Arquivo a ser enviado
 * @param folder - Pasta dentro do bucket (ex: 'filhotes')
 * @returns URL pública da imagem
 */
export async function uploadImage(file: File, folder: string = 'filhotes'): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${randomUUID()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Erro ao fazer upload:', error);
      throw new Error(`Falha ao fazer upload da imagem: ${error.message}`);
    }

    return getPublicUrl(data.path);
  } catch (error) {
    console.error('Erro no uploadImage:', error);
    throw error;
  }
}

/**
 * Deleta uma imagem do Supabase Storage
 * @param url - URL pública da imagem
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    const urlParts = url.split(`/object/public/${BUCKET_NAME}/`);
    if (urlParts.length < 2) {
      console.warn('URL inválida para deletar:', url);
      return;
    }

    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('Erro ao deletar imagem:', error);
      throw new Error(`Falha ao deletar a imagem: ${error.message}`);
    }
  } catch (error) {
    console.error('Erro no deleteImage:', error);
  }
}

/**
 * Retorna a URL pública de uma imagem
 * @param filePath - Caminho do arquivo no bucket (ex: 'filhotes/image.jpg')
 * @returns URL pública da imagem
 */
export function getPublicUrl(filePath: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Verifica se uma URL é do Supabase Storage
 * @param url - URL a ser verificada
 * @returns true se for URL do Supabase, false caso contrário
 */
export function isSupabaseUrl(url: string): boolean {
  return url.includes('supabase.co/storage/v1/object/public');
}
