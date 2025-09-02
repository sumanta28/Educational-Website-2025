// "use client";

// import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { account, databases } from "@/lib/appwrite";

// const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
// const STUDENTSPROFILE_COLLECTION_ID =
//   process.env.NEXT_PUBLIC_APPWRITE_STUDENTSPROFILE_COLLECTION_ID!;

// type UserType = {
//   id: string;
//   name: string;
//   email: string;
//   imageUrl?: string;
//   mobile?: string;
// };

// type AuthContextType = {
//   isLoggedIn: boolean;
//   user: UserType | null;
//   login: () => Promise<void>;
//   logout: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<UserType | null>(null);

 
//   const getStudentProfile = async (userId: string) => {
//     try {
//       const doc = await databases.getDocument(
//         DATABASE_ID,
//         STUDENTSPROFILE_COLLECTION_ID,
//         userId
//       );
//       return doc as unknown as {
//         userId: string;
//         fullName: string;
//         email: string;
//         mobile?: string | null;
//         imageUrl?: string | null;
//       };
//     } catch {
//       return null;
//     }
//   };

 
//   const createStudentProfileIfMissing = async (acc: any) => {
    
//     const existing = await getStudentProfile(acc.$id);
//     if (existing) return existing;


//     try {
//       await databases.createDocument(
//         DATABASE_ID,
//         STUDENTSPROFILE_COLLECTION_ID,
//         acc.$id, 
//         {
//           userId: acc.$id,
//           fullName: acc.name,
//           email: acc.email,
//           mobile: "",
//           imageUrl: "",
//         }
//       );
//       return await getStudentProfile(acc.$id);
//     } catch {
//       return null;
//     }
//   };

 
//   useEffect(() => {
//     (async () => {
//       try {
//         const session = await account.getSession("current");
//         if (!session) throw new Error("no session");

//         const acc = await account.get();
//         const profile = await createStudentProfileIfMissing(acc);

//         setUser({
//           id: acc.$id,
//           name: acc.name,
//           email: acc.email,
//           imageUrl: profile?.imageUrl || "",
//           mobile: profile?.mobile || "",
//         });
//         setIsLoggedIn(true);
//       } catch {
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     })();
//   }, []);

//   const login = async () => {
//     try {
//       const acc = await account.get();
//       const profile = await createStudentProfileIfMissing(acc);
//       setUser({
//         id: acc.$id,
//         name: acc.name,
//         email: acc.email,
//         imageUrl: profile?.imageUrl || "",
//         mobile: profile?.mobile || "",
//       });
//       setIsLoggedIn(true);
//     } catch {
//       setIsLoggedIn(false);
//       setUser(null);
//     }
//   };

//   const logout = async () => {
//     try {
//       await account.deleteSession("current");
//     } catch {}
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// }



"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { account, databases} from "@/lib/appwrite";
import { Query } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const STUDENTSPROFILE_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_STUDENTSPROFILE_COLLECTION_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERADMIN_ID!;

type UserType = {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  mobile?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: UserType | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean; // ✅ added
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // ✅ added

  const getStudentProfile = async (userId: string) => {
    try {
      const doc = await databases.getDocument(
        DATABASE_ID,
        STUDENTSPROFILE_COLLECTION_ID,
        userId
      );
      return doc as unknown as {
        userId: string;
        fullName: string;
        email: string;
        mobile?: string | null;
        imageUrl?: string | null;
      };
    } catch {
      return null;
    }
  };

  const createStudentProfileIfMissing = async (acc: any) => {
    const existing = await getStudentProfile(acc.$id);
    if (existing) return existing;

    try {
      await databases.createDocument(
        DATABASE_ID,
        STUDENTSPROFILE_COLLECTION_ID,
        acc.$id,
        {
          userId: acc.$id,
          fullName: acc.name,
          email: acc.email,
          mobile: "",
          imageUrl: "",
        }
      );
      return await getStudentProfile(acc.$id);
    } catch {
      return null;
    }
  };

const checkIfAdmin = async (userId: string) => {
  try {
    const res = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );
    return res.total > 0 ? res.documents[0].admin : false;
  } catch {
    return false;
  }
};



  useEffect(() => {
    (async () => {
      try {
        const session = await account.getSession("current");
        if (!session) throw new Error("no session");

        const acc = await account.get();
        const profile = await createStudentProfileIfMissing(acc);
        const adminStatus = await checkIfAdmin(acc.$id); // ✅ added

        setUser({
          id: acc.$id,
          name: acc.name,
          email: acc.email,
          imageUrl: profile?.imageUrl || "",
          mobile: profile?.mobile || "",
        });
        setIsAdmin(adminStatus); // ✅ added
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
        setUser(null);
        setIsAdmin(false); // ✅ added
      }
    })();
  }, []);

  const login = async () => {
    try {
      const acc = await account.get();
      const profile = await createStudentProfileIfMissing(acc);
      const adminStatus = await checkIfAdmin(acc.$id); // ✅ added

      setUser({
        id: acc.$id,
        name: acc.name,
        email: acc.email,
        imageUrl: profile?.imageUrl || "",
        mobile: profile?.mobile || "",
      });
      setIsAdmin(adminStatus); // ✅ added
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
      setUser(null);
      setIsAdmin(false); // ✅ added
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
    } catch {}
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false); // ✅ added
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
