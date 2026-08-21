"use client";

import { useVolunteer } from "@/context/volunteer-context";
import type { VolunteerType } from "@/context/volunteer-context";
import Controller from "@/lib/firebase/controller";
import { AdminDeleteButton } from "@/components/admin-delete-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const statusOptions: VolunteerType["status"][] = ["pending", "accepted", "disapproved"];

export default function AdminVolunteersPage() {
  const { volunteers, loading, deleteVolunteer, updateVolunteer } = useVolunteer();

  async function handleStatusChange(volunteer: VolunteerType, status: VolunteerType["status"]) {
    await Controller.updateData<VolunteerType>("volunteers", volunteer.id, { status });
    updateVolunteer({ ...volunteer, status });
  }

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground mb-8">Volunteer applications</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : volunteers.length === 0 ? (
        <p className="text-muted-foreground">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {volunteers.map((v) => (
            <div key={v.id} className="p-5 rounded-md border border-border bg-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">
                    {v.firstName} {v.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {v.email} · {v.phone} · {v.country}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={v.status}
                    onValueChange={(value) => handleStatusChange(v, value as VolunteerType["status"])}
                  >
                    <SelectTrigger
                      size="sm"
                      className={cn(
                        "h-auto min-h-0 w-fit rounded-full border px-3 py-1 text-xs capitalize",
                        v.status === "accepted" && "bg-primary/10 text-primary border-primary/20",
                        v.status === "disapproved" && "bg-destructive/10 text-destructive border-destructive/20",
                        v.status === "pending" && "bg-accent/10 text-accent-dark border-accent/20"
                      )}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                      {statusOptions.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <AdminDeleteButton
                    collection="volunteers"
                    id={v.id}
                    onDeleted={() => deleteVolunteer(v.id)}
                    label={`Delete application from ${v.firstName}`}
                  />
                </div>
              </div>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                <div>
                  <dt className="text-muted-foreground inline">Skills: </dt>
                  <dd className="inline text-foreground">{v.expertise}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground inline">Availability: </dt>
                  <dd className="inline text-foreground">{v.availability}</dd>
                </div>
              </dl>
              {v.message && <p className="mt-2 text-sm text-foreground leading-relaxed">{v.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
