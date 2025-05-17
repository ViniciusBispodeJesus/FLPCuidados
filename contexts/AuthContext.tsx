// // src/contexts/AuthContext.tsx
// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import { login as doLogin, logout as doLogout } from '../services/authService';
// import { getToken } from '../utils/storage'; 

// type User = { id: string; nome: string /* etc */ };
// type AuthContextData = {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, senha: string) => Promise<void>;
//   signOut: () => Promise<void>;
// };

// export const AuthContext = createContext<AuthContextData>({} as any);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Ao montar, checa se já há token no storage
//   useEffect(() => {
//     async function loadStorage() {
//       const token = await getToken();
//       if (token) {
//         // você pode decodificar o JWT aqui para pegar dados do usuário
//         // ou chamar um endpoint /me
//         const usuario = {/* decodifica ou busca do servidor */};
//         setUser(usuario);
//       }
//       setLoading(false);
//     }
//     loadStorage();
//   }, []);

//   const signIn = async (email: string, senha: string) => {
//     const { usuario } = await doLogin({ email, senha });
//     setUser(usuario);
//   };

//   const signOut = async () => {
//     await doLogout();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
