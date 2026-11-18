import React, { useState, useEffect } from 'react';
import { 
  Heart, Flame, Compass, Target, DollarSign, Users, Crown, 
  CheckCircle, Lock, Sparkles, RefreshCw, ArrowRight, ShieldCheck, 
  BookOpen, Smile, Zap, Award
} from 'lucide-react';

// ==========================================
// CONFIGURATION DE LA MONÉTISATION KO-FI
// ==========================================
const PREMIUM_PAYMENT_LINK = "https://ko-fi.com/s/cb69315850"; // Lien direct vers ton produit VIP Ko-fi
const SECRET_VIP_CODE = "LIFESYNC2026"; // Code secret d'activation à vie

export default function App() {
  const [activeTab, setActiveTab] = useState('health');
  const [isVip, setIsVip] = useState(false);
  const [secretInput, setSecretInput] = useState('');
  const [activationError, setActivationError] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);

  // Vérifier si l'utilisateur est déjà VIP (mémoire du navigateur)
  useEffect(() => {
    const savedVipStatus = localStorage.getItem('lifesync_vip');
    if (savedVipStatus === 'true') {
      setIsVip(true);
    }
  }, []);

  // Gestion de l'activation par code secret
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-12">
      {/* Barre de navigation supérieure */}
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

          {/* Bouton d'appel à l'action VIP PRO */}
          {!isVip && (
            <a 
              href={PREMIUM_PAYMENT_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105"
            >
              <Crown className="w-4 h-4" />
              <span>PASSER VIP PRO (4,99 €)</span>
            </a>
          )}
        </div>

        {/* Menu principal des onglets */}
        <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto space-x-2 py-2 border-t border-slate-800/60 scrollbar-none">
          <button 
            onClick={() => setActiveTab('health')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'health' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
          >
            <Heart className="w-4 h-4" /> Health
          </button>
          <button 
            onClick={() => setActiveTab('nutrition')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'nutrition' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
          >
            <Flame className="w-4 h-4" /> Nutrition
          </button>
          <button 
            onClick={() => setActiveTab('lifestyle')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'lifestyle' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
          >
            <Compass className="w-4 h-4" /> Lifestyle
          </button>
          <button 
            onClick={() => setActiveTab('money')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'money' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
          >
            <DollarSign className="w-4 h-4" /> Money
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'social' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
          >
            <Users className="w-4 h-4" /> Social
          </button>
          <button 
            onClick={() => setActiveTab('vip')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'vip' ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold' : 'text-amber-400 hover:bg-amber-500/10'}`}
          >
            <Crown className="w-4 h-4" /> VIP PRO {isVip && '✨'}
          </button>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        {activeTab === 'health' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Heart className="w-5 h-5 text-rose-500" /> Tableau de bord : HEALTH
              </h2>
              <p className="text-slate-400 text-sm mt-1">Bienvenue dans votre espace dédié. Suivez vos progrès quotidiens et maintenez le cap sur vos objectifs.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Statut actuel</span>
                  <p className="text-lg font-bold text-emerald-400 mt-1">Actif & Régulier</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Niveau d'accès</span>
                  <p className="text-lg font-bold text-indigo-400 mt-1">{isVip ? 'VIP PRO (Illimité)' : 'Standard Gratuit'}</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Prochaine étape</span>
                  <p className="text-lg font-bold text-amber-400 mt-1">{isVip ? 'Objectif validé 🚀' : 'Débloquer les Mindsets'}</p>
                </div>
              </div>
            </div>

            {!isVip && (
              <div className="bg-gradient-to-r from-indigo-950/40 to-violet-950/40 border border-indigo-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                    <Lock className="w-4 h-4" /> FONCTIONNALITÉ AVANCÉE BLOQUÉE
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">Passez à la vitesse supérieure avec VIP PRO</h3>
                  <p className="text-slate-300 text-sm mt-1">Débloquez l'accès à toutes les touches mobiles experts, les programmes nutritionnels avancés et les audios de motivation pour seulement 4,99 € (paiement unique).</p>
                </div>
                <a 
                  href={PREMIUM_PAYMENT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl whitespace-nowrap shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2"
                >
                  Débloquer maintenant <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Autres onglets (simplifiés pour l'exemple) */}
        {activeTab !== 'health' && activeTab !== 'vip' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center py-16">
            <Sparkles className="w-12 h-12 text-indigo-500 mx-auto mb-4 opacity-80" />
            <h2 className="text-xl font-bold text-white capitalize">Espace {activeTab}</h2>
            <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">Cette section fait partie de l'écosystème LifeSync. Profitez de vos fonctionnalités de suivi au quotidien.</p>
          </div>
        )}

        {/* Onglet VIP PRO */}
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
                  : "Soutenez le projet sur Ko-fi pour obtenir votre code d'activation instantané, ou entrez votre code ci-dessous."}
              </p>
            </div>

            {isVip ? (
              <div className="mt-8 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-6 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-300">Statut VIP Activé</h3>
                <p className="text-sm text-slate-300">Vous profitez de toutes les fonctionnalités avancées de LifeSync sans aucune restriction.</p>
              </div>
            ) : (
              <div className="mt-8 space-y-6">
                <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-xl space-y-3">
                  <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" /> Étape 1 : Obtenir le sésame
                  </h3>
                  <p className="text-xs text-slate-400">Effectuez votre contribution sécurisée de 4,99 € sur Ko-fi. Le code secret s'affichera immédiatement.</p>
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
                    <p className="text-xs text-rose-400 text-center">Code incorrect. Vérifiez le message reçu après votre achat sur Ko-fi.</p>
                  )}
                  {activationSuccess && (
                    <p className="text-xs text-emerald-400 text-center">Code validé avec succès ! Bienvenue dans l'élite.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Pied de page */}
      <footer className="max-w-6xl mx-auto px-4 mt-16 pt-6 border-t border-slate-900 text-center text-xs text-slate-400">
        <p>© 2026 LifeSync. Tous droits réservés. Propulsé par React & Ko-fi.</p>
      </footer>
    </div>
  );
}
