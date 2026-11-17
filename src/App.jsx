import React, { useState, useEffect } from 'react';
import { 
  Heart, Activity, Utensils, Smile, DollarSign, Users, 
  Lock, CheckCircle, ExternalLink, Sparkles, ShieldCheck, 
  RefreshCw, Award, Zap, Flame, Target, BookOpen, ChevronRight
} from 'lucide-react';

// ==========================================
// CONFIGURATION DE LA BOUTIQUE KO-FI (VIP PRO)
// ==========================================
const PREMIUM_PAYMENT_LINK = "https://ko-fi.com/s/ton_vrai_lien_ici"; // <--- Ton lien Ko-fi est à mettre ici entre les guillemets
const LIFETIME_VIP_CODE = "LIFESYNC2026";

export default function App() {
  const [activeTab, setActiveTab] = useState('health');
  const [isVIP, setIsVIP] = useState(false);
  const [vipCodeInput, setVipCodeInput] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);

  // Vérifier si l'utilisateur est déjà VIP (sauvegardé dans le navigateur)
  useEffect(() => {
    const savedVIP = localStorage.getItem('lifesync_vip');
    if (savedVIP === 'true') {
      setIsVIP(true);
    }
  }, []);

  const handleActivateVIP = (e) => {
    e.preventDefault();
    if (vipCodeInput.trim().toUpperCase() === LIFETIME_VIP_CODE) {
      setIsVIP(true);
      localStorage.setItem('lifesync_vip', 'true');
      setCodeSuccess(true);
      setCodeError(false);
    } else {
      setCodeError(true);
      setCodeSuccess(false);
    }
  };

  const handleLogoutVIP = () => {
    setIsVIP(false);
    localStorage.removeItem('lifesync_vip');
    setVipCodeInput('');
    setCodeSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-amber-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                LIFESYNC
              </h1>
              <p className="text-xs text-slate-400 font-medium">Votre écosystème de bien-être personnel</p>
            </div>
          </div>

          {/* BADGE / BOUTON VIP */}
          <div className="flex items-center gap-3">
            {isVIP ? (
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 px-4 py-2 rounded-full">
                <Award className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-xs font-bold text-amber-300">VIP PRO ACTIF (À VIE)</span>
                <button 
                  onClick={handleLogoutVIP}
                  className="ml-2 text-[10px] text-slate-400 hover:text-white underline"
                  title="Réinitialiser le statut VIP"
                >
                  Quitter
                </button>
              </div>
            ) : (
              <a
                href={PREMIUM_PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold px-4 py-2 rounded-full text-xs shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                PASSER VIP PRO (4,99 €)
              </a>
            )}
          </div>
        </div>
      </header>

      {/* NAVIGATION / CATÉGORIES */}
      <nav className="bg-slate-900/40 border-b border-slate-800/80 px-4 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex gap-2 py-3">
          {[
            { id: 'health', label: 'Santé', icon: Heart },
            { id: 'fitness', label: 'Forme', icon: Activity },
            { id: 'nutrition', label: 'Nutrition', icon: Utensils },
            { id: 'lifestyle', label: 'Lifestyle', icon: Smile },
            { id: 'money', label: 'Money', icon: DollarSign },
            { id: 'social', label: 'Social', icon: Users },
            { id: 'vip', label: 'VIP PRO', icon: ShieldCheck, highlight: true },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : tab.highlight
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
        {activeTab !== 'vip' ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Flame className="w-5 h-5 text-indigo-400" />
                Tableau de bord : {activeTab.toUpperCase()}
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                Bienvenue dans votre espace dédié. Suivez vos progrès quotidiens et maintenez le cap sur vos objectifs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                  <span className="text-xs text-slate-400 font-medium">Statut actuel</span>
                  <p className="text-lg font-bold text-emerald-400 mt-1">Actif & Régulier</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                  <span className="text-xs text-slate-400 font-medium">Niveau d'accès</span>
                  <p className="text-lg font-bold text-indigo-400 mt-1">{isVIP ? 'VIP PRO (À vie)' : 'Standard Gratuit'}</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                  <span className="text-xs text-slate-400 font-medium">Prochaine étape</span>
                  <p className="text-lg font-bold text-amber-400 mt-1">Débloquer les Mindsets</p>
                </div>
              </div>
            </div>

            {/* SECTION VERROUILLÉE SI PAS VIP */}
            {!isVIP && (
              <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/30 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <Lock className="w-3.5 h-3.5" /> Fonctionnalités Avancées Bloquées
                    </div>
                    <h3 className="text-lg font-bold text-white">Passez à la vitesse supérieure avec VIP PRO</h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-lg">
                      Débloquez l'accès à vie à tous les modules experts, les programmes nutritionnels avancés et les outils de suivi exclusifs pour seulement 4,99 € (paiement unique).
                    </p>
                  </div>
                  <a
                    href={PREMIUM_PAYMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold px-5 py-3 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    Obtenir l'accès VIP à vie <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* SECTION VIP / ACTIVATION DU CODE */
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-center space-y-4">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold">Espace VIP PRO LifeSync</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vous avez déjà effectué votre achat de 4,99 € sur Ko-fi ? Entrez ci-dessous votre code secret reçu pour activer instantanément votre accès à vie sur cet appareil.
              </p>

              {!isVIP ? (
                <form onSubmit={handleActivateVIP} className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Ex: LIFESYNC2026"
                      value={vipCodeInput}
                      onChange={(e) => setVipCodeInput(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-center uppercase tracking-widest font-mono"
                    />
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
                    >
                      Activer
                    </button>
                  </div>

                  {codeError && (
                    <p className="text-xs text-rose-400 font-medium">
                      ❌ Code incorrect. Vérifiez le code reçu sur Ko-fi et réessayez.
                    </p>
                  )}

                  <div className="pt-4 border-t border-slate-800 text-center">
                    <p className="text-xs text-slate-400 mb-2">Vous n'avez pas encore votre accès à vie ?</p>
                    <a
                      href={PREMIUM_PAYMENT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-bold underline"
                    >
                      Acheter le pack VIP PRO sur Ko-fi (4,99 €) <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </form>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h3 className="text-sm font-bold text-emerald-300">Félicitations ! Vous êtes VIP PRO</h3>
                  <p className="text-xs text-slate-300">
                    Votre accès à vie est actif sur cet appareil. Profitez de l'intégralité des fonctionnalités de LifeSync sans aucune limite.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>© 2026 LifeSync. Tous droits réservés. Propulsé par Ko-fi & GitHub.</p>
      </footer>
    </div>
  );
}
