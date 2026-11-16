import React, { useState, useEffect } from 'react';
import { 
  Heart, Droplet, Dumbbell, Wind, Smile, 
  Flame, CheckCircle, RefreshCw, Sparkles, Apple, Lock, Crown, Coffee, ShieldCheck,
  Moon, CheckSquare, Plus, Trash2, Meh, Frown
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [waterCount, setWaterCount] = useState(0);
  const [morphoProfile, setMorphoProfile] = useState('ectomorph');
  const [mindsetIndex, setMindsetIndex] = useState(0);
  const [breatheActive, setBreatheActive] = useState(false);
  const [breathePhase, setBreathePhase] = useState('Prêt ?');
  const [breatheCountdown, setBreatheCountdown] = useState(4);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  
  // Nouveaux états du quotidien
  const [mood, setMood] = useState(null);
  const [sleepHours, setSleepHours] = useState(7);
  const [todos, setTodos] = useState([
    { id: 1, text: "Boire 8 verres d'eau", completed: false },
    { id: 2, text: "Séance de sport ou marche active", completed: false },
    { id: 3, text: "5 minutes de respiration", completed: false }
  ]);
  const [newTodoText, setNewTodoText] = useState('');

  // État pour simuler le statut Premium
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  const quotes = [
    { text: "Chaque petit effort quotidien façonne la version extraordinaire de demain.", premium: false },
    { text: "Votre corps peut tout supporter, c'est votre esprit qu'il faut convaincre.", premium: false },
    { text: "La discipline, c'est choisir entre ce que vous voulez maintenant et ce que vous voulez le plus.", premium: true },
    { text: "Prendre soin de soi n'est pas un luxe, c'est une nécessité absolue.", premium: true },
    { text: "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.", premium: true }
  ];

  useEffect(() => {
    let timer;
    if (breatheActive) {
      timer = setInterval(() => {
        setBreatheCountdown((prev) => {
          if (prev > 1) return prev - 1;
          if (breathePhase === 'Prêt ?' || breathePhase === 'Expirer doucement') {
            setBreathePhase('Inspirez profondément (Ventre)');
            return 4;
          } else if (breathePhase === 'Inspirez profondément (Ventre)') {
            setBreathePhase('Retenez votre souffle');
            return 4;
          } else if (breathePhase === 'Retenez votre souffle') {
            setBreathePhase('Expirer doucement');
            return 4;
          }
          return 4;
        });
      }, 1000);
    } else {
      setBreathePhase('Prêt ?');
      setBreatheCountdown(4);
    }
    return () => clearInterval(timer);
  }, [breatheActive, breathePhase]);

  const toggleWorkout = (id) => {
    if (completedWorkouts.includes(id)) {
      setCompletedWorkouts(completedWorkouts.filter(item => item !== id));
    } else {
      setCompletedWorkouts([...completedWorkouts, id]);
    }
  };

  const handleNextMindset = () => {
    const nextIndex = (mindsetIndex + 1) % quotes.length;
    if (quotes[nextIndex].premium && !isPremium) {
      setShowPaywallModal(true);
    } else {
      setMindsetIndex(nextIndex);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodoText, completed: false }]);
    setNewTodoText('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans relative">
      
      {/* Modal Paywall */}
      {showPaywallModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-amber-500/30">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Débloquez LifeSync Premium</h3>
            <p className="text-slate-300 text-sm mb-6">
              Accédez à tous les mindsets exclusifs, aux programmes d'entraînement avancés et soutenez le projet !
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsPremium(true);
                  setShowPaywallModal(false);
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold py-3 rounded-xl transition shadow-lg shadow-amber-500/20"
              >
                Passer Premium (Simulé)
              </button>
              <button
                onClick={() => setShowPaywallModal(false)}
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 py-2.5 rounded-xl transition text-sm"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* En-tête */}
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 p-4 sticky top-0 z-45 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 rounded-xl text-slate-900 shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                LifeSync
              </h1>
              {isPremium && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                  <Crown className="w-3 h-3 mr-1" /> PRO
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">Votre coach bien-être & mindset</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-700">
          <button 
            onClick={() => setMorphoProfile('ectomorph')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${morphoProfile === 'ectomorph' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Masse
          </button>
          <button 
            onClick={() => setMorphoProfile('overweight')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${morphoProfile === 'overweight' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Sec
          </button>
          <button 
            onClick={() => setMorphoProfile('maintenance')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${morphoProfile === 'maintenance' ? 'bg-indigo-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Vitalité
          </button>
        </div>
      </header>

      {/* Contenu Principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 pb-24">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-800 to-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
                    Profil actif : {morphoProfile === 'ectomorph' ? 'Ectomorphe / Prise de masse' : morphoProfile === 'overweight' ? 'Perte de gras / Surpoids' : 'Maintien & Équilibre'}
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-1">Bonjour, Prêt à rayonner ?</h2>
                  <p className="text-slate-300 text-sm max-w-lg">
                    Gérez votre énergie, votre hydratation et vos priorités du jour en un clin d'œil.
                  </p>
                </div>
                <Flame className="w-10 h-10 text-amber-400 hidden sm:block animate-pulse" />
              </div>
            </div>

            {/* Tracker d'humeur & Sommeil */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg">
                <h3 className="font-semibold flex items-center text-teal-400 mb-3">
                  <Smile className="w-5 h-5 mr-2 text-teal-400" /> Comment vous sentez-vous aujourd'hui ?
                </h3>
                <div className="flex justify-between gap-2 mt-4">
                  {[
                    { id: 'great', label: 'Au top', icon: Smile, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
                    { id: 'good', label: 'Bien', icon: Smile, color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' },
                    { id: 'meh', label: 'Moyen', icon: Meh, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
                    { id: 'bad', label: 'Fatigué', icon: Frown, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = mood === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setMood(item.id)}
                        className={`flex-1 flex flex-col items-center p-3 rounded-xl border transition ${isSelected ? `${item.color} ring-2 ring-teal-400 font-bold` : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'}`}
                      >
                        <Icon className="w-6 h-6 mb-1" />
                        <span className="text-xs">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold flex items-center text-indigo-400">
                      <Moon className="w-5 h-5 mr-2 text-indigo-400" /> Suivi du Sommeil
                    </h3>
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-full font-bold">
                      {sleepHours}h de sommeil
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    {sleepHours >= 7 ? "✨ Excellente récupération !" : "⚠️ Veillez à vous coucher plus tôt ce soir."}
                  </p>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="12" 
                  value={sleepHours} 
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Hydratation & Mindset */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold flex items-center text-teal-400">
                      <Droplet className="w-5 h-5 mr-2 text-teal-400" /> Hydratation Quotidienne
                    </h3>
                    <span className="text-xs bg-slate-700 px-2.5 py-1 rounded-full text-slate-300">
                      {waterCount} / 8 verres
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden mb-4">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (waterCount / 8) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setWaterCount(Math.max(0, waterCount - 1))}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-xl text-sm font-medium transition"
                  >
                    - Retirer
                  </button>
                  <button 
                    onClick={() => setWaterCount(waterCount + 1)}
                    className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2 rounded-xl text-sm transition shadow-lg shadow-teal-500/20"
                  >
                    + Boire un verre
                  </button>
                </div>
              </div>

              {/* Bloc Mindset */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between relative">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold flex items-center text-amber-400">
                      <Smile className="w-5 h-5 mr-2 text-amber-400" /> Mindset & Sagesse
                    </h3>
                    <div className="flex items-center space-x-2">
                      {quotes[mindsetIndex].premium && !isPremium && (
                        <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full flex items-center border border-amber-500/30">
                          <Lock className="w-3 h-3 mr-1" /> PRO
                        </span>
                      )}
                      <button 
                        onClick={handleNextMindset}
                        className="text-slate-400 hover:text-white p-1"
                        title="Changer de citation"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm italic mt-2">
                    "{quotes[mindsetIndex].text}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center text-xs text-slate-400">
                  <span>Motivation quotidienne</span>
                  <span className={quotes[mindsetIndex].premium && !isPremium ? "text-amber-400 font-semibold" : "text-emerald-400 font-semibold"}>
                    {quotes[mindsetIndex].premium && !isPremium ? "Verrouillé" : "Actif"}
                  </span>
                </div>
              </div>
            </div>

            {/* To-Do List du Jour */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold flex items-center text-emerald-400 mb-4">
                <CheckSquare className="w-5 h-5 mr-2 text-emerald-400" /> Priorités du Jour (To-Do)
              </h3>
              
              <form onSubmit={addTodo} className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  placeholder="Ajouter une nouvelle habitude ou tâche..."
                  className="flex-1 bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-teal-400"
                />
                <button type="submit" className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold flex items-center transition">
                  <Plus className="w-5 h-5" />
                </button>
              </form>

              <div className="space-y-2">
                {todos.map((todo) => (
                  <div key={todo.id} className="flex items-center justify-between bg-slate-900/60 border border-slate-700 p-3 rounded-xl">
                    <div 
                      onClick={() => toggleTodo(todo.id)}
                      className="flex items-center space-x-3 cursor-pointer flex-1"
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${todo.completed ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-500'}`}>
                        {todo.completed && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <span className={`text-sm ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {todo.text}
                      </span>
                    </div>
                    <button onClick={() => deleteTodo(todo.id)} className="text-slate-500 hover:text-rose-400 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2 flex items-center text-emerald-400">
                <Apple className="w-6 h-6 mr-2" /> Stratégie Nutritionnelle sur Mesure
              </h2>
              <p className="text-slate-300 text-sm mb-6">
                Recommandations validées pour votre profil : <strong className="text-white">{morphoProfile === 'ectomorph' ? 'Prise de Masse' : morphoProfile === 'overweight' ? 'Perte de Gras' : 'Vitalité'}</strong>
              </p>

              {morphoProfile === 'ectomorph' && (
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-teal-300 mb-1">1. Surplus Calorique (+300 à +500 kcal)</h3>
                    <p className="text-sm text-slate-300">Privilégiez les oléagineux, avocats et glucides denses (riz, avoine).</p>
                  </div>
                </div>
              )}
              {morphoProfile === 'overweight' && (
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-amber-300 mb-1">1. Déficit Calorique Modéré</h3>
                    <p className="text-sm text-slate-300">Réduisez les sucres rapides et augmentez les légumes riches en fibres.</p>
                  </div>
                </div>
              )}
              {morphoProfile === 'maintenance' && (
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-indigo-300 mb-1">Équilibre & Énergie</h3>
                    <p className="text-sm text-slate-300">Maintenez des apports caloriques stables avec des produits frais.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'workout' && (
          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2 flex items-center text-teal-400">
                <Dumbbell className="w-6 h-6 mr-2" /> Plan d'Entraînement Adapté
              </h2>
              <div className="space-y-3 mt-4">
                {[
                  { id: 1, title: "Échauffement articulaire & mobilité", duration: "5 min" },
                  { id: 2, title: "Exercice principal ciblée", duration: "25 min" },
                  { id: 3, title: "Retour au calme & étirements", duration: "10 min", premium: true },
                ].map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => {
                      if (item.premium && !isPremium) {
                        setShowPaywallModal(true);
                      } else {
                        toggleWorkout(item.id);
                      }
                    }}
                    className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer ${completedWorkouts.includes(item.id) ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/60 border-slate-700 text-slate-200'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${completedWorkouts.includes(item.id) ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-500'}`}>
                        {completedWorkouts.includes(item.id) && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <span className="font-medium text-sm flex items-center">
                        {item.title}
                        {item.premium && !isPremium && <Lock className="w-3.5 h-3.5 ml-2 text-amber-400" />}
                      </span>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-full text-slate-400">{item.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Onglet Don / Soutien */}
        {activeTab === 'support' && (
          <div className="space-y-6 text-center max-w-md mx-auto">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
              <div className="w-14 h-14 bg-rose-500/20 text-rose-400 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-rose-500/30">
                <Coffee className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-white">Soutenir LifeSync</h2>
              <p className="text-slate-300 text-sm mb-6">
                Vous aimez l'application ? Aidez-nous à la maintenir en ligne et à développer de nouvelles fonctionnalités en offrant un petit café ! ☕
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button 
                  onClick={() => alert("Merci du fond du cœur pour votre soutien (2€) !")}
                  className="bg-slate-900 hover:bg-slate-700 border border-slate-700 py-3 rounded-xl font-bold text-teal-400 text-sm transition"
                >
                  ☕ 2 €
                </button>
                <button 
                  onClick={() => alert("Merci énormément pour votre générosité (5€) !")}
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-teal-500/20"
                >
                  🚀 5 €
                </button>
                <button 
                  onClick={() => alert("Vous êtes incroyable ! Merci infiniment (10€) !")}
                  className="bg-slate-900 hover:bg-slate-700 border border-slate-700 py-3 rounded-xl font-bold text-amber-400 text-sm transition"
                >
                  👑 10 €
                </button>
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" /> Paiement 100% sécurisé via Stripe/Ko-fi
              </div>
            </div>
          </div>
        )}

        {activeTab === 'breathe' && (
          <div className="space-y-6 text-center">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md mx-auto shadow-xl">
              <h2 className="text-xl font-bold mb-2 flex items-center justify-center text-teal-400">
                <Wind className="w-6 h-6 mr-2" /> Cohérence Cardiaque
              </h2>
              <p className="text-slate-300 text-sm mb-8">
                Apaisez votre système nerveux en suivant le rythme de respiration guidée.
              </p>

              <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full bg-teal-500/20 transition-all duration-1000 ${breatheActive ? 'scale-125 animate-pulse' : 'scale-100'}`}></div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-3xl font-bold text-white mb-1">{breatheCountdown}</span>
                  <span className="text-xs text-teal-300 font-medium px-2 text-center">{breathePhase}</span>
                </div>
              </div>

              <button
                onClick={() => setBreatheActive(!breatheActive)}
                className={`w-full py-3 rounded-xl font-bold shadow-lg transition ${breatheActive ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20' : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20'}`}
              >
                {breatheActive ? 'Arrêter la séance' : 'Commencer la respiration'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Barre de Navigation mobile */}
      <nav className="bg-slate-800/90 backdrop-blur border-t border-slate-700 fixed bottom-0 left-0 right-0 p-2 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center">
          {[
            { id: 'dashboard', label: 'Accueil', icon: Heart },
            { id: 'nutrition', label: 'Nutrition', icon: Apple },
            { id: 'workout', label: 'Sport', icon: Dumbbell },
            { id: 'breathe', label: 'Souffle', icon: Wind },
            { id: 'support', label: 'Soutenir', icon: Coffee },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition ${isActive ? 'text-teal-400 bg-teal-500/10' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
