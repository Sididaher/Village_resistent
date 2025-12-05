"use client";

import { useState, useEffect } from "react";
import Button from "./Button";

interface CostData {
  proprietary: number;
  libre: number;
  savings: number;
  carbonReduction: number;
}

interface SimulationParams {
  students: number;
  computers: number;
  servers: number;
  timeframe: number;
}

export default function CostSimulator() {
  const [params, setParams] = useState<SimulationParams>({
    students: 500,
    computers: 100,
    servers: 5,
    timeframe: 5
  });

  const [results, setResults] = useState<CostData>({
    proprietary: 0,
    libre: 0,
    savings: 0,
    carbonReduction: 0
  });

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    calculateCosts();
  }, [params]);

  const calculateCosts = () => {
    const { students, computers, servers, timeframe } = params;

    // Coûts propriétaires (basés sur des données réelles)
    const windowsLicense = 150; // par poste par an
    const officeLicense = 120; // par utilisateur par an
    const antivirusLicense = 45; // par poste par an
    const serverLicense = 2000; // par serveur par an
    const supportCost = 100; // par poste par an
    const hardwareReplacement = 0.20; // 20% du parc remplacé par an à 800€/poste

    const proprietaryYearly = 
      computers * (windowsLicense + officeLicense + antivirusLicense + supportCost) +
      servers * serverLicense +
      computers * hardwareReplacement * 800;

    const proprietaryTotal = proprietaryYearly * timeframe;

    // Coûts libres
    const formationCost = 50; // par utilisateur, one-time
    const supportLibreCost = 30; // par poste par an (support communautaire + formation)
    const migrationCost = 200; // par poste, one-time
    const hardwareExtension = 0.05; // 5% du parc remplacé par an (reconditionnement)

    const libreOneTime = students * formationCost + computers * migrationCost;
    const libreYearly = computers * supportLibreCost + computers * hardwareExtension * 400;
    const libreTotal = libreOneTime + (libreYearly * timeframe);

    const savings = proprietaryTotal - libreTotal;
    
    // Réduction carbone (reconditionnement vs achat neuf)
    const computerCarbonFootprint = 300; // kg CO2 par ordinateur neuf
    const carbonReduction = computers * hardwareReplacement * timeframe * computerCarbonFootprint * 0.8;

    setResults({
      proprietary: Math.round(proprietaryTotal),
      libre: Math.round(libreTotal),
      savings: Math.round(savings),
      carbonReduction: Math.round(carbonReduction)
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          💰 Simulateur de Coûts NIRD
        </h2>
        <p className="text-lg text-gray-600">
          Découvrez les économies réalisables en adoptant la démarche NIRD dans votre établissement
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Paramètres */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Paramètres de votre établissement</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre d'élèves/étudiants
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={params.students}
                  onChange={(e) => setParams({...params, students: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100</span>
                  <span className="font-bold text-blue-600">{formatNumber(params.students)}</span>
                  <span>2000</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre d'ordinateurs
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={params.computers}
                  onChange={(e) => setParams({...params, computers: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>20</span>
                  <span className="font-bold text-blue-600">{formatNumber(params.computers)}</span>
                  <span>500</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de serveurs
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={params.servers}
                  onChange={(e) => setParams({...params, servers: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span className="font-bold text-blue-600">{params.servers}</span>
                  <span>20</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Période de simulation (années)
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={params.timeframe}
                  onChange={(e) => setParams({...params, timeframe: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 an</span>
                  <span className="font-bold text-blue-600">{params.timeframe} ans</span>
                  <span>10 ans</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 leading-relaxed">
              💡 <strong>Note :</strong> Ces calculs sont basés sur des moyennes du marché français. 
              Les coûts peuvent varier selon votre situation spécifique et vos négociations.
            </p>
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Résultats de la simulation</h3>
          
          {/* Comparaison visuelle */}
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-700 font-medium">🏢 Solution propriétaire</span>
                <span className="text-red-800 font-bold text-lg">{formatCurrency(results.proprietary)}</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-700 font-medium">🐧 Solution NIRD</span>
                <span className="text-green-800 font-bold text-lg">{formatCurrency(results.libre)}</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-1000" 
                  style={{width: `${(results.libre / results.proprietary) * 100}%`}}
                ></div>
              </div>
            </div>
          </div>

          {/* Économies */}
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-6 text-white">
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-2">💰 Économies réalisées</h4>
              <div className="text-4xl font-bold mb-2">{formatCurrency(results.savings)}</div>
              <div className="text-blue-100">
                Sur {params.timeframe} {params.timeframe > 1 ? 'ans' : 'an'}
              </div>
              <div className="mt-4 text-blue-100">
                Soit <strong>{formatCurrency(Math.round(results.savings / params.timeframe))}</strong> par an
              </div>
            </div>
          </div>

          {/* Impact environnemental */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-green-700 font-bold mb-1">🌱 Impact environnemental</h4>
                <p className="text-green-600 text-sm">Réduction des émissions CO₂</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-700">
                  {formatNumber(results.carbonReduction)} kg
                </div>
                <div className="text-xs text-green-600">CO₂ évités</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              {showDetails ? '📊 Masquer les détails' : '📊 Voir le détail des calculs'}
            </Button>
            
            <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white">
              📥 Télécharger le rapport
            </Button>
          </div>
        </div>
      </div>

      {/* Détails des calculs */}
      {showDetails && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Détail des calculs</h4>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-bold text-red-700 mb-3">🏢 Coûts propriétaires (par an)</h5>
              <ul className="space-y-2 text-gray-700">
                <li>• Windows : {formatCurrency(params.computers * 150)}</li>
                <li>• Office 365 : {formatCurrency(params.computers * 120)}</li>
                <li>• Antivirus : {formatCurrency(params.computers * 45)}</li>
                <li>• Support : {formatCurrency(params.computers * 100)}</li>
                <li>• Serveurs : {formatCurrency(params.servers * 2000)}</li>
                <li>• Renouvellement matériel : {formatCurrency(params.computers * 0.20 * 800)}</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-green-700 mb-3">🐧 Coûts NIRD</h5>
              <ul className="space-y-2 text-gray-700">
                <li>• Formation (one-time) : {formatCurrency(params.students * 50)}</li>
                <li>• Migration (one-time) : {formatCurrency(params.computers * 200)}</li>
                <li>• Support libre (par an) : {formatCurrency(params.computers * 30)}</li>
                <li>• Reconditionnement (par an) : {formatCurrency(params.computers * 0.05 * 400)}</li>
                <li>• Serveurs : Gratuit (Linux)</li>
                <li>• Logiciels : Gratuit (LibreOffice, etc.)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h5 className="font-bold text-blue-700 mb-2">🎯 Avantages additionnels non chiffrés</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Indépendance technologique et souveraineté numérique</li>
              <li>• Sécurité renforcée et contrôle des données</li>
              <li>• Flexibilité et personnalisation des solutions</li>
              <li>• Formation des élèves aux technologies libres</li>
              <li>• Contribution à l'économie circulaire</li>
            </ul>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
