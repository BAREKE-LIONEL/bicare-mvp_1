import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion } from "framer-motion";
// shadcn/ui (real or stubbed)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays,
  TriangleAlert,
  Bot,
  PhoneCall,
  Stethoscope,
  MapPin,
  Clock,
  ShieldCheck,
  Activity,
  Hospital,
  UserRound,
  Users,
  CheckCircle2,
  MessageCircle,
  ScanFace,
  Bell,
  Cpu,
  Wallet,
  FileText,
} from "lucide-react";

/* =========================
   Assets (logo + fallback)
   ========================= */
const LOGO_URL = "/bicare-logo.png"; // put your PNG in public/bicare-logo.png
const LOGO_FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
      <rect width='64' height='64' rx='12' fill='#0d9488'/>
      <text x='50%' y='58%' text-anchor='middle' font-family='Inter,Arial' font-size='24' fill='#fff' font-weight='700'>Bi</text>
    </svg>`
  );

/* =========================
   i18n (RW default)
   ========================= */

/* =========================
   Small UI helpers
   ========================= */
const Section = ({ title, subtitle, right, children }) => (
  <Card className="rounded-2xl shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </div>
        {right ? <div>{right}</div> : null}
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const Pill = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 ${className}`}>{children}</span>
);

function ProgressRing({ size = 68, stroke = 8, progress = 0 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} className="block">
      <circle stroke="#eee" fill="transparent" strokeWidth={stroke} r={radius} cx={size / 2} cy={size / 2} />
      <circle
        stroke="currentColor"
        className="text-teal-500"
        fill="transparent"
        strokeLinecap="round"
        strokeWidth={stroke}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

/* =========================
   Demo Data
   ========================= */
const demoTasks = [
  { id: "med-am", label: "Take Amlodipine 5mg", channel: "app", due: "08:00" },
  { id: "wound-photo", label: "Upload wound photo", channel: "wa", due: "09:00" },
  { id: "exercise", label: "Do ankle pump exercise (10 reps)", channel: "app", due: "10:00" },
  { id: "education", label: "Read: Signs of infection", channel: "app", due: "Anytime" },
];

const guides = [
  { id: 1, name: "Aline U.", rating: 4.8, distance: 1.2, price: 2500, skills: ["Wound care", "Vitals"], region: "Kigali" },
  { id: 2, name: "Eric M.", rating: 4.6, distance: 2.4, price: 2200, skills: ["Diabetes", "Counselling"], region: "Kigali" },
  { id: 3, name: "Diane K.", rating: 4.9, distance: 0.9, price: 2800, skills: ["Post-surgery", "Mobility"], region: "Kigali" },
];

const redFlagSamples = [
  { id: "rf1", patient: "Solange N.", symptom: "Severe dizziness", sev: "high", mins: 2 },
  { id: "rf2", patient: "Jean P.", symptom: "Bleeding at wound site", sev: "critical", mins: 0 },
  { id: "rf3", patient: "Claudine U.", symptom: "Chest pain", sev: "high", mins: 4 },
];

/* =========================
   WhatsApp / USSD previews
   ========================= */
function OmniChannelPreview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* WhatsApp – chat style */}
      <Section title="WhatsApp" subtitle="Chat-style preview" right={<Badge variant="secondary">Demo</Badge>}>
        <div className="rounded-2xl bg-[#e5ddd5] p-4 border">
          <div className="mx-auto max-w-sm space-y-2">
            <div className="bg-white rounded-lg px-3 py-2 w-fit shadow text-sm">
              <div className="text-xs text-gray-500 mb-1">BiCare</div>
              <div className="whitespace-pre leading-6">{`1 Today’s tasks
2 Ask AI
3 Nurse
4 Book Help
5 Next Visit
6 Courses
7 Connections
8 Stop sharing`}</div>
            </div>
            <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 w-fit ml-auto shadow text-sm">2</div>
            <div className="bg-white rounded-lg px-3 py-2 w-fit shadow text-sm">Selected: Ask AI. Type your question…</div>
            <div className="mt-3 bg-white rounded-full px-3 py-2 text-sm text-gray-500 border">Type a message… (demo)</div>
          </div>
        </div>
      </Section>

      {/* USSD – terminal look */}
      <Section title="USSD / IVR" subtitle="Phone USSD terminal look">
        <div className="rounded-2xl bg-black p-4 border">
          <div className="mx-auto max-w-sm font-mono text-[13px] leading-6">
            <div className="bg-black text-green-400 rounded-lg p-3 border border-green-700 shadow-inner">
              <div>*xyz#</div>
              <div className="text-green-300">======================</div>
              <div>1. Tasks</div>
              <div>2. Reminders</div>
              <div>3. Talk to a nurse</div>
              <div>4. Book a guide</div>
              <div>5. Next visit</div>
              <div>6. Health tips</div>
              <div>7. Consent</div>
              <div>8. Language</div>
              <div className="text-green-300">----------------------</div>
              <div>Select: _</div>
            </div>
            <div className="text-green-600 mt-2">▮</div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* =========================
   Patient / Family
   ========================= */
function PatientHome() {
  const { t } = useTranslation();
  const [done, setDone] = useState(["education"]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [emrShared, setEmrShared] = useState(true);
  const progress = Math.round((done.length / demoTasks.length) * 100);

  const toggleTask = (id) => setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const dataChip = (fallback = "Local") => <Pill className={emrShared ? "text-teal-700 bg-teal-50" : "text-gray-700 bg-gray-100"}>{emrShared ? "EMR" : fallback}</Pill>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Tasks */}
      <Section title={t("Today’s Tasks")} subtitle={t("Tap to complete or snooze")}>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <ProgressRing progress={progress} />
            <div className="text-xs text-gray-500 mt-1">{progress}%</div>
          </div>
        </div>
        <div className="flex-1 grid gap-2">
          {demoTasks.map((t) => (
            <label key={t.id} className={`flex items-center gap-3 rounded-xl border p-3 ${done.includes(t.id) ? "bg-teal-50 border-teal-200" : "bg-white"}`}>
              <input type="checkbox" checked={done.includes(t.id)} onChange={() => toggleTask(t.id)} className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium text-sm">{t.label}</div>
                <div className="text-xs text-gray-500">Due {t.due} • via {t.channel.toUpperCase()}</div>
              </div>
              {done.includes(t.id) && <Badge className="bg-teal-600">Done</Badge>}
            </label>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          <Trans i18nKey="helpText">
            Need help? Use <span className="font-semibold">Ask AI</span> or press <span className="font-semibold">Red-Flag</span>.
          </Trans>
        </div>
      </Section>

      {/* Next Visit */}
      <Section
        title={t("Next Visit")}
        subtitle={t("Your upcoming appointment")}
        right={
          <Badge variant="secondary" className="gap-1">
            <CalendarDays className="h-3 w-3" /> D+3
          </Badge>
        }
      >
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Thu, Aug 21 • 10:30 AM</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Kigali Teaching Hospital – Ward B</div>
          <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Bring meds list, avoid food 6h prior</div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-2 w-full">{t("Add transport help?")}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle>{t("Transport assistance")}</DialogTitle>
                <DialogDescription>{t("We’ll notify nearby Care Guides for escort support.")}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <Label>Pickup location</Label>
                <Input placeholder="e.g., Kacyiru Bus Park" />
                <Label>Notes</Label>
                <Textarea placeholder="Wheelchair needed" />
              </div>
              <DialogFooter><Button>Notify Guides</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Section>

      {/* Vitals */}
      <Section title="Vitals (preview)" subtitle="Last 7 days" right={<Pill className="text-gray-600"><Activity className="h-3 w-3 mr-1" /> Read-only</Pill>}>
        <svg viewBox="0 0 300 120" className="w-full">
          <polyline fill="none" stroke="currentColor" className="text-teal-500" strokeWidth="3" points="0,90 40,80 80,85 120,70 160,75 200,65 240,68 280,60" />
          <text x="4" y="112" className="text-[10px] fill-gray-500">BP (systolic)</text>
        </svg>
        <div className="text-xs text-gray-500">Connected: Kigali Teaching Hospital</div>
      </Section>

      {/* Ask AI */}
      <Section
        title={t("Ask AI (with nurse backup)")}
        subtitle={t("Kinyarwanda • English")}
        right={<Badge className="bg-blue-600 text-white"><Bot className="h-3 w-3 mr-1" /> Online</Badge>}
      >
        <div className="grid gap-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {"Pain,Dizziness,Wound care,Side-effects,Diet,Medication timing"
              .split(",")
              .map((c) => (
                <Button key={c} variant="secondary" className="justify-start">
                  {t(c)}
                </Button>
              ))}
          </div>
          <div className="border rounded-xl p-3 bg-white">
            <div className="text-sm"><span className="font-semibold">{t("You:")}</span> {t("I feel very dizzy.")}</div>
            <div className="text-sm mt-1">
              <span className="font-semibold">{t("BiCare:")}</span>{" "}
              {t(
                "Dizziness can be caused by dehydration or medications. Sit down, drink water, and avoid sudden movements. If combined with chest pain or fainting, press Red-Flag to reach a nurse immediately."
              )}
            </div>
          </div>
          <div className="flex items-center gap-2"><Input disabled placeholder="Type a message (demo)" /><Button disabled>Send</Button></div>
          <div className="flex items-center gap-2 text-xs text-gray-600"><TriangleAlert className="h-3 w-3" /> Risky terms trigger nurse triage automatically.</div>
        </div>
      </Section>

      {/* Connections & Consent */}
      <Section title={t("Connections & Consent")} subtitle={t("Control who can view your data")} right={<Badge variant="outline" className="gap-1"><ShieldCheck className="h-3 w-3" /> 30 days left</Badge>}>
        <div className="flex items-center justify-between p-3 border rounded-xl bg-white">
          <div>
            <div className="font-medium">Kigali Teaching Hospital EMR</div>
            <div className="text-xs text-gray-500">Scopes: meds, diagnoses, allergies, next visit</div>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="share">Share</Label>
            <Switch id="share" checked={emrShared} onCheckedChange={setEmrShared} />
            <Button variant="outline">Revoke</Button>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2">Every access is logged. You can export a receipt anytime.</div>
      </Section>

      {/* Health Data Hub with source chips */}
      <Section title={t("Health Data Hub")} subtitle={t("Read-only view with source tags")}>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="border rounded-xl p-3 bg-white">
            <div className="font-semibold mb-2">{t("Medications")}</div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between"><span>Amlodipine 5mg</span>{dataChip("Local")}</li>
              <li className="flex items-center justify-between"><span>Paracetamol 1g PRN</span>{dataChip("Local")}</li>
            </ul>
          </div>
          <div className="border rounded-xl p-3 bg-white">
            <div className="font-semibold mb-2">{t("Conditions")}</div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between"><span>Hypertension</span>{dataChip("Local")}</li>
              <li className="flex items-center justify-between"><span>Post-op day 1</span>{dataChip("Local")}</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Care Plan */}
      <Section title={t("Care Plan")} subtitle={t("One-pager summary")}>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="border rounded-xl p-3 bg-white">
            <div className="font-semibold mb-2">Summary</div>
            <ul className="space-y-1">
              <li>• Next visit: Thu, Aug 21 • 10:30 AM</li>
              <li>• Meds: Amlodipine 5mg; Paracetamol 1g PRN</li>
              <li>• Conditions: Hypertension; Post-op day 1</li>
              <li>• Red-flag: Nurse within 10 minutes</li>
            </ul>
          </div>
          <div className="border rounded-xl p-3 bg-white">
            <div className="font-semibold mb-2">Reminder channels</div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> App</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> WhatsApp</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> SMS</label>
            </div>
            <Button variant="outline" className="mt-3"><FileText className="h-4 w-4 mr-1" /> Export Care Plan (PDF)</Button>
          </div>
        </div>
      </Section>

      {/* Micro-Courses */}
      <Section title={t("Micro-Courses")} subtitle={t("For families and home caregivers")}>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            {
              id: "course1",
              title: "Wound hygiene (10')",
              progress: 60,
              steps: [
                "Wash hands for 1 minute (soap & water).",
                "Clean around the wound, avoid touching the wound bed.",
                "Replace dressing carefully."
              ]
            },
            {
              id: "course2",
              title: "Taking vitals (8')",
              progress: 20,
              steps: [
                "Measure blood pressure seated (rest 5’).",
                "Record SYS/DIA & pulse.",
                "If abnormal, press Red-Flag."
              ]
            },
            {
              id: "course3",
              title: "Safe meds timing (6')",
              progress: 0,
              steps: [
                "Always read the medication instructions.",
                "Follow the scheduled times (reminders help).",
                "If you miss/double a dose, ask a nurse."
              ]
            }
          ].map((c) => (
            <div key={c.id} className="p-3 border rounded-xl bg-white">
              <div className="font-medium text-sm">{t(c.title)}</div>
              <div className="h-2 bg-gray-100 rounded mt-2 overflow-hidden">
                <div className="h-full bg-teal-500" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                <span>{c.progress}%</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant={c.progress ? "secondary" : "default"}>{c.progress ? t("Resume") : t("Start")}</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[460px]">
                    <DialogHeader>
                      <DialogTitle>{t(c.title)}</DialogTitle>
                      <DialogDescription>{t("Short practice lesson for families — no personal data involved.")}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3 text-sm">
                      <div className="rounded-lg border p-3 bg-gray-50">
                        <div className="font-medium mb-1">{t("Key steps")}</div>
                        <ul className="list-disc pl-5 space-y-1">
                          {c.steps.map((s, i) => (
                            <li key={i}>{t(s)}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="font-medium mb-1">{t("Safety tip")}</div>
                        <div>{t("If severe pain, vomiting, or faintness occurs — press Red-Flag.")}</div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>{t("Got it")}</Button>
                      <Button variant="secondary">{t("Review later")}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Book a Care Guide (improved) */}
      <Section title={t("Book a Care Guide")} subtitle={t("Nearby, vetted helpers")}>
        <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 grid gap-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input placeholder={t("Search by name or skill (e.g., Wound care)")} />
                <Select defaultValue="kigali" onValueChange={() => {}}>
                  <SelectTrigger className="sm:w-[200px]">
                    <SelectValue placeholder={t("Region")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kigali">Kigali</SelectItem>
                    <SelectItem value="musanze">Musanze</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            <div className="grid md:grid-cols-2 gap-3">
              {guides.map((g) => {
                const initials = `${g.name.split(" ")[0][0]}${g.name.split(" ")[1]?.[0] ?? ""}`;
                const active = selectedGuide === g.id;
                return (
                  <Card
                    key={g.id}
                    className={`rounded-xl border transition ${active ? "border-teal-300 ring-2 ring-teal-100" : "hover:border-gray-300"}`}
                    onClick={() => setSelectedGuide(g.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{g.name}</CardTitle>
                          <CardDescription>{g.region} • {g.distance} km</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <div className="flex flex-wrap gap-2">{g.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
                        <div className="text-sm text-gray-600">{g.rating} ★ • RWF {g.price}</div>
                        <Button variant="outline" className="justify-center">{t("Select")}</Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3">
            {!selectedGuide ? (
              <Card className="rounded-xl border-dashed">
                <CardContent className="p-6 text-sm text-gray-600">
                  {t("Pick a guide on the left to see details and payment.")}
                </CardContent>
              </Card>
            ) : (() => {
              const g = guides.find((x) => x.id === selectedGuide);
              const fn = g.name.split(" ")[0];
              return (
                <Card className="rounded-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{g.name}</CardTitle>
                    <CardDescription>{g.region} • {g.distance} km • {g.rating} ★</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <div className="flex flex-wrap gap-2">{g.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
                    <div className="text-sm">{t("Price")}: <span className="font-medium">RWF {g.price}</span></div>
                    <Dialog>
                      <DialogTrigger asChild><Button className="w-full">{t("Book {{name}}", { name: fn })}</Button></DialogTrigger>
                      <DialogContent className="sm:max-w-[420px]">
                        <DialogHeader>
                          <DialogTitle>{t("Confirm booking")}</DialogTitle>
                          <DialogDescription>{t("Mobile money payment will be simulated for this demo.")}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-3 text-sm">
                          <div className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Amount: RWF {g.price}</div>
                          <Label>Choose wallet</Label>
                          <Select defaultValue="mtn">
                            <SelectTrigger><SelectValue placeholder="Wallet" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mtn">MTN MoMo</SelectItem>
                              <SelectItem value="airtel">Airtel Money</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter>
                          <Button className="w-full" variant="default"><CheckCircle2 className="h-4 w-4 mr-1" /> {t("Simulate Payment Success")}</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              );
            })()}
          </div>
        </div>
      </Section>

      {/* Access Log */}
      <Section title={t("Access Log")} subtitle={t("Who read what, and when")}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Timestamp</th>
                <th className="py-2">Subject</th>
                <th className="py-2">Resource</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="py-2">2025-08-17 14:21</td><td>Nurse (KTH)</td><td>Medications</td><td>read</td></tr>
              <tr className="border-t"><td className="py-2">2025-08-17 14:22</td><td>BiCare Service</td><td>Next Visit</td><td>read</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex gap-2"><Button variant="outline"><FileText className="h-4 w-4 mr-1" /> Export PDF</Button><Button variant="outline">Refresh</Button></div>
      </Section>

      {/* WhatsApp / USSD previews */}
      <div className="lg:col-span-3"><OmniChannelPreview /></div>

      {/* Floating Red-Flag Button */}
      <button title="Red-Flag" className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
        <TriangleAlert className="h-6 w-6" />
      </button>
    </div>
  );
}

/* =========================
   Care Guide
   ========================= */
function CareGuide() {
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

/* =========================
   Nurse Console
   ========================= */
function NurseConsole() {
  const initial = redFlagSamples.map((r) => ({ ...r, log: [{ t: "14:01", msg: "Auto-detected red-flag" }] }));
  const [items, setItems] = useState(initial);
  const me = "Nurse A";
  const update = (id, patch) => setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const logAdd = (id, msg) => {
    const found = items.find((i) => i.id === id);
    update(id, { log: [...(found?.log || []), { t: "now", msg }] });
  };

  const take = (id) => { update(id, { owner: me }); logAdd(id, "Taken by Nurse A"); };
  const triage = (id) => { update(id, { action: "triaged" }); logAdd(id, "Triaged"); };
  const escalate = (id) => { update(id, { action: "escalated" }); logAdd(id, "Escalated to MD"); };
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

/* =========================
   Hospital / Insurer Portal
   ========================= */
function OrgPortal() {
  const [program, setProgram] = useState("postop");
  const [month, setMonth] = useState("2025-07");
  const [patientOpen, setPatientOpen] = useState(false);
  const [apiKey, setApiKey] = useState("bicare_demo_****_KEY");
  const regen = () => setApiKey("bicare_" + Math.random().toString(36).slice(2, 8) + "_KEY");

  const kpiBars = [
    { label: "PMPM", value: 1920, max: 2500 },
    { label: "Readmits (30d)", value: 18, max: 30 },
    { label: "D+3 kept", value: 12, max: 30 },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <Section title="Filters" subtitle="Pick program and month" right={<Badge variant="outline">Static demo</Badge>}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <Label className="min-w-[90px]">Program</Label>
            <Select value={program} onValueChange={setProgram}>
              <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="postop">Post-surgery</SelectItem>
                <SelectItem value="htn">Hypertension</SelectItem>
                <SelectItem value="dm">Diabetes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="min-w-[90px]">Month</Label>
            <Input value={month} onChange={(e) => setMonth(e.target.value)} placeholder="YYYY-MM" className="w-[160px]" />
          </div>
          <Button variant="secondary">Apply</Button>
        </div>
      </Section>

      <Section title="Members" subtitle="Search & view details">
        <div className="flex items-center gap-2">
          <Input placeholder="Search by name / ID (e.g., Solange)" />
          <Button onClick={() => setPatientOpen(true)}>Open</Button>
        </div>
        <Dialog open={patientOpen} onOpenChange={setPatientOpen}>
          <DialogContent className="sm:max-w-[540px]">
            <DialogHeader>
              <DialogTitle>Member: Solange N.</DialogTitle>
              <DialogDescription>Static demo profile</DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="font-medium mb-1">Summary</div>
                <div>Program: Post-surgery</div>
                <div>Next visit: Aug 21</div>
                <div>Last contact: 2m ago</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="font-medium mb-1">Clinical</div>
                <div>Conditions: Hypertension</div>
                <div>Meds: Amlodipine</div>
                <div>Last BP: 136/84</div>
              </div>
              <div className="md:col-span-2 p-3 rounded-lg border">
                <div className="font-medium mb-1">Consent</div>
                <div className="text-xs text-gray-600">KTH EMR: shared • Access receipt available</div>
              </div>
            </div>
            <DialogFooter><Button onClick={() => setPatientOpen(false)}>Close</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Cohorts" subtitle="Discharge bundles & programs">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-4 rounded-xl bg-blue-50"><div className="text-2xl font-semibold">128</div><div className="text-xs text-gray-600">Post-surgery</div></div>
          <div className="p-4 rounded-xl bg-teal-50"><div className="text-2xl font-semibold">214</div><div className="text-xs text-gray-600">Hypertension</div></div>
          <div className="p-4 rounded-xl bg-purple-50"><div className="text-2xl font-semibold">96</div><div className="text-xs text-gray-600">Diabetes</div></div>
        </div>
      </Section>

      <Section title="Alerts" subtitle="SLA & no-shows" right={<Badge variant="secondary"><Bell className="h-3 w-3 mr-1" /> 10-min</Badge>}>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between p-3 border rounded-xl bg-white"><span>3 red-flags nearing 10-min SLA</span><div className="flex gap-2"><Button variant="outline" size="sm">Open queue</Button><Button size="sm">Notify nurse lead</Button></div></div>
          <div className="flex items-center justify-between p-3 border rounded-xl bg-white"><span>2 missed D+3 follow-ups</span><div className="flex gap-2"><Button variant="outline" size="sm">View list</Button><Button size="sm">Send reminder</Button></div></div>
        </div>
      </Section>

      <Section title="Monthly KPIs" subtitle="PMPM & outcomes" right={<Badge variant="secondary">{month}</Badge>}>
        <div className="grid md:grid-cols-3 gap-3">
          {kpiBars.map((b, i) => {
            const pct = Math.min(100, Math.round((b.value / b.max) * 100));
            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="text-sm text-gray-600 mb-1">{b.label}</div>
                <div className="h-2 bg-white rounded overflow-hidden border">
                  <div className="h-full bg-teal-500" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-2 text-xs text-gray-700">
                  {b.label === "PMPM" ? `RWF ${b.value.toLocaleString()}` : `${b.value}%`}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Cohort Builder" subtitle="Define inclusion rules (UI only)">
        <div className="grid gap-2 text-sm">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Program: {program}</Badge>
            <Badge variant="secondary">Region: Kigali</Badge>
            <Badge variant="secondary">Age: 40–70</Badge>
            <Badge variant="secondary">Consent: EMR shared</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Add rule</Button>
            <Button>Simulate count</Button>
          </div>
        </div>
      </Section>

      <Section title="Billing" subtitle="PMPM & exports">
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-gray-50">
            <div className="text-xs text-gray-600 mb-2">PMPM summary (static)</div>
            <div className="text-lg font-semibold">RWF 1,920</div>
          </div>
          <div className="p-3 rounded-xl bg-white border flex items-center justify-between">
            <span>Export invoice CSV</span>
            <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1" /> Export</Button>
          </div>
        </div>
      </Section>

      <Section title="Roles & API" subtitle="Access control (static)">
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-white border">
            <div className="font-medium mb-2">Users</div>
            <div className="flex items-center justify-between"><span>Alice</span><Badge>admin</Badge></div>
            <div className="flex items-center justify-between"><span>Ben</span><Badge variant="secondary">analyst</Badge></div>
            <div className="flex items-center justify-between"><span>Diana</span><Badge variant="outline">viewer</Badge></div>
            <Button variant="outline" size="sm" className="mt-2">Invite user</Button>
          </div>
          <div className="p-3 rounded-xl bg-white border">
            <div className="font-medium mb-2">API keys & webhooks</div>
            <div className="flex items-center gap-2"><Input value={apiKey} readOnly className="font-mono" /><Button size="sm" onClick={regen}>Regenerate</Button></div>
            <div className="mt-2"><Label>Webhook URL</Label><Input placeholder="https://example.org/webhooks/bicare" /></div>
          </div>
        </div>
      </Section>

      <Section title="Policies & Exports" subtitle="Retention, consent, schedules">
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-white border">
            <div className="font-medium mb-1">Data retention</div>
            <Select defaultValue="12m" onValueChange={() => {}}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="6m">6 months</SelectItem>
                <SelectItem value="12m">12 months</SelectItem>
                <SelectItem value="24m">24 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-3 rounded-xl bg-white border">
            <div className="font-medium mb-1">Consent policy</div>
            <div className="text-xs text-gray-600">Consent receipts required for all access.</div>
          </div>
          <div className="p-3 rounded-xl bg-white border">
            <div className="font-medium mb-1">Scheduled exports</div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Send KPI CSV monthly</label>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* =========================
   Root – App Shell
   ========================= */
export default function BiCareStaticMVP() {
  const [role, setRole] = useState("patient"); // "patient" | "guide" | "nurse" | "org"
  const [logoSrc, setLogoSrc] = useState(LOGO_URL);
  const { t, i18n } = useTranslation();

  return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl overflow-hidden bg-white border shadow grid place-items-center">
                <img
                  src={logoSrc}
                  alt="BiCare 360"
                  className="h-9 w-9 object-contain"
                  onError={() => setLogoSrc(LOGO_FALLBACK_SVG)}
                />
              </div>
              <div>
                <div className="font-semibold text-lg">BiCare 360</div>
                <div className="text-xs text-gray-500">{t("Continuity of care — at home")}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Select value={i18n.language} onValueChange={(lng) => i18n.changeLanguage(lng)}>
                <SelectTrigger className="w-[120px]"><SelectValue placeholder="Language" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rw">Kinyarwanda</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>

              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">{t("Patient / Family")}</SelectItem>
                  <SelectItem value="guide">{t("Care Guide")}</SelectItem>
                  <SelectItem value="nurse">{t("Nurse")}</SelectItem>
                  <SelectItem value="org">{t("Hospital / Insurer")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 grid gap-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="rounded-2xl">
              <CardContent className="py-5">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-teal-600" /><div><div className="font-medium">{t("Consent-first")}</div><div className="text-sm text-gray-600">{t("Patient controls sharing & access logs")}</div></div></div>
                  <div className="flex items-center gap-3"><TriangleAlert className="h-5 w-5 text-red-600" /><div><div className="font-medium">{t("Nurse within 10 min")}</div><div className="text-sm text-gray-600">{t("Red-flags route to live triage")}</div></div></div>
                  <div className="flex items-center gap-3"><PhoneCall className="h-5 w-5 text-blue-600" /><div><div className="font-medium">{t("Omni-channel")}</div><div className="text-sm text-gray-600">App, WhatsApp, USSD, IVR</div></div></div>
                  <div className="flex items-center gap-3"><Cpu className="h-5 w-5 text-purple-600" /><div><div className="font-medium">AI + Human</div><div className="text-sm text-gray-600">{t("Guidance with safe handoff")}</div></div></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {role === "patient" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-semibold flex items-center gap-2"><UserRound className="h-5 w-5" /> {t("Patient Portal")}</div>
                <div className="flex items-center gap-2 text-sm"><Badge variant="secondary">RW/EN</Badge><Badge variant="outline">Demo only</Badge></div>
              </div>
              <PatientHome />
            </motion.div>
          )}

          {role === "guide" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-lg font-semibold flex items-center gap-2 mb-2"><Users className="h-5 w-5" /> {t("Care Guide App")}</div>
              <CareGuide />
            </motion.div>
          )}

          {role === "nurse" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-lg font-semibold flex items-center gap-2 mb-2"><Stethoscope className="h-5 w-5" /> {t("Nurse Console")}</div>
              <NurseConsole />
            </motion.div>
          )}

          {role === "org" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-lg font-semibold flex items-center gap-2 mb-2"><Hospital className="h-5 w-5" /> {t("Hospital / Insurer")}</div>
              <OrgPortal />
            </motion.div>
          )}

          <footer className="text-xs text-gray-500 py-8">
            <div className="mx-auto max-w-7xl px-4 flex items-center justify-center gap-2">
              <img src={logoSrc} onError={(e) => (e.currentTarget.src = LOGO_FALLBACK_SVG)} alt="BiCare 360" className="h-5 w-5 object-contain" />
              <span>BiCare 360 — MVP static demo (no real data). © 2025</span>
            </div>
          </footer>
        </main>
      </div>
  );
}
