"use client";
import { useState } from "react";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useNotifications } from "@/components/notificationContext"; 

interface Props {
  courseId: string;
  userId: string;
}

export default function EnrollButton({ courseId, userId }: Props) {
  const { createEnrollment } = useEnrollments(userId);
  const { addNotification } = useNotifications(); 
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      await createEnrollment(courseId);
      addNotification("Enrollment successful 🎉", "success"); 
    } catch (err) {
      console.error(err);
      addNotification("Error enrolling in course ❌", "error"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleEnroll}
      className="px-4 py-2 rounded bg-blue-600 text-white"
    >
      {loading ? "Enrolling..." : "Enroll"}
    </button>
  );
}

