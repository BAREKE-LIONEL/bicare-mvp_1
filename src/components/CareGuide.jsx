import React, { useState } from "react";
import { Section } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  MapPin,
  ShieldCheck,
  ScanFace,
  Hospital,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function CareGuide() {
  const [accepted, setAccepted] = useState(false);
  const [clocked, setClocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [supplies, setSupplies] = useState([]);
  const [photoOpen, setPhotoOpen] = useState(false);

  const toggleSupply = (id) => setSupplies((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section title="Today’s Shift" subtitle="Downtown Kigali">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> 08:00 – 16:00</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Kacyiru → Gikondo</div>
          <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Liveness + Geo required</div>
          <div className="flex items-center gap-2"><ScanFace className="h-4 w-4" /> {clocked ? "Clocked-in (verified)" : "Not clocked-in"}</div>
          {!clocked && <Button className="mt-2" onClick={() => setClocked(true)}>Clock-in (simulate)</Button>}
          {clocked && <Button variant="secondary" className="mt-2" onClick={() => setClocked(false)}>Clock-out</Button>}
        </div>
      </Section>

      <Section title="Assigned Visit" subtitle="Solange N. – Post-surgery" right={<Badge variant="secondary">QA Required</Badge>}>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2"><Hospital className="h-4 w-4" /> Tasks: vitals, wound dressing, mobility</div>
          <div className="flex items-center gap-2"><Users className="h-4 w-4" /> Family present</div>
          {!accepted ? (
            <Button className="mt-2" onClick={() => setAccepted(true)}><CheckCircle2 className="h-4 w-4 mr-1" /> Accept visit</Button>
          ) : (
            <div className="text-teal-600 font-medium">Visit accepted</div>
          )}
          <div className="mt-2 p-3 border rounded-xl bg-white">
            <div className="font-medium mb-2">Supplies checklist</div>
            {["Gloves", "Sterile gauze", "Adhesive tape", "BP cuff"].map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={supplies.includes(s)} onChange={() => toggleSupply(s)} /> {s}
              </label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Visit Form" subtitle="Submit summary to nurse">
        <div className="grid gap-3 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <div><Label>Systolic</Label><Input placeholder="120" /></div>
            <div><Label>Diastolic</Label><Input placeholder="80" /></div>
            <div><Label>Pulse</Label><Input placeholder="76" /></div>
          </div>
          <div><Label>Notes</Label><Textarea placeholder="Wound edges clean, changed dressing" /></div>
          <div className="flex items-center gap-2"><input type="checkbox" /> <span>Flag concerning signs</span></div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setPhotoOpen(true)}>Add wound photo (stub)</Button>
            <Button onClick={() => setSubmitted(true)}>Submit Summary</Button>
          </div>
          {submitted && <div className="text-teal-600 text-sm">Summary sent. QA pending.</div>}
        </div>

        <Dialog open={photoOpen} onOpenChange={setPhotoOpen}>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>Upload wound photo</DialogTitle>
              <DialogDescription>No upload performed in demo.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <Input type="file" />
              <Label>Note</Label>
              <Textarea placeholder="Describe the photo context (lighting, angle)…" />
            </div>
            <DialogFooter><Button onClick={() => setPhotoOpen(false)}>Done</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Earnings" subtitle="Today">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-gray-50">
            <div className="text-2xl font-semibold">RWF 7,500</div>
            <div className="text-xs text-gray-600">3 visits</div>
          </div>
          <div className="p-3 rounded-xl bg-gray-50">
            <div className="text-2xl font-semibold">RWF 2,500</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div className="p-3 rounded-xl bg-gray-50">
            <div className="text-2xl font-semibold">RWF 5,000</div>
            <div className="text-xs text-gray-600">Paid</div>
          </div>
        </div>
      </Section>
    </div>
  );
}
