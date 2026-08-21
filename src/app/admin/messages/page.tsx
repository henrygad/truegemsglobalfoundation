"use client";

import { useMessage } from "@/context/message-context";
import { AdminDeleteButton } from "@/components/admin-delete-button";

/** Was a static "No messages yet" shell with an unused Controller import (BRAND_EXTRACT.md §4) — now real. */
export default function AdminMessagesPage() {
  const { messages, loading, deleteMessage } = useMessage();

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground mb-8">Messages</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="p-5 rounded-md border border-border bg-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{message.name}</p>
                  <a href={`mailto:${message.email}`} className="text-sm text-primary">
                    {message.email}
                  </a>
                </div>
                <AdminDeleteButton
                  collection="messages"
                  id={message.id}
                  onDeleted={() => deleteMessage(message.id)}
                  label={`Delete message from ${message.name}`}
                />
              </div>
              <p className="mt-3 text-sm text-foreground leading-relaxed">{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
