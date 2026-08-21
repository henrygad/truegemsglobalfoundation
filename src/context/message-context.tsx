"use client";

import Controller from "@/lib/firebase/controller";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type MessageType = {
  id: string;
  name: string;
  email: string;
  phoneCode: string;
  phone: string;
  subject: string;
  message: string;
};

interface MessageTypeContext {
  messages: MessageType[];
  getMessage: (id: string) => MessageType | undefined;
  addMessage: (p: MessageType) => void;
  deleteMessage: (id: string) => void;
  updateMessage: (p: MessageType) => void;
  loading: boolean;
  error: string;
}

const MessageContext = createContext<MessageTypeContext | null>(null);

export default function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const Messages = await Controller.getAllData<MessageType>("messages");
        if (Messages.length) setMessages(Messages);
      } catch {
        setError("An error occurred while fetching Messages");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addMessage = (p: MessageType) => {
    setMessages((pre) => [p, ...pre]);
  };
  const getMessage = (id: string) => {
    return messages.find((p) => p.id === id);
  };
  const updateMessage = (uP: MessageType) => {
    setMessages((pre) => pre.map((p) => (p.id === uP.id ? { ...p, ...uP } : p)));
  };
  const deleteMessage = (id: string) => {
    setMessages((pre) => pre.filter((p) => p.id !== id));
  };

  return (
    <MessageContext.Provider
      value={{ messages, loading, error, addMessage, getMessage, updateMessage, deleteMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error("useMessage must be used inside MessageProvider");
  }

  return context;
}
