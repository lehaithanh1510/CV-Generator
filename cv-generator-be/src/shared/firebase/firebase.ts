import admin from 'firebase-admin';
import * as firebaseAccountCredentials from './serviceAccountKey.json';

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyToken = async (token) => {
  try {
    const data = await admin.auth().verifyIdToken(token);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { admin };
