// import { useState, useEffect } from "react";
// import { databases, ID } from "@/lib/appwrite"; 
// import { Permission, Role, Query } from "appwrite";

// const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
// const ENROLLMENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID; 

// // match schema in Appwrite
// export interface Enrollment {
//   $id: string;
//   studentId: string;
//   studentName: string;
//   courseId: string;
//   courseName: string;
//   status: "active" | "completed" | "dropped";
//   progress: number;
//   enrolledAt: string;
// }

// export function useEnrollments(userId?: string) {
//   const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch user-specific enrollments
//   const fetchEnrollments = async () => {
//     if (!userId) return;
//     setLoading(true);
//     try {
//       const res = await databases.listDocuments(
//         DATABASE_ID,
//         ENROLLMENTS_COLLECTION_ID,
//         [Query.equal("studentId", userId)]
//       );
//       setEnrollments(res.documents as unknown as Enrollment[]);
//     } catch (err) {
//       console.error("Error fetching enrollments:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create a new enrollment
//   const createEnrollment = async (courseId: string, courseName: string, studentName: string) => {
//     if (!userId) return;
//     try {
//       const doc = await databases.createDocument(
//         DATABASE_ID,
//         ENROLLMENTS_COLLECTION_ID,
//         ID.unique(),
//         {
//           studentId: userId,
//           studentName,
//           courseId,
//           courseName,
//           status: "active",
//           progress: 0,
//           enrolledAt: new Date().toISOString(),
//         },
//         [
//           Permission.read(Role.user(userId)),
//           Permission.update(Role.user(userId)),
//           Permission.delete(Role.user(userId)),
//         ]
//       );
//       setEnrollments((prev) => [...prev, doc as unknown as Enrollment]);
//     } catch (err) {
//       console.error("Error creating enrollment:", err);
//     }
//   };

//   // Update enrollment (progress, status, etc.)
//   const updateEnrollment = async (id: string, data: Partial<Enrollment>) => {
//     try {
//       const doc = await databases.updateDocument(
//         DATABASE_ID,
//         ENROLLMENTS_COLLECTION_ID,
//         id,
//         data
//       );
//       setEnrollments((prev) =>
//         prev.map((e) => (e.$id === id ? (doc as unknown as Enrollment) : e))
//       );
//     } catch (err) {
//       console.error("Error updating enrollment:", err);
//     }
//   };

//   // Delete enrollment
//   const deleteEnrollment = async (id: string) => {
//     try {
//       await databases.deleteDocument(DATABASE_ID, ENROLLMENTS_COLLECTION_ID, id);
//       setEnrollments((prev) => prev.filter((e) => e.$id !== id));
//     } catch (err) {
//       console.error("Error deleting enrollment:", err);
//     }
//   };

//   useEffect(() => {
//     fetchEnrollments();
//   }, [userId]);

//   return {
//     enrollments,
//     loading,
//     createEnrollment,
//     updateEnrollment,
//     deleteEnrollment,
//     refetch: fetchEnrollments,
//   };
// }


import { useState, useEffect } from "react";
import { databases, ID } from "@/lib/appwrite"; 
import { Permission, Role, Query } from "appwrite";

const DATABASE_ID: string = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ENROLLMENTS_COLLECTION_ID: string = process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!; 

// match schema in Appwrite
export interface Enrollment {
  $id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  status: "active" | "completed" | "dropped";
  progress: number;
  enrolledAt: string;
}

export function useEnrollments(userId?: string) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user-specific enrollments
  const fetchEnrollments = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        ENROLLMENTS_COLLECTION_ID,
        [Query.equal("studentId", userId)]
      );
      setEnrollments(res.documents as unknown as Enrollment[]);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new enrollment
  const createEnrollment = async (courseId: string, courseName: string, studentName: string) => {
    if (!userId) return;
    try {
      const doc = await databases.createDocument(
        DATABASE_ID,
        ENROLLMENTS_COLLECTION_ID,
        ID.unique(),
        {
          studentId: userId,
          studentName,
          courseId,
          courseName,
          status: "active",
          progress: 0,
          enrolledAt: new Date().toISOString(),
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
      setEnrollments((prev) => [...prev, doc as unknown as Enrollment]);
    } catch (err) {
      console.error("Error creating enrollment:", err);
    }
  };

  // Update enrollment (progress, status, etc.)
  const updateEnrollment = async (id: string, data: Partial<Omit<Enrollment, "$id">>) => {
  try {
    const doc = await databases.updateDocument(
      DATABASE_ID,
      ENROLLMENTS_COLLECTION_ID,
      id,
      data
    );
    setEnrollments((prev) =>
      prev.map((e) => (e.$id === id ? (doc as unknown as Enrollment) : e))
    );
  } catch (err) {
    console.error("Error updating enrollment:", err);
  }
};


  // Delete enrollment
  const deleteEnrollment = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, ENROLLMENTS_COLLECTION_ID, id);
      setEnrollments((prev) => prev.filter((e) => e.$id !== id));
    } catch (err) {
      console.error("Error deleting enrollment:", err);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [userId]);

  return {
    enrollments,
    loading,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    refetch: fetchEnrollments,
  };
}
