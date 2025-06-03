
import { signInWithEmailAndPassword, signOut as firebaseSignOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import type { UserProfile } from '@/types';
import { ROLES } from './constants';

// This is a simplified login. For production, use secure methods.
export const login = async (identifier: string, pass: string): Promise<void> => {
  // Admin Login
  if (identifier.toLowerCase() === 'admin' && pass === '1269') {
    try {
      // Check if admin user exists, if not, create it. This is for demo purposes.
      // In a real app, admin user should be pre-provisioned or handled securely.
      await signInWithEmailAndPassword(auth, 'admin@translatorhub.com', '12691269'); // Use a strong password
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, 'admin@translatorhub.com', '12691269'); // Use a strong password for actual admin
          await updateProfile(userCredential.user, { displayName: 'Administrator' });
          const adminProfile: UserProfile = {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            name: 'Administrator',
            role: ROLES.ADMIN,
          };
          await setDoc(doc(db, 'users', userCredential.user.uid), adminProfile);
        } catch (creationError) {
          console.error("Admin user creation/setup failed:", creationError);
          throw creationError;
        }
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-login-credentials') {
         throw new Error('Invalid admin credentials');
      } else {
        console.error("Admin login error:", error);
        throw error;
      }
    }
    return;
  }

  // Translator Login (Example - can be any translator email)
  if (identifier.toLowerCase() === 'translator' && pass === 'password') {
     try {
      await signInWithEmailAndPassword(auth, 'translator@translatorhub.com', 'password');
    } catch (error: any) {
       if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, 'translator@translatorhub.com', 'password');
          await updateProfile(userCredential.user, { displayName: 'Sample Translator' });
           const translatorProfile: UserProfile = {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            name: 'Sample Translator',
            role: ROLES.TRANSLATOR,
          };
          await setDoc(doc(db, 'users', userCredential.user.uid), translatorProfile);
        } catch (creationError) {
          console.error("Translator user creation/setup failed:", creationError);
          throw creationError;
        }
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-login-credentials') {
         throw new Error('Invalid translator credentials');
      } else {
        console.error("Translator login error:", error);
        throw error;
      }
    }
    return;
  }
  
  // For other generic email logins, attempt standard Firebase email/password sign-in
  try {
    await signInWithEmailAndPassword(auth, identifier, pass);
    // Role will be determined by AuthContext from Firestore data
  } catch (error: any) {
    console.error("Generic login error:", error);
    // Map Firebase errors to user-friendly messages if needed
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-login-credentials') {
      throw new Error('Invalid email or password.');
    }
    throw new Error('Login failed. Please try again.');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

// Helper to get user profile, can be expanded
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    return userDocSnap.data() as UserProfile;
  }
  return null;
};
