import React, { useState } from "react";
import { useLang, T } from "@/components/LangContext";
import { Section, Pill } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays,
  TriangleAlert,
  Bot,
  MapPin,
  Clock,
  ShieldCheck,
  Activity,
  Wallet,
  FileText,
} from "lucide-react";

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

function OmniChannelPreview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Section title="WhatsApp" subtitle="Chat-style preview" right={<Badge variant="secondary">Demo</Badge>}>
        <div className="rounded-2xl bg-[#e5ddd5] p-4 border">
          <div className="mx-auto max-w-sm space-y-2">
            <div className="bg-white rounded-lg px-3 py-2 w-fit shadow text-sm">
              <div className="text-xs text-gray-500 mb-1">BiCare</div>
              <div className="whitespace-pre leading-6">{`1 Today’s tasks\n2 Ask AI\n3 Nurse\n4 Book Help\n5 Next Visit\n6 Courses\n7 Connections\n8 Stop sharing`}</div>
            </div>
            <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 w-fit ml-auto shadow text-sm">2</div>
            <div className="bg-white rounded-lg px-3 py-2 w-fit shadow text-sm">Selected: Ask AI. Type your question…</div>
            <div className="mt-3 bg-white rounded-full px-3 py-2 text-sm text-gray-500 border">Type a message… (demo)</div>
          </div>
        </div>
      </Section>

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

export default function PatientHome() {
  const { lang } = useLang();
  const [done, setDone] = useState(["education"]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [emrShared, setEmrShared] = useState(true);
  const progress = Math.round((done.length / demoTasks.length) * 100);

  const toggleTask = (id) => setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const dataChip = (fallback = "Local") => <Pill className={emrShared ? "text-teal-700 bg-teal-50" : "text-gray-700 bg-gray-100"}>{emrShared ? "EMR" : fallback}</Pill>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section
        title={<T rw="Imirimo y'uyu munsi" en="Today’s Tasks" />}
        subtitle={<T rw="Kanda urangize cyangwa ushireho kwibutsa" en="Tap to complete or snooze" />}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <ProgressRing progress={progress} />
            <div className="text-xs text-gray-500 mt-1">{progress}%</div>
          </div>
        </div>
        <div className="flex-1 grid gap-2">
          {demoTasks.map((t) => (
            <label
              key={t.id}
              className={`flex items-center gap-3 rounded-xl border p-3 ${done.includes(t.id) ? "bg-teal-50 border-teal-200" : "bg-white"}`}
            >
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
          {lang === "rw" ? (
            <>Ukeneye ubufasha? Koresha <span className="font-semibold">Saba AI</span> cyangwa kande <span className="font-semibold">Red-Flag</span>.</>
          ) : (
            <>Need help? Use <span className="font-semibold">Ask AI</span> or press <span className="font-semibold">Red-Flag</span>.</>
          )}
        </div>
      </Section>

      <Section
        title={<T rw="Uruzinduko rukurikira" en="Next Visit" />}
        subtitle={<T rw="Rendez-vous yawe ikurikira" en="Your upcoming appointment" />}
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
              <Button className="mt-2 w-full"><T rw="Ukeneye ubufasha bwo gutwara?" en="Add transport help?" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle><T rw="Ubufasha bwo gutwara" en="Transport assistance" /></DialogTitle>
                <DialogDescription>
                  <T rw="Tumenyesha Abafasha bari hafi" en="We’ll notify nearby Care Guides for escort support." />
                </DialogDescription>
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

      <Section
        title="Vitals (preview)"
        subtitle="Last 7 days"
        right={<Pill className="text-gray-600"><Activity className="h-3 w-3 mr-1" /> Read-only</Pill>}
      >
        <svg viewBox="0 0 300 120" className="w-full">
          <polyline fill="none" stroke="currentColor" className="text-teal-500" strokeWidth="3" points="0,90 40,80 80,85 120,70 160,75 200,65 240,68 280,60" />
          <text x="4" y="112" className="text-[10px] fill-gray-500">BP (systolic)</text>
        </svg>
        <div className="text-xs text-gray-500">Connected: Kigali Teaching Hospital</div>
      </Section>

      <Section
        title={<T rw="Saba AI (ifite umuforomo)" en="Ask AI (with nurse backup)" />}
        subtitle={<T rw="Kinyarwanda • Icyongereza" en="Kinyarwanda • English" />}
        right={<Badge className="bg-blue-600 text-white"><Bot className="h-3 w-3 mr-1" /> Online</Badge>}
      >
        <div className="grid gap-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(lang === "rw"
              ? "Uburibwe,Kuzungera,Kwita ku gisebe,Ingaruka z'imiti,Indyo,Amasaha y'imiti"
              : "Pain,Dizziness,Wound care,Side-effects,Diet,Medication timing")
              .split(",")
              .map((c) => (
                <Button key={c} variant="secondary" className="justify-start">{c}</Button>
              ))}
          </div>
          <div className="border rounded-xl p-3 bg-white">
            <div className="text-sm"><span className="font-semibold"><T rw="Wowe:" en="You:" /></span> <T rw="Ndumva umutwe unyerera cyane." en="I feel very dizzy." /></div>
            <div className="text-sm mt-1">
              <span className="font-semibold"><T rw="BiCare:" en="BiCare:" /></span>{" "}
              <T
                rw="Kuzungera gashobora guterwa no kubura amazi mu mubiri cyangwa imiti urimo gufata. Icara hasi, nywa amazi, kandi wirinde guhaguruka utunguranye. Niba bijyanye n’ububabare mu gituza cyangwa gusinzira, kanda Red-Flag kugira ngo uhabwe umuforomo ako kanya."
                en="Dizziness can be caused by dehydration or medications. Sit down, drink water, and avoid sudden movements. If combined with chest pain or fainting, press Red-Flag to reach a nurse immediately."
              />
            </div>
          </div>
          <div className="flex items-center gap-2"><Input disabled placeholder="Type a message (demo)" /><Button disabled>Send</Button></div>
          <div className="flex items-center gap-2 text-xs text-gray-600"><TriangleAlert className="h-3 w-3" /> Risky terms trigger nurse triage automatically.</div>
        </div>
      </Section>

      <Section
        title={<T rw="Uhuza & Uruhushya" en="Connections & Consent" />}
        subtitle={<T rw="Gena abareba amakuru yawe" en="Control who can view your data" />}
        right={<Badge variant="outline" className="gap-1"><ShieldCheck className="h-3 w-3" /> 30 days left</Badge>}
      >
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

      <Section
        title={<T rw="Iby'ubuzima" en="Health Data Hub" />}
        subtitle={<T rw="Gusoma gusa n’inkomoko y’amakuru" en="Read-only view with source tags" />}
      >
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="border rounded-xl p-3 bg-white">
            <div className="font-semibold mb-2"><T rw="Imiti" en="Medications" /></div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between"><span>Amlodipine 5mg</span>{dataChip("Local")}</li>
              <li className="flex items-center justify-between"><span>Paracetamol 1g PRN</span>{dataChip("Local")}</li>
            </ul>
          </div>
          <div className="border rounded-xl p-3 bg-white">
            <div className="font-semibold mb-2"><T rw="Ibyorezo/Indwara" en="Conditions" /></div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between"><span>Hypertension</span>{dataChip("Local")}</li>
              <li className="flex items-center justify-between"><span>Post-op day 1</span>{dataChip("Local")}</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        title={<T rw="Gahunda yo Kwita ku Murwayi" en="Care Plan" />}
        subtitle={<T rw="Impine y’ingenzi" en="One-pager summary" />}
      >
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

      <Section
        title={<T rw="Amasomo yoroheje" en="Micro-Courses" />}
        subtitle={<T rw="Ubufasha ku miryango n'abafasha bo mu rugo" en="For families and home caregivers" />}
      >
        <div className="grid md:grid-cols-3 gap-3">
          {[
            {
              id: "course1",
              titleRw: "Isuku y'igisebe (10')",
              titleEn: "Wound hygiene (10')",
              progress: 60,
              stepsRw: ["Karaba intoki iminota 1 (amazi & isabune).", "Koza ku ruhande rw'igisebe, ntukore ku rufunzo.", "Hindura dressing neza."],
              stepsEn: ["Wash hands for 1 minute (soap & water).", "Clean around the wound, avoid touching the wound bed.", "Replace dressing carefully."],
            },
            {
              id: "course2",
              titleRw: "Gupima ibipimo by'ingenzi (8')",
              titleEn: "Taking vitals (8')",
              progress: 20,
              stepsRw: ["Fata BP wicaye (uruhuke iminota 5).", "Andika SYS/DIA & pulse.", "Ubonye ibidasanzwe, kanda Red-Flag."],
              stepsEn: ["Measure blood pressure seated (rest 5’).", "Record SYS/DIA & pulse.", "If abnormal, press Red-Flag."],
            },
            {
              id: "course3",
              titleRw: "Guteganya amasaha y’imiti (6')",
              titleEn: "Safe meds timing (6')",
              progress: 0,
              stepsRw: ["Soma amabwiriza y’umuti.", "Kurikiza amasaha wahawe (kwibutsa).", "Niba wibeshye ku rugero, saba umuforomo."],
              stepsEn: ["Always read the medication instructions.", "Follow the scheduled times (reminders help).", "If you miss/double a dose, ask a nurse."],
            },
          ].map((c) => (
            <div key={c.id} className="p-3 border rounded-xl bg-white">
              <div className="font-medium text-sm"><T rw={c.titleRw} en={c.titleEn} /></div>
              <div className="h-2 bg-gray-100 rounded mt-2 overflow-hidden">
                <div className="h-full bg-teal-500" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                <span>{c.progress}%</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant={c.progress ? "secondary" : "default"}>{c.progress ? <T rw="Komeza" en="Resume" /> : <T rw="Tangira" en="Start" />}</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[460px]">
                    <DialogHeader>
                      <DialogTitle><T rw={c.titleRw} en={c.titleEn} /></DialogTitle>
                      <DialogDescription><T rw="Isomo rito ry'imyitozo ku miryango — nta makuru bwite atanzwe." en="Short practice lesson for families — no personal data involved." /></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3 text-sm">
                      <div className="rounded-lg border p-3 bg-gray-50">
                        <div className="font-medium mb-1"><T rw="Intambwe z'ingenzi" en="Key steps" /></div>
                        <ul className="list-disc pl-5 space-y-1">
                          {(lang === "rw" ? c.stepsRw : c.stepsEn).map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="font-medium mb-1"><T rw="Icyitonderwa" en="Safety tip" /></div>
                        <div><T rw="Niba habaye ububabare bukabije, kuruka, cyangwa umwijima mu maso — kanda Red-Flag." en="If severe pain, vomiting, or faintness occurs — press Red-Flag." /></div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button><T rw="Birumvikana" en="Got it" /></Button>
                      <Button variant="secondary"><T rw="Subira nyuma" en="Review later" /></Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={<T rw="Shaka Uwamufasha" en="Book a Care Guide" />}
        subtitle={<T rw="Abari hafi, babanje kugenzurwa" en="Nearby, vetted helpers" />}
      >
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 grid gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder={lang === "rw" ? "Shakisha izina cyangwa ubumenyi (n: Wound care)" : "Search by name or skill (e.g., Wound care)"} />
              <Select defaultValue="kigali" onValueChange={() => {}}>
                <SelectTrigger className="sm:w-[200px]">
                  <SelectValue placeholder={lang === "rw" ? "Intara" : "Region"} />
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
                  <Section
                    key={g.id}
                    title={
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-base font-medium">{g.name}</div>
                          <div className="text-sm text-gray-500">{g.region} • {g.distance} km</div>
                        </div>
                      </div>
                    }
                    right={<div />}
                  >
                    <div className="grid gap-2">
                      <div className="flex flex-wrap gap-2">{g.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
                      <div className="text-sm text-gray-600">{g.rating} ★ • RWF {g.price}</div>
                      <Button variant="outline" className="justify-center" onClick={() => setSelectedGuide(g.id)}>
                        {lang === "rw" ? "Hitamo" : "Select"}
                      </Button>
                    </div>
                  </Section>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3">
            {!selectedGuide ? (
              <Section title="" subtitle="">
                <div className="p-6 text-sm text-gray-600">
                  {lang === "rw" ? "Hitamo umufasha ku ruhande rw'ibumoso kugira ngo ubone ibisobanuro n'ubwishyu." : "Pick a guide on the left to see details and payment."}
                </div>
              </Section>
            ) : (() => {
              const g = guides.find((x) => x.id === selectedGuide);
              const fn = g.name.split(" ")[0];
              return (
                <Section title={g.name} subtitle={`${g.region} • ${g.distance} km • ${g.rating} ★`}>
                  <div className="grid gap-3">
                    <div className="flex flex-wrap gap-2">{g.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
                    <div className="text-sm">{lang === "rw" ? "Igiciro" : "Price"}: <span className="font-medium">RWF {g.price}</span></div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">{lang === "rw" ? `Bukinga ${fn}` : `Book ${fn}`}</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[420px]">
                        <DialogHeader>
                          <DialogTitle>{lang === "rw" ? "Kwemeza ubufasha" : "Confirm booking"}</DialogTitle>
                          <DialogDescription>{lang === "rw" ? "Kwishyura kuri mobile money (demo)." : "Mobile money payment will be simulated for this demo."}</DialogDescription>
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
                        <DialogFooter><Button onClick={() => setSelectedGuide(null)}>Pay</Button></DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Section>
              );
            })()}
          </div>
        </div>
      </Section>

      <div className="lg:col-span-3"><OmniChannelPreview /></div>
    </div>
  );
}
