export type User = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }
  
  export type AuthContextType = {
    user: User | null;
    loading: boolean;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithFacebook: () => Promise<void>;
    signUp: (email: string, password: string, displayName: string) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
  }