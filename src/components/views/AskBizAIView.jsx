import React, { useState, useRef, useEffect } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  Download, 
  ArrowUpRight, 
  ShieldCheck,
  Check,
  Copy
} from 'lucide-react';

export default function AskBizAIView() {
  const { 
    chatMessages, 
    sendMessageToBizAI, 
    isAiTyping, 
    metrics, 
    addToast 
  } = useFinancial();

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "Explain how our cash flow will trend if customer collections slow down by 10 days",
    "Which products in our catalog have the highest margin upside based on price elasticity?",
    "Summarize our financial position and key recommendations for the executive board",
    "Calculate our exact operational runway under a 15% revenue decline scenario"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAiTyping]);

  const handleSend = (textToSend = null) => {
    const text = textToSend || input;
    if (!text || !text.trim() || isAiTyping) return;
    sendMessageToBizAI(text);
    if (!textToSend) setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyMessage = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('Copied to Clipboard', 'AI response copied.', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportChat = () => {
    const textContent = chatMessages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}:\n${m.text}\n\n`).join('---\n\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Oryn_Conversation_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Transcript Exported', 'Conversation transcript saved.', 'success');
  };

  return (
    <div className="p-4 sm:p-8 flex flex-col h-[calc(100vh-4rem)] max-w-5xl w-full mx-auto" data-purpose="ask-bizai-page">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Oryn Financial Copilot</h1>
              <span className="text-[10px] font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
                Google Gemini Live
              </span>
            </div>
            <p className="text-xs text-slate-500">Autonomous corporate intelligence trained on Rao &amp; Co. financial ledger</p>
          </div>
        </div>

        <button
          onClick={exportChat}
          className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 flex items-center space-x-1.5 shadow-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Export Conversation</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-3xl ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm ${
                  isUser ? 'bg-slate-800 text-white' : 'bg-teal-600 text-white'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`relative group rounded-2xl p-4 sm:p-5 text-sm leading-relaxed shadow-sm ${
                  isUser 
                    ? 'bg-teal-600 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  {/* Metadata and Copy */}
                  <div className={`mt-2.5 flex items-center justify-between text-[11px] ${
                    isUser ? 'text-teal-100' : 'text-slate-400'
                  }`}>
                    <span>{msg.timestamp} {msg.model ? `· ${msg.model}` : ''}</span>
                    {!isUser && (
                      <button
                        onClick={() => copyMessage(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-slate-700"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isAiTyping && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-500 shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]"></div>
              <span className="font-medium text-slate-600 pl-1">Oryn is analyzing treasury data...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts (if chat is short) */}
      {chatMessages.length <= 3 && (
        <div className="pb-3 flex-shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Suggested Executive Queries
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-left p-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700 transition-colors flex items-center justify-between group shadow-2xs"
              >
                <span className="line-clamp-1">{prompt}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input Box */}
      <div className="pt-2 flex-shrink-0">
        <div className="relative bg-white border border-slate-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
          <textarea
            rows="2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Oryn anything about your cash flow, unit economics, or scenario projections... (Press Enter to send)"
            className="w-full p-3.5 pr-14 text-sm text-slate-800 placeholder-slate-400 bg-transparent resize-none focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isAiTyping}
            className={`
              absolute right-3 bottom-3 p-2 rounded-lg transition-all
              ${input.trim() && !isAiTyping
                ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 px-1">
          <span>Grounding Context: Rao &amp; Co. ($142.5k Cash Flow, 18.4m Runway)</span>
          <span>Google Gemini Flash Engine</span>
        </div>
      </div>
    </div>
  );
}
