import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { uploadImage } from '../lib/storage/upload';
import { deleteImage as deleteStorageImage } from '../lib/storage/delete';
import { initializeBucket } from '../lib/storage/bucket';
import type { Image } from '../types/image';

export async function initializeImageService() {
  await initializeBucket();
}

export async function fetchImages(): Promise<Image[]> {
  const querySnapshot = await getDocs(collection(db, 'images'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Image));
}

export async function addNewImage(
  file: File,
  name: string,
  tags: string[] = [],
  userId: string
): Promise<string> {
  const { url, path } = await uploadImage(file);
  
  const imageDoc = await addDoc(collection(db, 'images'), {
    name,
    url,
    path,
    createdAt: new Date().toISOString(),
    createdBy: userId,
    tags
  });

  return url;
}

export async function deleteImageById(imageId: string, image: Image): Promise<void> {
  await deleteStorageImage(image.path);
  await deleteDoc(doc(db, 'images', imageId));
}

export async function searchImages(searchTerm: string): Promise<Image[]> {
  const querySnapshot = await getDocs(collection(db, 'images'));
  const images = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Image));

  return images.filter(image => 
    image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
}