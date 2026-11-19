import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Flame, Compass, DollarSign, Users, Crown, 
  CheckCircle, Lock, Sparkles, ArrowRight, ShieldCheck, 
  Zap, Plus, Trash2, Droplets, Moon, Activity, Play, Pause, RotateCcw,
  Volume2, VolumeX, Palette, BrainCircuit
} from 'lucide-react';

// ==========================================
// CONFIGURATION DE LA MONÉTISATION KO-FI
// ==========================================
const PREMIUM_PAYMENT_LINK = "https://ko-fi.com/s/cb69315850";
const SECRET_VIP_CODE = "LIFESYNC2026";

export default function App() {
  const [activeTab, setActiveTab] = useState('health');
  const [isVip, setIsVip] = useState(false);
  const [secretInput, setSecretInput] = useState('');
  const [activationError, setActivationError] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);

  // --- NOUVEAUTÉ VIP 1 : THÈMES VISUELS ---
  const [vipTheme, setVipTheme] = useState(() => localStorage.getItem('ls_theme') || 'gold');

  // --- ÉTATS DES FONCTIONNALITÉS ---
  const [waterGlasses, setWaterGlasses] = useState(() => Number(localStorage.getItem('ls_water')) || 0);
  const [sleepHours, setSleepHours] = useState(() => Number(localStorage.getItem('ls_sleep')) || 7.5);
  const [mood, setMood] = useState(() => localStorage.getItem('ls_mood') || 'Énergique ⚡');

  const [meals, setMeals] = useState(() => JSON.parse(localStorage.getItem('ls_meals')) || [
    { id: 1, name: 'Petit-déjeuner équilibré', calories: 450 }
  ]);
  const [mealName, setMealName] = useState('');
  const [mealCalories, setMealCalories] = useState('');

  const [habits, setHabits] = useState(() => JSON.parse(localStorage.getItem('ls_habits')) || [
    { id: 1, text: 'Lire 15 minutes', done: false },
    { id: 2, text: '30 min de marche ou sport', done: false },
    { id: 3, text: 'Couper les écrans 1h avant de dormir', done: false }
  ]);
  const [newHabit, setNewHabit] = useState('');

  // Chronomètre Pomodoro + Sons d'ambiance VIP
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState('work');
  const [ambientSound, setAmbientSound] = useState('none'); // 'none', 'rain', 'deep'
  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);

  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('ls_money')) || [
    { id: 1, label: 'Budget initial du mois', amount: 1500, type: 'income' },
    { id: 2, label: 'Courses alimentaires', amount: 85, type: 'expense' }
  ]);
  const [txLabel, setTxLabel] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txType, setTxType] = useState('expense');

  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('ls_social')) || [
    { id: 1, text: 'Appeler un proche cette semaine 📞' }
  ]);
  const [noteInput, setNoteInput] = useState('');

  // Vérification statut VIP
  useEffect(() => {
    if (localStorage.getItem('lifesync_vip') === 'true') {
      setIsVip(true);
    }
  }, []);

  // --- NOUVEAUTÉ VIP 2 : SYNTHÉTISEUR AUDIO D'AMBIANCE (SANS FICHIER EXTERNE) ---
  useEffect(() => {
    const stopAudio = () => {
      if (noiseNodeRef.current) {
        try { noiseNodeRef.current.disconnect(); } catch (e) {}
        noiseNodeRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };

    if (!isVip || ambientSound === 'none') {
      stopAudio();
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    if (ambientSound === 'rain') {
      // Bruit rose doux (simulation pluie fine)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }
    } else if (ambientSound === 'deep') {
      // Bruit brun profond (simulation cascade / vagues graves)
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 0.18;
      }
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    whiteNoise.connect(ctx.destination);
    whiteNoise.start(0);
    noiseNodeRef.current = whiteNoise;

    return () => stopAudio();
  }, [ambientSound, isVip]);

  // Effet Pomodoro Timer
  useEffect(() => {
    let interval = null;
    if (isPomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsPomodoroActive(false);
      setAmbientSound('none');
      alert(pomodoroMode === 'work' ? 'Temps de travail écoulé ! Prenez une pause 🌿' : 'Pause terminée ! Prêt à reprendre ? 🚀');
    }
    return () => clearInterval(interval);
  }, [isPomodoroActive, pomodoroTime, pomodoroMode]);

  const togglePomodoro = () => setIsPomodoroActive(!isPomodoroActive);
  const resetPomodoro = (mode) => {
    setIsPomodoroActive(false);
    setPomodoroMode(mode);
    setPomodoroTime(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Sauvegardes automatiques
  useEffect(() => { localStorage.setItem('ls_theme', vipTheme); }, [vipTheme]);
  useEffect(() => { localStorage.setItem('ls_water', waterGlasses); }, [waterGlasses]);
  useEffect(() => { localStorage.setItem('ls_sleep', sleepHours); }, [sleepHours]);
  useEffect(() => { localStorage.setItem('ls_mood', mood); }, [mood]);
  useEffect(() => { localStorage.setItem('ls_meals', JSON.stringify(meals)); }, [meals]);
  useEffect(() => { localStorage.setItem('ls_habits', JSON.stringify(habits)); }, [habits]);
  useEffect(() => { localStorage.setItem('ls_money', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('ls_social', JSON.stringify(notes)); }, [notes]);

  // Activation VIP
  const handleActivateVip = (e) => {
    e.preventDefault();
    if (secretInput.trim() === SECRET_VIP_CODE) {
      setIsVip(true);
      localStorage.setItem('lifesync_vip', 'true');
      setActivationSuccess(true);
      setActivationError(false);
    } else {
      setActivationError(true);
      setActivationSuccess(false);
    }
  };

  // Calculs dynamiques
  const habitsDoneCount = habits.filter(h => h.done).length;
  const totalCalories = meals.reduce((acc, m) => acc + m.calories, 0);
  const currentBalance = transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0);
  const globalScore = Math.min(100, Math.round(
    (waterGlasses / 8) * 25 + 
    (Math.min(sleepHours, 8) / 8) * 25 + 
    (habits.length > 0 ? (habitsDoneCount / habits.length) * 25 : 0) + 25
  ));

  // --- NOUVEAUTÉ VIP 3 : GÉNÉRATEUR DE DIAGNOSTIC COACH IA ---
  const getCoachAdvice = () => {
    const advices = [];
    if (sleepHours < 7) {
      advices.push("⚠️ Sommeil inférieur à 7h : privilégiez des tâches légères aujourd'hui et évitez la caféine après 15h.");
    } else {
      advices.push("✅ Récupération optimale : votre capital sommeil est idéal pour attaquer une session Focus de 25 min.");
    }
    if (waterGlasses < 4) {
      advices.push("💧 Hydratation critique : buvez 2 grands verres d'eau maintenant pour éviter la baisse de concentration.");
    }
    if (currentBalance < 200) {
      advices.push("📉 Alerte Budget : votre solde disponible est serré, appliquez la règle des 24h avant tout achat non essentiel.");
    } else {
      advices.push(`💰 Santé Financière solide (${currentBalance} €) : pensez à mettre 10% de côté dès aujourd'hui.`);
    }
    return advices;
  };

  // Styles dynamiques selon le thème VIP actif
  const activeTheme = isVip ? vipTheme : 'default';
  const themeStyles = {
    default: {
      bg: 'bg-slate-950',
      header: 'bg-slate-900/60 border-slate-800',
      accentBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white',
      cardBorder: 'border-slate-800',
      scoreBanner: 'from-slate-900 to-indigo-950/60 border-slate-800'
    },
    gold: {
      bg: 'bg-stone-950',
      header: 'bg-stone-900/80 border-amber-500/30',
      accentBtn: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-bold',
      cardBorder: 'border-amber-500/20 shadow-amber-500/5',
      scoreBanner: 'from-stone-900 via-amber-950/30 to-stone-900 border-amber-500/40'
    },
    emerald: {
      bg: 'bg-neutral-950',
      header: 'bg-neutral-900/80 border-emerald-500/30',
      accentBtn: 'bg-gradient-to-r from-emerald-500 to-teal-400 text-neutral-950 font-bold',
      cardBorder: 'border-emerald-500/20 shadow-emerald-500/5',
      scoreBanner: 'from-neutral-900 via-emerald-950/30 to-neutral-900 border-emerald-500/40'
    }
  }[activeTheme];

  return (
    <div className={`min-h-screen ${themeStyles.bg} text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-12 transition-colors duration-500`}>
      {/* Barre supérieure */}
      <header className={`border-b ${themeStyles.header} backdrop-blur-md sticky top-0 z-50 transition-colors`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${isVip ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-amber-500/20' : 'bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-indigo-500/20'}`}>
              {isVip ? <Crown className="w-5 h-5 text-slate-950" /> : <Sparkles className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-2">
                LIFESYNC {isVip && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">PRO EDITION</span>}
              </h1>
              <p className="text-xs text-slate-400">Votre compagnon de bien-être universel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sélecteur de Thème Exclusif VIP */}
            {isVip && (
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-2.5 py-1.5 rounded-xl">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                <select 
                  value={vipTheme} 
                  onChange={(e) => setVipTheme(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="gold" className="bg-slate-900">Thème Cyber Gold</option>
                  <option value="emerald" className="bg-slate-900">Thème Émeraude Zen</option>
                  <option value="default" className="bg-slate-900">Thème Classique</option>
                </select>
              </div>
            )}

            {!isVip ? (
              <a 
                href={PREMIUM_PAYMENT_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105"
              >
                <Crown className="w-4 h-4" />
                <span>PASSER VIP PRO (4,99 €)</span>
              </a>
            ) : (
              <span className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold">
                <Crown className="w-4 h-4" /> VIP ACTIF
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto space-x-2 py-2 border-t border-slate-800/60 scrollbar-none">
          {[
            { id: 'health', label: 'Health', icon: Heart },
            { id: 'nutrition', label: 'Nutrition', icon: Flame },
            { id: 'lifestyle', label: 'Lifestyle', icon: Compass },
            { id: 'money', label: 'Money', icon: DollarSign },
            { id: 'social', label: 'Social', icon: Users },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? themeStyles.accentBtn : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
          <button 
            onClick={() => setActiveTab('vip')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'vip' ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold' : 'text-amber-400 hover:bg-amber-500/10'}`}
          >
            <Crown className="w-4 h-4" /> VIP PRO {isVip && '✨'}
          </button>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-4 mt-6 space-y-6">

        {/* --- INDICATEUR DE SCORE GLOBAL --- */}
        <div className={`bg-gradient-to-r ${themeStyles.scoreBanner} border rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl`}>
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Indicateur d'équilibre journalier</span>
            <h3 className="text-lg font-bold text-white mt-0.5">Score LifeSync du jour</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-2xl font-black text-white">{globalScore} / 100</span>
              <p className="text-xs text-slate-400">{globalScore >= 75 ? 'Excellente journée 🚀' : 'En bonne voie 💪'}</p>
            </div>
          </div>
        </div>

        {/* --- MODULE EXCLUSIF VIP : COACH IA & ANALYSE STRATÉGIQUE --- */}
        {isVip ? (
          <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/30 border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <BrainCircuit className="w-4 h-4" /> COACH IA STRATÉGIQUE (EXCLUSIVITÉ VIP)
              </span>
              <span className="text-[11px] text-amber-300/70">Analyse en temps réel</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {getCoachAdvice().map((advice, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-amber-500/20 p-3.5 rounded-xl text-xs text-slate-200 leading-relaxed">
                  {advice}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Coach IA Stratégique & Thèmes VIP verrouillés</p>
                <p className="text-xs text-slate-400">Débloquez l'analyse intelligente de vos données, les sons d'ambiance et les thèmes exclusifs.</p>
              </div>
            </div>
            <button onClick={() => setActiveTab('vip')} className="text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl transition-all">
              Voir les avantages VIP
            </button>
          </div>
        )}

        {/* ================= ONGLET HEALTH ================= */}
        {activeTab === 'health' && (
          <div className={`bg-slate-900 border ${themeStyles.cardBorder} rounded-2xl p-6 shadow-xl`}>
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <Heart className="w-5 h-5 text-rose-500" /> Tableau de bord : HEALTH
            </h2>
            <p className="text-slate-400 text-sm mt-1">Suivez votre hydratation, votre sommeil et votre énergie.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {/* Hydratation */}
              <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-sky-400" /> Hydratation
                  </span>
                  <span className="text-xs text-sky-400 font-semibold">{waterGlasses} / 8 verres</span>
                </div>
                <div className="my-4">
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full transition-all" style={{ width: `${Math.min((waterGlasses / 8) * 100, 100)}%` }}></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold">-</button>
                  <button onClick={() => setWaterGlasses(waterGlasses + 1)} className="flex-1 py-1.5 bg-sky-600 hover:bg-sky-500 rounded-lg text-sm font-bold">+ 1 verre</button>
                </div>
              </div>

              {/* Sommeil */}
              <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Moon className="w-4 h-4 text-indigo-400" /> Sommeil
                  </span>
                  <span className="text-xs text-indigo-400 font-semibold">Cible : 8h</span>
                </div>
                <p className="text-2xl font-bold text-white my-3">{sleepHours} heures</p>
                <div className="flex gap-2">
                  <button onClick={() => setSleepHours(Math.max(0, sleepHours - 0.5))} className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold">- 30m</button>
                  <button onClick={() => setSleepHours(sleepHours + 0.5)} className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold">+ 30m</button>
                </div>
              </div>

              {/* Humeur */}
              <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-xl flex flex-col justify-between">
                <span className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" /> État du jour
                </span>
                <p className="text-xl font-bold text-emerald-400 my-3">{mood}</p>
                <select 
                  value={mood} 
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none"
                >
                  <option>Énergique ⚡</option>
                  <option>Calme & Serein 🌿</option>
                  <option>Concentré 🎯</option>
                  <option>Fatigué 😴</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ================= ONGLET NUTRITION ================= */}
        {activeTab === 'nutrition' && (
          <div className={`bg-slate-900 border ${themeStyles.cardBorder} rounded-2xl p-6 shadow-xl space-y-6`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Flame className="w-5 h-5 text-orange-500" /> Journal Nutritionnel
                </h2>
                <p className="text-slate-400 text-sm mt-1">Suivez vos repas et vos calories de la journée.</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-right">
                <span className="text-xs text-slate-400 block">Total du jour</span>
                <span className="text-xl font-bold text-orange-400">{totalCalories} kcal</span>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!mealName.trim() || !mealCalories) return;
              setMeals([...meals, { id: Date.now(), name: mealName, calories: Number(mealCalories) }]);
              setMealName('');
              setMealCalories('');
            }} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Nom du repas (ex: Salade de fruits)" 
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <input 
                type="number" 
                placeholder="Calories (kcal)" 
                value={mealCalories}
                onChange={(e) => setMealCalories(e.target.value)}
                className="w-full sm:w-40 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className={`${themeStyles.accentBtn} px-5 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2`}>
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </form>

            <div className="space-y-2">
              {meals.map(meal => (
                <div key={meal.id} className="flex items-center justify-between bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-xl">
                  <span className="text-sm font-medium text-slate-200">{meal.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-orange-400">{meal.calories} kcal</span>
                    <button onClick={() => setMeals(meals.filter(m => m.id !== meal.id))} className="text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ONGLET LIFESTYLE (AVEC POMODORO + SONS VIP) ================= */}
        {activeTab === 'lifestyle' && (
          <div className="space-y-6">
            {/* Widget Chronomètre Focus / Pomodoro */}
            <div className={`bg-gradient-to-br from-slate-900 to-slate-950 border ${themeStyles.cardBorder} rounded-2xl p-6 shadow-xl text-center`}>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Mode Focus & Productivité</span>
              <div className="text-4xl md:text-5xl font-black text-white font-mono my-3">
                {formatTime(pomodoroTime)}
              </div>
              <p className="text-xs text-slate-400 mb-5">
                {pomodoroMode === 'work' ? '🎯 Session de concentration en cours' : '🌿 Temps de pause relaxant'}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button 
                  onClick={togglePomodoro}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md transition-all ${isPomodoroActive ? 'bg-rose-500 hover:bg-rose-400 text-white' : themeStyles.accentBtn}`}
                >
                  {isPomodoroActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPomodoroActive ? 'Pause' : 'Démarrer'}
                </button>
                <button 
                  onClick={() => resetPomodoro('work')}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium text-slate-300 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" /> 25 min Travail
                </button>
                <button 
                  onClick={() => resetPomodoro('break')}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium text-slate-300"
                >
                  5 min Pause
                </button>
              </div>

              {/* Barre de Sons d'Ambiance VIP */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400 mb-3">
                  {ambientSound !== 'none' ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                  <span>Ambiance Sonore Focus {isVip ? '(VIP Débloqué ✨)' : '(Réservé VIP 🔒)'}</span>
                </div>
                {isVip ? (
                  <div className="flex justify-center gap-2">
                    {[
                      { id: 'none', label: 'Silence' },
                      { id: 'rain', label: '🌧️ Pluie douce' },
                      { id: 'deep', label: '🌊 Cascade profonde' }
                    ].map(sound => (
                      <button
                        key={sound.id}
                        onClick={() => setAmbientSound(sound.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${ambientSound === sound.id ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                      >
                        {sound.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Activez le mode VIP PRO pour écouter des bruits blancs et sons de pluie pendant vos sessions.</p>
                )}
              </div>
            </div>

            {/* Gestionnaire d'habitudes */}
            <div className={`bg-slate-900 border ${themeStyles.cardBorder} rounded-2xl p-6 shadow-xl space-y-6`}>
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Compass className="w-5 h-5 text-teal-400" /> Tracker d'Habitudes
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Cochez vos rituels {isVip ? '(Illimité VIP ✨)' : `(${habits.length}/5 max en version gratuite)`}.
                </p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newHabit.trim()) return;
                if (!isVip && habits.length >= 5) return;
                setHabits([...habits, { id: Date.now(), text: newHabit, done: false }]);
                setNewHabit('');
              }} className="flex gap-3">
                <input 
                  type="text" 
                  placeholder={(!isVip && habits.length >= 5) ? "Limite gratuite atteinte (Passez VIP)" : "Nouvelle habitude..."}
                  disabled={!isVip && habits.length >= 5}
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={!isVip && habits.length >= 5}
                  className="bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Créer
                </button>
              </form>

              <div className="space-y-2">
                {habits.map(
