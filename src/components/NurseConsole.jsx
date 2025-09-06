import React, { useState } from "react";
import { Section, Pill } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Bell } from "lucide-react";

const redFlagSamples = [
  { id: "rf1", patient: "Solange N.", symptom: "Severe dizziness", sev: "high", mins: 2 },
  { id: "rf2", patient: "Jean P.", symptom: "Bleeding at wound site", sev: "critical", mins: 0 },
  { id: "rf3", patient: "Claudine U.", symptom: "Chest pain", sev: "high", mins: 4 },
];

export default function NurseConsole() {
  const initial = redFlagSamples.map((r) => ({ ...r, log: [{ t: "14:01", msg: "Auto-detected red-flag" }] }));
  const [items, setItems] = useState(initial);
  const me = "Nurse A";
  const update = (id, patch) => setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const logAdd = (id, msg) => {
    const found = items.find((i) => i.id === id);
    update(id, { log: [...(found?.log || []), { t: "now", msg }] });
  };

  const take = (id) => {
    update(id, { owner: me });
    logAdd(id, "Taken by Nurse A");
  };
  const triage = (id) => {
    update(id, { action: "triaged" });
    logAdd(id, "Triaged");
  };
  const escalate = (id) => {
    update(id, { action: "escalated" });
    logAdd(id, "Escalated to MD");
  };
  const toggleOpen = (id) => update(id, { open: !items.find((i) => i.id === id)?.open });
  const toggleQA = (id, on) => update(id, { qa: on });

  const waiting = items.filter((i) => !i.action).length;
  const atRisk = items.filter((i) => !i.action && i.mins >= 8).length;
  const escalated = items.filter((i) => i.action === "escalated").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section title="Red-Flags" subtitle="Prioritized by severity/time">
        <div className="grid gap-2">
          {items.map((rf) => (
            <div key={rf.id} className="p-3 border rounded-xl bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{rf.patient} {rf.owner && <Badge className="ml-2">{rf.owner}</Badge>}</div>
                  <div className="text-sm text-gray-600">{rf.symptom}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={rf.sev === "critical" ? "bg-red-600" : "bg-orange-500"}>{rf.sev}</Badge>
                  <Pill>{rf.mins}m</Pill>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {!rf.owner && <Button size="sm" onClick={() => take(rf.id)}>Take</Button>}
                <Button size="sm" variant="secondary" onClick={() => toggleOpen(rf.id)}>{rf.open ? "Hide context" : "View context"}</Button>
                {!rf.action && <Button size="sm" onClick={() => triage(rf.id)}>Triage</Button>}
                {!rf.action && <Button size="sm" variant="outline" onClick={() => escalate(rf.id)}>Escalate</Button>}
                <Dialog>
                  <DialogTrigger asChild><Button size="sm" variant="outline">QA</Button></DialogTrigger>
                  <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                      <DialogTitle>QA checklist</DialogTitle>
                      <DialogDescription>Mark adherence for this case.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 text-sm">
                      <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> SOP followed</label>
                      <label className="flex items-center gap-2"><input type="checkbox" /> Safety advice given</label>
                      <label className="flex items-center gap-2"><input type="checkbox" /> Referral considered</label>
                    </div>
                    <DialogFooter><Button onClick={() => toggleQA(rf.id, true)}>Mark QA done</Button></DialogFooter>
                  </DialogContent>
                </Dialog>
                {rf.qa && <Badge variant="outline">QA Passed</Badge>}
                <Button size="sm" variant="outline">Open SOP</Button>
              </div>

              {rf.open && (
                <div className="mt-3 grid md:grid-cols-3 gap-2 text-sm">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <div className="font-medium mb-1">Meds</div>
                    <div className="text-gray-600">Amlodipine 5mg; Paracetamol PRN</div>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-50">
                    <div className="font-medium mb-1">Conditions</div>
                    <div className="text-gray-600">Hypertension; Post-op D1</div>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-50">
                    <div className="font-medium mb-1">Last vitals</div>
                    <div className="text-gray-600">BP 136/84; HR 76</div>
                  </div>
                  <div className="md:col-span-3 p-2 rounded-lg border">
                    <div className="font-medium mb-1">Audit</div>
                    <div className="text-xs text-gray-600 space-y-1">
                      {(rf.log || []).map((l, i) => <div key={i}>• {l.t} — {l.msg}</div>)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Live Chats" subtitle="Patients waiting">
        <div className="grid gap-2">
          {["Solange N.", "Jean P.", "Claudine U."].map((n, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-xl bg-white">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8"><AvatarFallback>{n.split(" ")[0][0]}{n.split(" ")[1]?.[0] ?? ""}</AvatarFallback></Avatar>
                <div>
                  <div className="font-medium text-sm">{n}</div>
                  <div className="text-xs text-gray-600">“Ndumva umutwe unyerera…”</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><MessageCircle className="h-4 w-4 mr-1" /> Open</Button>
                <Button size="sm" variant="secondary">Quick reply</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="SLA Watch" subtitle="Alerting before breach" right={<Badge variant="secondary"><Bell className="h-3 w-3 mr-1" /> 10-min</Badge>}>
        <div className="text-sm text-gray-600">P95 response: 2m 31s.</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-green-50">
            <div className="text-2xl font-semibold">{items.length - waiting}</div>
            <div className="text-xs text-gray-600">Handled</div>
          </div>
          <div className="p-3 rounded-xl bg-yellow-50">
            <div className="text-2xl font-semibold">{atRisk}</div>
            <div className="text-xs text-gray-600">At risk</div>
          </div>
          <div className="p-3 rounded-xl bg-red-50">
            <div className="text-2xl font-semibold">{escalated}</div>
            <div className="text-xs text-gray-600">Escalated</div>
          </div>
        </div>
        {atRisk > 0 && <div className="mt-3 p-2 rounded-md bg-yellow-100 border text-xs">{atRisk} case(s) approaching 10-minute SLA — prioritize triage.</div>}
      </Section>
    </div>
  );
}
