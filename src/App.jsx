import React, { useState, useEffect } from 'react';
import { 
  Heart, Droplet, Dumbbell, Wind, Smile, 
  Flame, CheckCircle, RefreshCw, Sparkles, Apple
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

  const quotes = [
    "Chaque petit effort quotidien façonne la version extraordinaire de demain.",
    "Votre corps peut tout supporter, c'est votre esprit qu'il faut convaincre.",
    "La discipline, c'est choisir entre ce que vous voulez maintenant et ce que vous voulez le plus.",
    "Prendre soin de soi n'est pas un luxe, c'est une nécessité absolue.",
    "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte."
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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 p-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 rounded-xl text-slate-900 shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              LifeSync
            </h1>
            <p className="text-xs text-slate-400">Votre coach bien-être & mindset</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-700">
          <button 
            onClick={() => setMorphoProfile('ectomorph')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${morphoProfile === 'ectomorph' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Prise de Masse
          </button>
          <button 
            onClick={() => setMorphoProfile('overweight')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${morphoProfile === 'overweight' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Perte de Gras
          </button>
          <button 
            onClick={() => setMorphoProfile('maintenance')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${morphoProfile === 'maintenance' ? 'bg-indigo-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Vitalité
          </button>
        </div>
      </header>

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
                    {morphoProfile === 'ectomorph' 
                      ? "Focus sur un surplus calorique intelligent, des collations riches et des entraînements courts et intenses."
                      : morphoProfile === 'overweight'
                      ? "Focus sur un déficit calorique progressif, des aliments à forte satiété et l'augmentation des pas quotidiens."
                      : "Maintenez votre énergie vitale grâce à des routines stables et un sommeil réparateur."}
                  </p>
                </div>
                <Flame className="w-10 h-10 text-amber-400 hidden sm:block animate-pulse" />
              </div>
            </div>

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

              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold flex items-center text-amber-400">
                      <Smile className="w-5 h-5 mr-2 text-amber-400" /> Motivation & Mindset
                    </h3>
                    <button 
                      onClick={() => setMindsetIndex((prev) => (prev + 1) % quotes.length)}
                      className="text-slate-400 hover:text-white p-1"
                      title="Changer de citation"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-slate-300 text-sm italic mt-2">
                    "{quotes[mindsetIndex]}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center text-xs text-slate-400">
                  <span>Conseil du jour validé</span>
                  <span className="text-emerald-400 font-semibold">Actif</span>
                </div>
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
                Recommandations validées pour votre profil : <strong className="text-white">{morphoProfile === 'ectomorph' ? 'Prise de Masse (Ectomorphe)' : morphoProfile === 'overweight' ? 'Perte de Gras (Surpoids)' : 'Vitalité & Maintien'}</strong>
              </p>

              {morphoProfile === 'ectomorph' && (
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-teal-300 mb-1">1. Surplus Calorique (+300 à +500 kcal)</h3>
                    <p className="text-sm text-slate-300">Mangez légèrement au-dessus de vos dépenses. Privilégiez les oléagineux (amandes, beurre de cacahuète), les avocats et les glucides denses (riz, patate douce, avoine).</p>
                  </div>
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-teal-300 mb-1">2. Fractionnement des repas</h3>
                    <p className="text-sm text-slate-300">Faites 3 repas solides et 2 collations riches par jour (ex: smoothie banane, avoine, beurre de cacahuète, protéine).</p>
                  </div>
                </div>
              )}

              {morphoProfile === 'overweight' && (
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-amber-300 mb-1">1. Déficit Calorique Modéré (-300 à -500 kcal)</h3>
                    <p className="text-sm text-slate-300">Évitez les régimes drastiques. Visez une perte durable en réduisant les sucres rapides et en augmentant les légumes riches en fibres pour la satiété.</p>
                  </div>
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-amber-300 mb-1">2. Protéines Maigres & Hydratation</h3>
                    <p className="text-sm text-slate-300">Consommez du poulet, du poisson blanc, du tofu et buvez 2 à 3 litres d'eau par jour pour soutenir votre métabolisme.</p>
                  </div>
                </div>
              )}

              {morphoProfile === 'maintenance' && (
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-indigo-300 mb-1">Équilibre & Énergie Stable</h3>
                    <p className="text-sm text-slate-300">Maintenez vos apports caloriques équilibrés, privilégiez les produits frais, non transformés et écoutez les signaux de faim de votre corps.</p>
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
              <p className="text-slate-300 text-sm mb-4">
                {morphoProfile === 'ectomorph' ? "Objectif : Musculation lourde, courte et polyarticulaire (Squat, Développé couché, Tractions)." : "Objectif : Renforcement musculaire pour préserver la masse sèche + NEAT (marche active quotidienne)."}
              </p>

              <div className="space-y-3 mt-4">
                {[
                  { id: 1, title: "Échauffement articulaire & mobilité", duration: "5 min" },
                  { id: 2, title: morphoProfile === 'ectomorph' ? "Exercice Polyarticulaire lourd (ex: Squat ou Soulevé de terre)" : "Circuit Training tonique ou Renforcement global", duration: "25 min" },
                  { id: 3, title: "Retour au calme & étirements doux", duration: "10 min" },
                ].map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => toggleWorkout(item.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer ${completedWorkouts.includes(item.id) ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/60 border-slate-700 text-slate-200'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${completedWorkouts.includes(item.id) ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-500'}`}>
                        {completedWorkouts.includes(item.id) && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <span className="font-medium text-sm">{item.title}</span>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-full text-slate-400">{item.duration}</span>
                  </div>
                ))}
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

      <nav className="bg-slate-800/90 backdrop-blur border-t border-slate-700 fixed bottom-0 left-0 right-0 p-2 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center">
          {[
            { id: 'dashboard', label: 'Accueil', icon: Heart },
            { id: 'nutrition', label: 'Nutrition', icon: Apple },
            { id: 'workout', label: 'Sport', icon: Dumbbell },
            { id: 'breathe', label: 'Respiration', icon: Wind },
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
  )
