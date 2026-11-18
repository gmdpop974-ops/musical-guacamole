import React, { useState, useEffect } from 'react';
import { 
  Heart, Flame, Compass, DollarSign, Users, Crown, 
  CheckCircle, Lock, Sparkles, ArrowRight, ShieldCheck, 
  Zap, Plus, Trash2, Droplets, Moon, Activity, Play, Pause, RotateCcw
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

  // Chronomètre Pomodoro (Lifestyle)
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState('work'); // 'work' ou 'break'

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

  // Effet Pomodoro Timer
  useEffect(() => {
    let interval = null;
    if (isPomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsPomodoroActive(false);
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

  // Calcul d'un Score Global de Vie (sur 100)
  const habitsDoneCount = habits.filter(h => h.done).length;
  const globalScore = Math.min(100, Math.round(
    (waterGlasses / 8) * 25 + 
    (Math.min(sleepHours, 8) / 8) * 25 + 
    (habits.length > 0 ? (habitsDoneCount / habits.length) * 25 : 0) + 25
  ));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-12">
      {/* Barre supérieure */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">LIFESYNC</h1>
              <p className="text-xs text-slate-400">Votre compagnon de bien-être universel</p>
            </div>
          </div>

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
            <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold">
              <Crown className="w-4 h-4" /> MEMBRE VIP PRO ✨
            </span>
          )}
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
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
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div>
            <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">Indicateur d'équilibre journalier</span>
            <h3 className="text-lg font-bold text-white mt-0.5">Score LifeSync du jour</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-2xl font-black text-indigo-400">{globalScore} / 100</span>
              <p className="text-xs text-slate-400">{globalScore >= 75 ? 'Excellente journée 🚀' : 'En bonne voie 💪'}</p>
            </div>
          </div>
        </div>

        {/* ================= ONGLET HEALTH ================= */}
        {activeTab === 'health' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
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

            {isVip ? (
              <div className="bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 rounded-2xl p-6">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Crown className="w-4 h-4" /> ANALYSE VIP PRO ACTIVÉE
                </span>
                <p className="text-sm text-slate-300 mt-2">
                  Votre niveau d'hydratation couvre {Math.round((waterGlasses / 8) * 100)}% de vos besoins recommandés. Maintenez un rythme régulier pour booster votre clarté mentale.
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-indigo-950/40 to-violet-950/40 border border-indigo-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                    <Lock className="w-4 h-4" /> ANALYSE AVANCÉE BLOQUÉE
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">Débloquez les bilans détaillés & options illimitées</h3>
                  <p className="text-slate-300 text-sm mt-1">Accédez à tout l'historique et aux programmes exclusifs pour 4,99 € à vie.</p>
                </div>
                <a href={PREMIUM_PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl whitespace-nowrap shadow-lg transition-all flex items-center gap-2">
                  Débloquer <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* ================= ONGLET NUTRITION ================= */}
        {activeTab === 'nutrition' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Flame className="w-5 h-5 text-orange-500" /> Journal Nutritionnel
                </h2>
                <p className="text-slate-400 text-sm mt-1">Suivez vos repas et vos calories de la journée.</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-right">
                <span className="text-xs text-slate-400 block">Total du jour</span>
                <span className="text-xl font-bold text-orange-400">
                  {meals.reduce((acc, m) => acc + m.calories, 0)} kcal
                </span>
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
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
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

        {/* ================= ONGLET LIFESTYLE (AVEC POMODORO INTÉGRÉ) ================= */}
        {activeTab === 'lifestyle' && (
          <div className="space-y-6">
            {/* Widget Chronomètre Focus / Pomodoro */}
            <div className="bg-gradient-to-br from-indigo-950/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl text-center">
              <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">Mode Focus & Productivité</span>
              <div className="text-4xl md:text-5xl font-black text-white font-mono my-3">
                {formatTime(pomodoroTime)}
              </div>
              <p className="text-xs text-slate-400 mb-4">
                {pomodoroMode === 'work' ? '🎯 Session de concentration en cours' : '🌿 Temps de pause relaxant'}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button 
                  onClick={togglePomodoro}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md transition-all ${isPomodoroActive ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
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
            </div>

            {/* Gestionnaire d'habitudes */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
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
                {habits.map(habit => (
                  <div key={habit.id} className="flex items-center justify-between bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-xl">
                    <button onClick={() => setHabits(habits.map(h => h.id === habit.id ? { ...h, done: !h.done } : h))} className="flex items-center gap-3 text-left flex-1">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${habit.done ? 'bg-teal-500 border-teal-500 text-slate-950' : 'border-slate-600'}`}>
                        {habit.done && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <span className={`text-sm ${habit.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>{habit.text}</span>
                    </button>
                    <button onClick={() => setHabits(habits.filter(h => h.id !== habit.id))} className="text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= ONGLET MONEY ================= */}
        {activeTab === 'money' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <DollarSign className="w-5 h-5 text-emerald-400" /> Gestion Budget & Épargne
                </h2>
                <p className="text-slate-400 text-sm mt-1">Gardez le contrôle sur vos entrées et sorties d'argent.</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 px-5 py-2.5 rounded-xl text-right">
                <span className="text-xs text-slate-400 block">Solde disponible</span>
                <span className={`text-2xl font-bold ${
                  transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0) >= 0 
                  ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0)} €
                </span>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!txLabel.trim() || !txAmount) return;
              setTransactions([{ id: Date.now(), label: txLabel, amount: Number(txAmount), type: txType }, ...transactions]);
              setTxLabel('');
              setTxAmount('');
            }} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <select 
                value={txType} 
                onChange={(e) => setTxType(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
              >
                <option value="expense">Dépense (-)</option>
                <option value="income">Revenu (+)</option>
              </select>
              <input 
                type="text" 
                placeholder="Libellé (ex: Salaire, Courses)" 
                value={txLabel}
                onChange={(e) => setTxLabel(e.target.value)}
                className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder="€" 
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-xl">
                  <span className="text-sm font-medium text-slate-200">{tx.label}</span>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {tx.type === 'income' ? '+' : '-'} {tx.amount} €
                    </span>
                    <button onClick={() => setTransactions(transactions.filter(t => t.id !== tx.id))} className="text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ONGLET SOCIAL ================= */}
        {activeTab === 'social' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-violet-400" /> Espace Social & Gratitude
              </h2>
              <p className="text-slate-400 text-sm mt-1">Notez vos pensées positives et vos rappels relationnels.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!noteInput.trim()) return;
              setNotes([{ id: Date.now(), text: noteInput }, ...notes]);
              setNoteInput('');
            }} className="flex gap-3">
              <input 
                type="text" 
                placeholder="Écrire une note de gratitude..." 
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm">
                Noter
              </button>
            </form>

            <div className="space-y-2">
              {notes.map(note => (
                <div key={note.id} className="flex items-center justify-between bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-xl">
                  <span className="text-sm text-slate-200">{note.text}</span>
                  <button onClick={() => setNotes(notes.filter(n => n.id !== note.id))} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ONGLET VIP PRO ================= */}
        {activeTab === 'vip' && (
          <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20 mb-4">
                <Crown className="w-7 h-7 text-slate-950" />
              </div>
              <h2 className="text-2xl font-bold text-white">Espace VIP PRO LifeSync</h2>
              <p className="text-slate-400 text-sm mt-2">
                {isVip 
                  ? "Félicitations ! Votre compte dispose d'un accès VIP PRO complet à vie." 
                  : "Débloquez les habitudes illimitées et les analyses avancées."}
              </p>
            </div>

            {isVip ? (
              <div className="mt-8 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-6 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-300">Statut VIP Activé</h3>
                <p className="text-sm text-slate-300">Toutes les fonctionnalités et limites sont débloquées sur cet appareil.</p>
              </div>
            ) : (
              <div className="mt-8 space-y-6">
                <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-xl space-y-3">
                  <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" /> Étape 1 : Obtenir le sésame (4,99 € à vie)
                  </h3>
                  <p className="text-xs text-slate-400">Effectuez votre paiement sur Ko-fi pour recevoir instantanément votre code secret.</p>
                  <a 
                    href={PREMIUM_PAYMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 rounded-xl text-sm transition-all shadow-md"
                  >
                    Accéder à la page de paiement Ko-fi
                  </a>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-xl space-y-3">
                  <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" /> Étape 2 : Activer mon code secret
                  </h3>
                  <form onSubmit={handleActivateVip} className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Entrez votre code (ex: LIFESYNC2026)" 
                      value={secretInput}
                      onChange={(e) => setSecretInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md shadow-indigo-600/20"
                    >
                      Activer mon accès VIP
                    </button>
                  </form>

                  {activationError && (
                    <p className="text-xs text-rose-400 text-center">Code incorrect. Vérifiez le message reçu après votre achat.</p>
                  )}
                  {activationSuccess && (
                    <p className="text-xs text-emerald-400 text-center">Code validé avec succès !</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="max
