"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  user_id: string;
};

function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("cryptlink_user");
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    if (parsed.isAuthenticated && parsed.accountType === "bank") {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

export default function QueuePage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    const fetchQueue = async () => {
      const res = await fetch("http://localhost:5000/presence/user");
      const data = await res.json();
      setUsers(data.online.map((id: string) => ({ user_id: id })));
    };

    fetchQueue();
    const interval = setInterval(fetchQueue, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (selectedUserId: string) => {
    const bank_id = user.email;

    // Create session
    await fetch("http://localhost:5000/session/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: selectedUserId,
        bank_id: bank_id,
      }),
    });

    // Optionally: save selectedUserId in sessionStorage for chat context
    sessionStorage.setItem("chat_partner", selectedUserId);

    // TODO in next step: Send bank's RSA public key here too

    router.push("/chat");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">User Queue</h1>
      {users.length === 0 ? (
        <p>No users online.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.user_id} className="p-4 bg-white shadow rounded-xl flex justify-between items-center">
              <span className="text-lg">{user.user_id}</span>
              <button
                onClick={() => handleAccept(user.user_id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
