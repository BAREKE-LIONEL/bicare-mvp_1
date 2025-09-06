import React, { useState } from "react";
import { motion } from "framer-motion";
import { LangCtx, T } from "@/components/LangContext";
import PatientHome from "@/components/PatientHome";
import CareGuide from "@/components/CareGuide";
import NurseConsole from "@/components/NurseConsole";
import OrgPortal from "@/components/OrgPortal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ShieldCheck,
  TriangleAlert,
  PhoneCall,
  Cpu,
  UserRound,
  Users,
  Stethoscope,
  Hospital,
} from "lucide-react";

const LOGO_URL = "/bicare-logo.png";
const LOGO_FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
      <rect width='64' height='64' rx='12' fill='#0d9488'/>
      <text x='50%' y='58%' text-anchor='middle' font-family='Inter,Arial' font-size='24' fill='#fff' font-weight='700'>Bi</text>
    </svg>`
  );

export default function App() {
  const [role, setRole] = useState("patient");
  const [lang, setLang] = useState("rw");
  const [logoSrc, setLogoSrc] = useState(LOGO_URL);

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
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
                <div className="text-xs text-gray-500"><T rw="Imbata y'ubuvuzi ihoraho — mu rugo" en="Continuity of care — at home" /></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Select value={lang} onValueChange={setLang}>
                <SelectTrigger className="w-[120px]"><SelectValue placeholder="Language" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rw">Kinyarwanda</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>

              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient"><T rw="Umurwayi / Umuryango" en="Patient / Family" /></SelectItem>
                  <SelectItem value="guide"><T rw="Umufasha" en="Care Guide" /></SelectItem>
                  <SelectItem value="nurse"><T rw="Umuforomo" en="Nurse" /></SelectItem>
                  <SelectItem value="org"><T rw="Ivuriro / Mutuelle" en="Hospital / Insurer" /></SelectItem>
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
                  <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-teal-600" /><div><div className="font-medium"><T rw="Icya mbere: Uruhushya" en="Consent-first" /></div><div className="text-sm text-gray-600"><T rw="Ugenzura gusangira & umukono w’uburenganzira" en="Patient controls sharing & access logs" /></div></div></div>
                  <div className="flex items-center gap-3"><TriangleAlert className="h-5 w-5 text-red-600" /><div><div className="font-medium"><T rw="Umuforomo mu minota 10" en="Nurse within 10 min" /></div><div className="text-sm text-gray-600"><T rw="Red-flag ijya kuri triage ihita" en="Red-flags route to live triage" /></div></div></div>
                  <div className="flex items-center gap-3"><PhoneCall className="h-5 w-5 text-blue-600" /><div><div className="font-medium"><T rw="Imiyoboro myinshi" en="Omni-channel" /></div><div className="text-sm text-gray-600">App, WhatsApp, USSD, IVR</div></div></div>
                  <div className="flex items-center gap-3"><Cpu className="h-5 w-5 text-purple-600" /><div><div className="font-medium">AI + Human</div><div className="text-sm text-gray-600"><T rw="Inyunganizi n’isesengura, bijyana n’umuntu ubishinzwe" en="Guidance with safe handoff" /></div></div></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {role === "patient" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-semibold flex items-center gap-2"><UserRound className="h-5 w-5" /> <T rw="Umuyoboro w'Umurwayi" en="Patient Portal" /></div>
                <div className="flex items-center gap-2 text-sm"><Badge variant="secondary">RW/EN</Badge><Badge variant="outline">Demo only</Badge></div>
              </div>
              <PatientHome />
            </motion.div>
          )}

          {role === "guide" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-lg font-semibold flex items-center gap-2 mb-2"><Users className="h-5 w-5" /> <T rw="App ya Abafasha" en="Care Guide App" /></div>
              <CareGuide />
            </motion.div>
          )}

          {role === "nurse" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-lg font-semibold flex items-center gap-2 mb-2"><Stethoscope className="h-5 w-5" /> <T rw="Ikibaho cy’Umuforomo" en="Nurse Console" /></div>
              <NurseConsole />
            </motion.div>
          )}

          {role === "org" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-lg font-semibold flex items-center gap-2 mb-2"><Hospital className="h-5 w-5" /> <T rw="Ivuriro / Mutuelle" en="Hospital / Insurer" /></div>
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
    </LangCtx.Provider>
  );
}
