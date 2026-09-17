/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
const SimplifyDocView = React.lazy(() => import('./components/SimplifyDocView').then(m => ({ default: m.SimplifyDocView })));
const CompareContractsView = React.lazy(() => import('./components/CompareContractsView').then(m => ({ default: m.CompareContractsView })));
const ClauseClarifierAndChatView = React.lazy(() => import('./components/ClauseClarifierAndChatView').then(m => ({ default: m.ClauseClarifierAndChatView })));
import { SAMPLE_CONTRACTS } from './data/sampleContracts';
import { SimplifiedDocumentResult, SupportedLanguage, ReadingLevel } from './types';
import { Scale, Sparkles, Shield, FileCheck, CheckCircle } from 'lucide-react';

import { ErrorBoundary } from "./components/ErrorBoundary";
function AppMain() {
  const [activeTab, setActiveTab] = useState<'simplify' | 'compare' | 'clause'>('simplify');
  const [language, setLanguage] = useState<SupportedLanguage>('English');
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('everyday');

  // Shared Document State
  const [documentText, setDocumentText] = useState<string>(SAMPLE_CONTRACTS[0].text);
  const [simplifiedResult, setSimplifiedResult] = useState<SimplifiedDocumentResult | null>(null);
  const [isSimplifying, setIsSimplifying] = useState<boolean>(false);
  const [simplifyError, setSimplifyError] = useState<string | null>(null);

  // Clause Clarifier State
  const [clauseToClarify, setClauseToClarify] = useState<string>('');

  const handleSelectClauseToClarify = useCallback((clause: string) => {
    setClauseToClarify(clause);
    setActiveTab('clause');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 font-sans">
      <ErrorBoundary>
      {/* Navigation & Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        readingLevel={readingLevel}
        setReadingLevel={setReadingLevel}
      />
      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'simplify' && (
          <React.Suspense fallback={<div className="p-12 text-center animate-pulse">Loading Simplifier...</div>}>
            <SimplifyDocView
              documentText={documentText}
              setDocumentText={setDocumentText}
              language={language}
              readingLevel={readingLevel}
              onSelectClauseToClarify={handleSelectClauseToClarify}
              result={simplifiedResult}
              setResult={setSimplifiedResult}
              isLoading={isSimplifying}
              setIsLoading={setIsSimplifying}
              error={simplifyError}
              setError={setSimplifyError}
            />
          </React.Suspense>
        )}
        {activeTab === 'compare' && (
          <React.Suspense fallback={<div className="p-12 text-center animate-pulse">Loading Comparison...</div>}>
            <CompareContractsView />
          </React.Suspense>
        )}
        {activeTab === 'clause' && (
          <React.Suspense fallback={<div className="p-12 text-center animate-pulse">Loading Clarifier...</div>}>
            <ClauseClarifierAndChatView
              initialClauseText={clauseToClarify}
              documentContext={documentText}
            />
          </React.Suspense>
        )}
      </main>
      {/* Footer & Challenge Context */}
      <footer className="border-t border-stone-200 bg-white py-8 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-stone-900">LegalAssist AI</span>
              </div>
              <p className="text-stone-500 leading-relaxed">
                Empowering individuals, freelancers, and small businesses to negotiate contracts with equal footing by breaking down complex legalese into clear, plain language.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-stone-900 block">
                PromptWars Submission Compliance
              </span>
              <ul className="space-y-1 text-stone-500">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Pillar 1: Simplify Complex Legal Documents
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Pillar 2: Compare Contracts & Semantic Diff
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Pillar 3: Clarify Clauses & AI Redline Assistant
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-stone-900 block">
                System Information & Privacy
              </span>
              <p className="text-stone-500 leading-relaxed">
                Powered by server-side Gemini 3.1 Flash intelligence. No contract data is stored or logged permanently. All analysis runs through secure ephemeral API pipelines.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
            <div>
              Built for <strong className="text-stone-600">Sneha Thumar</strong> | PromptWars Early Calibration Track 2026
            </div>
            <div>
              Disclaimer: For informational and educational assistance only. Does not constitute formal legal advice.
            </div>
          </div>
        </div>
      </footer>
      </ErrorBoundary>
    </div>
  );
}


const App = React.memo(AppMain);
export default App;
