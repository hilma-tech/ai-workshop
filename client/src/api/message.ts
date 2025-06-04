const API_BASE = "http://localhost:3000/api/messages"; // Adjust if needed

export async function sendMessage(text: string, isSent: boolean) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, isSent }),
  });
  return response.json();
}

export async function getMessages() {
  const response = await fetch(API_BASE);
  return response.json();
}

export const updateMessage = async (id: number, text: string) => {
  const res = await fetch(`/api/messages/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return await res.json();
};
