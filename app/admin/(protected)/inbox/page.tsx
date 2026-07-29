"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

export default function InboxPage() {
  const [messages, setMessages] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [search, setSearch] = useState("");

  const unreadCount = messages.filter(
  (message) => !message.is_read
).length;

const filteredMessages = [...messages]
  .sort((a, b) => Number(a.is_read) - Number(b.is_read))
  .filter((msg) =>
    [msg.name, msg.email, msg.subject]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    const res = await fetch("/api/inbox");
    const data = await res.json();

    setMessages(data);
    setLoading(false);
  }

  async function deleteInquiry(id: string) {
    if (!confirm("Delete this inquiry?")) return;

    const res = await fetch(`/api/inbox?id=${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete inquiry.");
      return;
    }

    setMessages((current) => current.filter((msg) => msg.id !== id));

    if (selected?.id === id) {
      setSelected(null);
    }
  }

  async function openInquiry(msg: Inquiry) {
    setSelected(msg);

    if (msg.is_read) return;

    await fetch("/api/inbox", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: msg.id,
      }),
    });

    setMessages((current) =>
      current.map((item) =>
        item.id === msg.id
          ? {
              ...item,
              is_read: true,
            }
          : item
      )
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold text-white">
      Inbox
    </h1>

    <p className="text-stone-400">
      Customer inquiries from your website.
    </p>
  </div>

  <div className="rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-black">
    {unreadCount} Unread
  </div>
</div>

<div className="mb-6">
  <input
    type="text"
    placeholder="Search by name, email, or subject..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-2xl border border-stone-700 bg-stone-900 px-5 py-3 text-white placeholder:text-stone-500 focus:border-amber-500 focus:outline-none"
  />
</div>

<div className="grid gap-4 md:grid-cols-3">
  <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
    <p className="text-sm text-stone-400">Total Inquiries</p>

    <h2 className="mt-2 text-3xl font-bold text-white">
      {messages.length}
    </h2>
  </div>

  <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
    <p className="text-sm text-stone-400">Unread</p>

    <h2 className="mt-2 text-3xl font-bold text-amber-400">
      {unreadCount}
    </h2>
  </div>

  <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
    <p className="text-sm text-stone-400">Read</p>

    <h2 className="mt-2 text-3xl font-bold text-green-400">
      {messages.length - unreadCount}
    </h2>
  </div>
</div>

        <div className="overflow-hidden rounded-3xl border border-stone-800 bg-stone-900">
          {loading ? (
            <div className="p-8 text-center text-stone-400">
              Loading inquiries...
            </div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-stone-400">
              No inquiries yet.
            </div>
          ) : (
            <div className="divide-y divide-stone-800">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-6 transition hover:bg-stone-800/60"
                >
                  <div className="flex justify-between gap-6">
                    <div className="flex flex-1 gap-4">
  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-black">
    {msg.name.charAt(0).toUpperCase()}
  </div>

  <div className="flex-1">
    <div className="flex items-center gap-3">
      <h2 className="font-semibold text-white">
        {msg.subject}
      </h2>

      {!msg.is_read ? (
        <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs font-semibold text-amber-400">
          New
        </span>
      ) : (
        <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-400">
          Read
        </span>
      )}
    </div>

    <p className="mt-1 text-sm text-amber-400">
      {msg.name} • {msg.email}
    </p>

    <p className="mt-4 line-clamp-2 text-stone-400">
      {msg.message}
    </p>

    <button
      onClick={() => openInquiry(msg)}
      className="mt-4 text-sm font-semibold text-amber-500 hover:text-amber-400"
    >
      View Message
    </button>
  </div>
</div>

                    <div className="flex flex-col items-end gap-3">
                      <span className="text-xs text-stone-500">
                        {new Date(
                          msg.created_at
                        ).toLocaleString()}
                      </span>

                      <button
                        onClick={() =>
                          deleteInquiry(msg.id)
                        }
                        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={!!selected}
        onOpenChange={() => setSelected(null)}
      >
        <DialogContent className="max-w-2xl border-stone-800 bg-stone-900 text-white">
          <DialogHeader>
            <DialogTitle>
              {selected?.subject}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-stone-400">
                From
              </p>

              <p className="font-medium">
                {selected?.name}
              </p>

              <p className="text-amber-400">
                {selected?.email}
              </p>
            </div>

            <div className="whitespace-pre-wrap rounded-xl bg-stone-800 p-5">
              {selected?.message}
            </div>

            <p className="text-xs text-stone-500">
              {selected &&
                new Date(
                  selected.created_at
                ).toLocaleString()}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}