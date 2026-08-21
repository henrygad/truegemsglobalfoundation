import { formatTimestamp } from "@/lib/utils";
import { db } from "./config";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  query,
  where,
  updateDoc,
  serverTimestamp,
  getDoc,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";

export type DOC_NAME =
  | "messages"
  | "volunteers"
  | "newsletter"
  | "testimonials"
  | "gallery"
  | "donors"
  | "admins"
  | "visitors";

const formatData = (snap: DocumentSnapshot<DocumentData, DocumentData>) => {
  const getData = snap.data();

  return {
    id: snap.id,
    ...getData,
    createdAt: formatTimestamp(getData?.createdAt),
    updatedAt: formatTimestamp(getData?.updatedAt),
  };
};

const Controller = {
  async createData<T>(DOC_NAME: DOC_NAME, data: unknown) {
    const getData = data as T;

    const colRef = collection(db, DOC_NAME);
    const docRef = await addDoc(colRef, {
      ...getData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  },
  async updateData<T>(DOC_NAME: DOC_NAME, id: string, data: unknown) {
    const getData = data as T;

    const docRef = doc(db, DOC_NAME, id);
    await updateDoc(docRef, { ...getData, updatedAt: serverTimestamp() });
  },
  async getData<T>(DOC_NAME: DOC_NAME, id: string) {
    const docRef = doc(db, DOC_NAME, id);
    const snap = await getDoc(docRef);
    return formatData(snap) as T;
  },
  async getAllData<T>(DOC_NAME: DOC_NAME) {
    const colRef = collection(db, DOC_NAME);
    const snap = await getDocs(colRef);

    return snap.docs.map((d) => formatData(d)) as T[];
  },
  async deleteData(DOC_NAME: DOC_NAME, id: string) {
    const docRef = doc(db, DOC_NAME, id);
    await deleteDoc(docRef);
    return true;
  },
  async getDataby<T>(
    DOC_NAME: DOC_NAME,
    params: { field: string; value: unknown }[]
  ) {
    const queries = params.map(({ field, value }) => where(field, "==", value));
    const snapshot = await getDocs(query(collection(db, DOC_NAME), ...queries));
    return snapshot.docs.map((d) => formatData(d)) as T[];
  },
};

export default Controller;
