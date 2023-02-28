import admin from 'firebase-admin';

export function ConexaoFirebase() {
  
  admin.initializeApp({
    credential: admin.credential.cert("serviceAccountKey.json"),
  });
  
  return admin.firestore();
}