"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Clock,
  Search,
  BookOpen,
  School,
  CalendarDays,
  Coffee,
  Trash2,
  Bot,
  Users,
  AlarmClock,
  PawPrint,
  Plane,
  Apple,
  Sparkles,
  Smartphone,
  Wind,
  Laptop,
  Rocket,
  Languages,
  Brain,
  ShoppingCart,
  UserCheck,
  UtensilsCrossed,
  Guitar,
  Thermometer,
  Moon,
  Shirt,
  Bitcoin,
  Newspaper,
  Dna,
  Microscope,
  Target,
  PenLine,
  Mail,
  Building2,
  Hotel,
  Package,
  Timer,
  Shield,
  Lightbulb,
  FileText,
  Megaphone,
  ChefHat,
  MapPin,
  Pill,
  Landmark,
  TrendingDown,
  RotateCcw,
  Bird,
  Presentation,
  Dog,
  BedDouble,
  Stethoscope,
  Briefcase,
  TreePine,
  Utensils,
  Compass,
  HeartPulse,
  Banknote,
  Music,
  Soup,
  Candy,
  Fish,
  Waves,
  Flower2,
  Store,
  Cpu,
  CupSoda,
  Pickaxe,
  Fingerprint,
  Recycle,
  Rabbit,
  MapPinned,
  Bug,
  ShieldCheck,
  Leaf,
  Mountain,
  IceCream2,
  Snowflake,
  Car,
  Palette,
  Container,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReadingExercise } from "@/components/reading/reading-exercise";

interface PassageSummary {
  id: string;
  slug: string;
  title: string;
  titleVi: string;
  level: string;
  category: string;
  wordCount: number;
  questionCount: number;
}

interface PassageFull {
  id: string;
  slug: string;
  title: string;
  titleVi: string;
  level: string;
  category: string;
  passage: string;
  wordCount: number;
  questions: Array<{ id: string; kind: string; question: string; options: string[]; order: number }>;
}

const levelFilters = [
  { label: "Tất cả", value: "all" },
  { label: "A1", value: "A1" },
  { label: "A2", value: "A2" },
  { label: "B1", value: "B1" },
  { label: "B2", value: "B2" },
  { label: "C1", value: "C1" },
] as const;

const categoryLabels: Record<string, string> = {
  "daily-life": "Đời sống",
  culture: "Văn hóa",
  environment: "Môi trường",
  technology: "Công nghệ",
  science: "Khoa học",
  business: "Kinh doanh",
  health: "Sức khỏe",
  travel: "Du lịch",
  animals: "Động vật",
  ielts: "IELTS Practice",
  toeic: "TOEIC Practice",
};

function readingTime(words: number) {
  return Math.max(1, Math.ceil(words / 150));
}

function difficultyFromLevel(level: string): { label: string; color: string } {
  if (["A1", "A2"].includes(level)) return { label: "Easy", color: "text-emerald-400" };
  if (["B1", "B2"].includes(level)) return { label: "Medium", color: "text-amber-400" };
  return { label: "Hard", color: "text-red-400" };
}

const coverStyles: Record<string, { gradient: string; icon: LucideIcon; accent: string; glow: string }> = {
  "my-school":                    { gradient: "from-blue-900/60 via-[#132744] to-[#0f1e38]", icon: School, accent: "text-blue-400/50", glow: "bg-blue-500/10" },
  "weekend-plans":                { gradient: "from-indigo-900/60 via-[#161540] to-[#100e30]", icon: CalendarDays, accent: "text-indigo-400/50", glow: "bg-indigo-500/10" },
  "coffee-culture-vietnam":       { gradient: "from-amber-900/60 via-[#2a220e] to-[#1e1a08]", icon: Coffee, accent: "text-amber-400/50", glow: "bg-amber-500/10" },
  "plastic-pollution":            { gradient: "from-emerald-900/60 via-[#0e2a22] to-[#0a1e18]", icon: Trash2, accent: "text-emerald-400/50", glow: "bg-emerald-500/10" },
  "ai-ethics":                    { gradient: "from-cyan-900/60 via-[#0e2438] to-[#0a1a2e]", icon: Bot, accent: "text-cyan-400/50", glow: "bg-cyan-500/10" },
  "my-family":                    { gradient: "from-purple-900/60 via-[#1e1340] to-[#150e30]", icon: Users, accent: "text-purple-400/50", glow: "bg-purple-500/10" },
  "my-daily-routine":             { gradient: "from-sky-900/60 via-[#0e2238] to-[#0a1a2e]", icon: AlarmClock, accent: "text-sky-400/50", glow: "bg-sky-500/10" },
  "the-pet-cat":                  { gradient: "from-orange-900/60 via-[#2a1e0e] to-[#1e1608]", icon: PawPrint, accent: "text-orange-400/50", glow: "bg-orange-500/10" },
  "a-trip-to-da-lat":             { gradient: "from-teal-900/60 via-[#0e2a28] to-[#0a1e1c]", icon: Plane, accent: "text-teal-400/50", glow: "bg-teal-500/10" },
  "healthy-eating-habits":        { gradient: "from-lime-900/60 via-[#1a2a0e] to-[#141e08]", icon: Apple, accent: "text-lime-400/50", glow: "bg-lime-500/10" },
  "tet-holiday":                  { gradient: "from-red-900/60 via-[#2a1018] to-[#1e0c12]", icon: Sparkles, accent: "text-red-400/50", glow: "bg-red-500/10" },
  "social-media-impact":          { gradient: "from-pink-900/60 via-[#2a1024] to-[#1e0c1a]", icon: Smartphone, accent: "text-pink-400/50", glow: "bg-pink-500/10" },
  "renewable-energy":             { gradient: "from-green-900/60 via-[#0e2a16] to-[#0a1e10]", icon: Wind, accent: "text-green-400/50", glow: "bg-green-500/10" },
  "remote-work-revolution":       { gradient: "from-violet-900/60 via-[#1e1542] to-[#150e32]", icon: Laptop, accent: "text-violet-400/50", glow: "bg-violet-500/10" },
  "space-exploration-2024":       { gradient: "from-slate-800/80 via-[#1a1e2e] to-[#121520]", icon: Rocket, accent: "text-slate-300/50", glow: "bg-slate-400/10" },
  "language-extinction":          { gradient: "from-rose-900/60 via-[#2a1420] to-[#1e0e18]", icon: Languages, accent: "text-rose-400/50", glow: "bg-rose-500/10" },
  "gut-brain-connection":         { gradient: "from-fuchsia-900/60 via-[#2a1030] to-[#1e0c22]", icon: Brain, accent: "text-fuchsia-400/50", glow: "bg-fuchsia-500/10" },
  "at-the-supermarket":           { gradient: "from-yellow-900/60 via-[#2a2408] to-[#1e1c06]", icon: ShoppingCart, accent: "text-yellow-400/50", glow: "bg-yellow-500/10" },
  "my-best-friend":               { gradient: "from-blue-900/60 via-[#132744] to-[#0f1e38]", icon: UserCheck, accent: "text-blue-400/50", glow: "bg-blue-500/10" },
  "vietnamese-street-food":       { gradient: "from-orange-900/60 via-[#2a1e0e] to-[#1e1608]", icon: UtensilsCrossed, accent: "text-orange-400/50", glow: "bg-orange-500/10" },
  "learning-a-musical-instrument":{ gradient: "from-violet-900/60 via-[#1e1542] to-[#150e32]", icon: Guitar, accent: "text-violet-400/50", glow: "bg-violet-500/10" },
  "global-warming-effects":       { gradient: "from-amber-900/60 via-[#2a220e] to-[#1e1a08]", icon: Thermometer, accent: "text-amber-400/50", glow: "bg-amber-500/10" },
  "sleep-importance":             { gradient: "from-indigo-900/60 via-[#161540] to-[#100e30]", icon: Moon, accent: "text-indigo-400/50", glow: "bg-indigo-500/10" },
  "fast-fashion-problem":         { gradient: "from-pink-900/60 via-[#2a1024] to-[#1e0c1a]", icon: Shirt, accent: "text-pink-400/50", glow: "bg-pink-500/10" },
  "cryptocurrency-explained":     { gradient: "from-yellow-900/60 via-[#2a2408] to-[#1e1c06]", icon: Bitcoin, accent: "text-yellow-400/50", glow: "bg-yellow-500/10" },
  "misinformation-age":           { gradient: "from-red-900/60 via-[#2a1018] to-[#1e0c12]", icon: Newspaper, accent: "text-red-400/50", glow: "bg-red-500/10" },
  "neuroplasticity":              { gradient: "from-emerald-900/60 via-[#0e2a22] to-[#0a1e18]", icon: Dna, accent: "text-emerald-400/50", glow: "bg-emerald-500/10" },
  "my-classroom":                 { gradient: "from-sky-900/60 via-[#0e2238] to-[#0a1a2e]", icon: School, accent: "text-sky-400/50", glow: "bg-sky-500/10" },
  "the-weather-today":            { gradient: "from-cyan-900/60 via-[#0e2438] to-[#0a1a2e]", icon: Wind, accent: "text-cyan-400/50", glow: "bg-cyan-500/10" },
  "ho-chi-minh-city":             { gradient: "from-rose-900/60 via-[#2a1420] to-[#1e0e18]", icon: Plane, accent: "text-rose-400/50", glow: "bg-rose-500/10" },
  "online-shopping":              { gradient: "from-violet-900/60 via-[#1e1542] to-[#150e32]", icon: ShoppingCart, accent: "text-violet-400/50", glow: "bg-violet-500/10" },
  "water-crisis":                 { gradient: "from-blue-900/60 via-[#132744] to-[#0f1e38]", icon: AlarmClock, accent: "text-blue-400/50", glow: "bg-blue-500/10" },
  "benefits-of-reading":          { gradient: "from-amber-900/60 via-[#2a220e] to-[#1e1a08]", icon: BookOpen, accent: "text-amber-400/50", glow: "bg-amber-500/10" },
  "mental-health-workplace":      { gradient: "from-teal-900/60 via-[#0e2a28] to-[#0a1e1c]", icon: Brain, accent: "text-teal-400/50", glow: "bg-teal-500/10" },
  "ocean-exploration":            { gradient: "from-indigo-900/60 via-[#161540] to-[#100e30]", icon: Microscope, accent: "text-indigo-400/50", glow: "bg-indigo-500/10" },
  "behavioral-economics":         { gradient: "from-orange-900/60 via-[#2a1e0e] to-[#1e1608]", icon: Target, accent: "text-orange-400/50", glow: "bg-orange-500/10" },
  "gene-editing-crispr":          { gradient: "from-green-900/60 via-[#0e2a16] to-[#0a1e10]", icon: Dna, accent: "text-green-400/50", glow: "bg-green-500/10" },
  "ielts-urban-farming":          { gradient: "from-lime-900/60 via-[#1a2a0e] to-[#141e08]", icon: Apple, accent: "text-lime-400/50", glow: "bg-lime-500/10" },
  "ielts-sleep-science":          { gradient: "from-indigo-900/60 via-[#161540] to-[#100e30]", icon: Moon, accent: "text-indigo-400/50", glow: "bg-indigo-500/10" },
  "ielts-consciousness":          { gradient: "from-fuchsia-900/60 via-[#2a1030] to-[#1e0c22]", icon: Brain, accent: "text-fuchsia-400/50", glow: "bg-fuchsia-500/10" },
  "ielts-general-apartment-guide": { gradient: "from-amber-900/60 via-[#2a220e] to-[#1e1a08]", icon: Building2, accent: "text-amber-400/50", glow: "bg-amber-500/10" },
  "toeic-part5-set1":             { gradient: "from-sky-900/60 via-[#0e2238] to-[#0a1a2e]", icon: PenLine, accent: "text-sky-400/50", glow: "bg-sky-500/10" },
  "toeic-part6-email":            { gradient: "from-blue-900/60 via-[#132744] to-[#0f1e38]", icon: Mail, accent: "text-blue-400/50", glow: "bg-blue-500/10" },
  "toeic-part7-advertisement":    { gradient: "from-violet-900/60 via-[#1e1542] to-[#150e32]", icon: Building2, accent: "text-violet-400/50", glow: "bg-violet-500/10" },
  "toeic-part7-double-passage":   { gradient: "from-teal-900/60 via-[#0e2a28] to-[#0a1e1c]", icon: Hotel, accent: "text-teal-400/50", glow: "bg-teal-500/10" },
  "toeic-part7-triple-passage":   { gradient: "from-cyan-900/60 via-[#0e2438] to-[#0a1a2e]", icon: Package, accent: "text-cyan-400/50", glow: "bg-cyan-500/10" },
  "ielts-timekeeping-history":    { gradient: "from-orange-900/60 via-[#2a1e0e] to-[#1e1608]", icon: Timer, accent: "text-orange-400/50", glow: "bg-orange-500/10" },
  "ielts-general-workplace-safety": { gradient: "from-red-900/60 via-[#2a1018] to-[#1e0c12]", icon: Shield, accent: "text-red-400/50", glow: "bg-red-500/10" },
  "ielts-decision-fatigue":       { gradient: "from-purple-900/60 via-[#1e1340] to-[#150e30]", icon: Lightbulb, accent: "text-purple-400/50", glow: "bg-purple-500/10" },
  "toeic-part5-set2":             { gradient: "from-sky-900/60 via-[#0e2040] to-[#0a1830]", icon: FileText, accent: "text-sky-400/50", glow: "bg-sky-500/10" },
  "toeic-part6-announcement":     { gradient: "from-amber-900/60 via-[#2a1e0e] to-[#1e1608]", icon: Megaphone, accent: "text-amber-400/50", glow: "bg-amber-500/10" },
  "toeic-part7-restaurant-review": { gradient: "from-rose-900/60 via-[#2a1018] to-[#1e0c12]", icon: ChefHat, accent: "text-rose-400/50", glow: "bg-rose-500/10" },
  "toeic-part7-travel-notice":    { gradient: "from-teal-900/60 via-[#0e2a28] to-[#0a1e1c]", icon: MapPin, accent: "text-teal-400/50", glow: "bg-teal-500/10" },
  "ielts-placebo-effect":         { gradient: "from-violet-900/60 via-[#1e1340] to-[#150e30]", icon: Pill, accent: "text-violet-400/50", glow: "bg-violet-500/10" },
  "ielts-general-museum-guide":   { gradient: "from-yellow-900/60 via-[#2a200e] to-[#1e1808]", icon: Landmark, accent: "text-yellow-400/50", glow: "bg-yellow-500/10" },
  "ielts-economics-of-happiness": { gradient: "from-emerald-900/60 via-[#0e2a1e] to-[#081e14]", icon: TrendingDown, accent: "text-emerald-400/50", glow: "bg-emerald-500/10" },
  "toeic-part6-return-policy":    { gradient: "from-indigo-900/60 via-[#141838] to-[#0e1230]", icon: RotateCcw, accent: "text-indigo-400/50", glow: "bg-indigo-500/10" },
  "toeic-part7-triple-conference": { gradient: "from-fuchsia-900/60 via-[#2a0e28] to-[#1e081e]", icon: Presentation, accent: "text-fuchsia-400/50", glow: "bg-fuchsia-500/10" },
  "ielts-animal-migration":       { gradient: "from-lime-900/60 via-[#1a2a0e] to-[#141e08]", icon: Bird, accent: "text-lime-400/50", glow: "bg-lime-500/10" },
  "my-pet-dog":                   { gradient: "from-amber-900/60 via-[#2a1e0e] to-[#1e1608]", icon: Dog, accent: "text-amber-400/50", glow: "bg-amber-500/10" },
  "at-the-hotel":                 { gradient: "from-sky-900/60 via-[#0e2040] to-[#0a1830]", icon: BedDouble, accent: "text-sky-400/50", glow: "bg-sky-500/10" },
  "going-to-the-doctor":          { gradient: "from-teal-900/60 via-[#0e2a28] to-[#0a1e1c]", icon: Stethoscope, accent: "text-teal-400/50", glow: "bg-teal-500/10" },
  "first-job-interview":          { gradient: "from-blue-900/60 via-[#0e1840] to-[#0a1230]", icon: Briefcase, accent: "text-blue-400/50", glow: "bg-blue-500/10" },
  "endangered-species-vietnam":   { gradient: "from-green-900/60 via-[#0e2a14] to-[#081e0e]", icon: TreePine, accent: "text-green-400/50", glow: "bg-green-500/10" },
  "street-food-around-the-world": { gradient: "from-orange-900/60 via-[#2a1a0a] to-[#1e1406]", icon: Utensils, accent: "text-orange-400/50", glow: "bg-orange-500/10" },
  "sustainable-tourism":          { gradient: "from-cyan-900/60 via-[#0e2438] to-[#0a1a2e]", icon: Compass, accent: "text-cyan-400/50", glow: "bg-cyan-500/10" },
  "the-gig-economy":              { gradient: "from-indigo-900/60 via-[#141838] to-[#0e1230]", icon: Banknote, accent: "text-indigo-400/50", glow: "bg-indigo-500/10" },
  "kpop-global-influence":        { gradient: "from-fuchsia-900/60 via-[#2a0e28] to-[#1e081e]", icon: Music, accent: "text-fuchsia-400/50", glow: "bg-fuchsia-500/10" },
  "my-favorite-food":             { gradient: "from-orange-900/60 via-[#2a1a0a] to-[#1e1406]", icon: Soup, accent: "text-orange-400/50", glow: "bg-orange-500/10" },
  "mid-autumn-festival":          { gradient: "from-yellow-900/60 via-[#2a2408] to-[#1e1c06]", icon: Candy, accent: "text-yellow-400/50", glow: "bg-yellow-500/10" },
  "dolphins-of-the-ocean":        { gradient: "from-cyan-900/60 via-[#0e2438] to-[#0a1a2e]", icon: Fish, accent: "text-cyan-400/50", glow: "bg-cyan-500/10" },
  "a-day-at-the-beach":           { gradient: "from-sky-900/60 via-[#0e2040] to-[#0a1830]", icon: Waves, accent: "text-sky-400/50", glow: "bg-sky-500/10" },
  "yoga-and-mindfulness":         { gradient: "from-purple-900/60 via-[#1e1340] to-[#150e30]", icon: Flower2, accent: "text-purple-400/50", glow: "bg-purple-500/10" },
  "starting-a-small-business":    { gradient: "from-emerald-900/60 via-[#0e2a22] to-[#0a1e18]", icon: Store, accent: "text-emerald-400/50", glow: "bg-emerald-500/10" },
  "quantum-computing-basics":     { gradient: "from-violet-900/60 via-[#1e1542] to-[#150e32]", icon: Cpu, accent: "text-violet-400/50", glow: "bg-violet-500/10" },
  "japanese-tea-ceremony":        { gradient: "from-amber-900/60 via-[#2a220e] to-[#1e1a08]", icon: CupSoda, accent: "text-amber-400/50", glow: "bg-amber-500/10" },
  "deep-sea-mining-debate":       { gradient: "from-slate-800/80 via-[#1a1e2e] to-[#121520]", icon: Pickaxe, accent: "text-slate-300/50", glow: "bg-slate-400/10" },
  "digital-privacy-era":          { gradient: "from-rose-900/60 via-[#2a1420] to-[#1e0e18]", icon: Fingerprint, accent: "text-rose-400/50", glow: "bg-rose-500/10" },
  "recycling-at-home":            { gradient: "from-green-900/60 via-[#0e2a18] to-[#0a1e12]", icon: Recycle, accent: "text-green-400/50", glow: "bg-green-500/10" },
  "my-pet-hamster":               { gradient: "from-amber-900/60 via-[#2a200a] to-[#1e1806]", icon: Rabbit, accent: "text-amber-400/50", glow: "bg-amber-500/10" },
  "famous-landmarks-world":       { gradient: "from-indigo-900/60 via-[#1a1640] to-[#120e30]", icon: MapPinned, accent: "text-indigo-400/50", glow: "bg-indigo-500/10" },
  "life-of-honey-bees":           { gradient: "from-yellow-900/60 via-[#2a2408] to-[#1e1c06]", icon: Bug, accent: "text-yellow-400/50", glow: "bg-yellow-500/10" },
  "shopping-online-safely":       { gradient: "from-teal-900/60 via-[#0e2828] to-[#0a1e1e]", icon: ShieldCheck, accent: "text-teal-400/50", glow: "bg-teal-500/10" },
  "traditional-herbal-medicine":  { gradient: "from-lime-900/60 via-[#1a2a0e] to-[#121e08]", icon: Leaf, accent: "text-lime-400/50", glow: "bg-lime-500/10" },
  "how-volcanoes-work":           { gradient: "from-red-900/60 via-[#2a1010] to-[#1e0a0a]", icon: Mountain, accent: "text-red-400/50", glow: "bg-red-500/10" },
  "street-food-around-world":     { gradient: "from-orange-900/60 via-[#2a1a0a] to-[#1e1406]", icon: IceCream2, accent: "text-orange-400/50", glow: "bg-orange-500/10" },
  "arctic-ice-crisis":            { gradient: "from-blue-900/60 via-[#0e1a3a] to-[#0a122a]", icon: Snowflake, accent: "text-blue-400/50", glow: "bg-blue-500/10" },
  "rise-of-electric-vehicles":    { gradient: "from-emerald-900/60 via-[#0e2a22] to-[#0a1e18]", icon: Car, accent: "text-emerald-400/50", glow: "bg-emerald-500/10" },
  "psychology-of-color":          { gradient: "from-fuchsia-900/60 via-[#2a1030] to-[#1e0a22]", icon: Palette, accent: "text-fuchsia-400/50", glow: "bg-fuchsia-500/10" },
  "global-supply-chain-crisis":   { gradient: "from-slate-800/80 via-[#1a1e2e] to-[#121520]", icon: Container, accent: "text-slate-300/50", glow: "bg-slate-400/10" },
};

function levelBadgeClass(level: string): string {
  if (level === "A1") return "bg-green-500/15 text-green-400 border-green-500/20";
  if (level === "A2") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  if (level === "B1") return "bg-blue-500/15 text-blue-400 border-blue-500/20";
  if (level === "B2") return "bg-amber-500/15 text-amber-400 border-amber-500/20";
  return "bg-rose-500/15 text-rose-400 border-rose-500/20";
}

export default function AllReadingPage() {
  const [list, setList] = React.useState<PassageSummary[]>([]);
  const [selected, setSelected] = React.useState<PassageFull | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    fetch("/api/reading")
      .then((r) => r.json())
      .then((data) => setList(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = async (slug: string) => {
    const res = await fetch(`/api/reading/${slug}`);
    const data = await res.json();
    setSelected(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selected) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <ReadingExercise passage={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  const filtered = list.filter((p) => {
    if (filter !== "all" && p.level !== filter) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.titleVi.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const grouped = filtered.reduce<Record<string, PassageSummary[]>>((acc, p) => {
    (acc[p.level] ??= []).push(p);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/reading"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-[#131F36] text-slate-400 hover:text-white hover:border-white/20 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-white">Tất cả bài đọc</h1>
          <p className="text-xs text-slate-400">{list.length} bài đọc có sẵn</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm bài đọc..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-[#131F36] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
          />
        </div>
        <div className="flex gap-1.5">
          {levelFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-3 py-2 text-xs font-medium transition-all whitespace-nowrap ${
                filter === f.value
                  ? "bg-violet-600 text-white"
                  : "bg-[#131F36] text-slate-300 border border-white/[0.08] hover:border-white/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400">
        Hiển thị {filtered.length} / {list.length} bài đọc
      </p>

      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[200px] rounded-2xl bg-[#0f1a2e] animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
          <span className="text-4xl">📖</span>
          <p className="text-slate-400 text-sm">
            {query ? `Không tìm thấy bài đọc nào khớp "${query}".` : "Chưa có bài đọc nào cho cấp độ này."}
          </p>
          <button
            onClick={() => { setQuery(""); setFilter("all"); }}
            className="rounded-full border border-white/15 px-4 py-2 text-xs text-white hover:bg-white/10 transition-colors"
          >
            Xoá bộ lọc
          </button>
        </div>
      ) : (
        Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([level, items]) => (
            <div key={level} className="space-y-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Badge className={`text-[10px] border ${levelBadgeClass(level)}`}>{level}</Badge>
                <span className="text-slate-400 text-xs font-normal">{items.length} bài</span>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <PassageCard key={p.id} passage={p} onSelect={handleSelect} />
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
}

function PassageCard({
  passage: p,
  onSelect,
}: {
  passage: PassageSummary;
  onSelect: (slug: string) => void;
}) {
  const diff = difficultyFromLevel(p.level);
  const time = readingTime(p.wordCount);
  const [imgError, setImgError] = React.useState(false);
  const style = coverStyles[p.slug] ?? { gradient: "from-blue-900/60 via-[#132744] to-[#0f1e38]", icon: BookOpen, accent: "text-blue-400/50", glow: "bg-blue-500/10" };
  const CoverIcon = style.icon;

  return (
    <button
      onClick={() => onSelect(p.slug)}
      className="group text-left rounded-2xl border border-white/[0.06] overflow-hidden hover:border-white/15 hover:shadow-lg hover:shadow-black/20 transition-all"
    >
      {/* Cover */}
      <div className="relative h-[120px]">
        {!imgError ? (
          <Image
            src={`/images/reading/covers/${p.slug}.png`}
            alt={p.title}
            fill
            className="object-cover"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`}>
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className={`absolute -top-6 -right-6 h-28 w-28 rounded-full ${style.glow} blur-2xl`} />
            <div className={`absolute -bottom-4 -left-4 h-20 w-20 rounded-full ${style.glow} blur-2xl`} />
            <CoverIcon className={`absolute top-3 right-3 h-7 w-7 ${style.accent}`} />
            <CoverIcon className={`absolute bottom-3 left-3 h-14 w-14 ${style.accent}`} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-2.5 left-2.5 bg-violet-600/80 text-white border-0 text-[9px] backdrop-blur-sm">
          {p.level}
        </Badge>
      </div>

      {/* Info */}
      <div className="p-3.5 space-y-1.5 bg-[#0f1a2e]">
        <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">
          {p.title}
        </h3>
        <p className="text-[11px] text-slate-400 line-clamp-1">{p.titleVi}</p>
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              {time} min
            </span>
            <span>{p.wordCount} từ</span>
            <span>{p.questionCount} câu</span>
          </div>
          <span className={`font-medium ${diff.color}`}>{diff.label}</span>
        </div>
      </div>
    </button>
  );
}
