import React from 'react';
import { Clock, CheckCircle2, ArrowRightLeft } from 'lucide-react';
import { AnomalyCard as AnomalyCardType } from '../types';
import { SEVERITY_COLORS } from '../constants';

interface AnomalyCardProps {
  data: AnomalyCardType;
}

const AnomalyCard: React.FC<AnomalyCardProps> = ({ data }) => {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-lg">

      {/* Header */}
      <div className="px-5 py-4 flex items-start justify-between border-b border-slate-100 bg-slate-50/50">
        <div className="flex gap-4">
          <div className={`mt-1 w-2 h-2 rounded-full ring-4 ${data.severity === 'high' ? 'bg-rose-500 ring-rose-100' :
              data.severity === 'medium' ? 'bg-amber-500 ring-amber-100' :
                'bg-blue-500 ring-blue-100'
            }`} />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${SEVERITY_COLORS[data.severity]}`}>
                {data.type === 'StatusInference' ? 'הנדסה לאחור' : 'פער לוגיסטי'}
              </span>
              <span className="text-slate-500 text-xs flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> {data.timestamp}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-sans leading-tight">
              {data.title}
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-1">
              ID: {data.targetId}
            </p>
          </div>
        </div>
      </div>

      {/* Detective Work Body: Discrepancy Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 relative">
        {/* Connector Icon */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full items-center justify-center z-10 shadow-sm">
          <ArrowRightLeft className="w-4 h-4 text-slate-400" />
        </div>

        {/* Source A: The "Lie" / Official Status */}
        <div className="p-4 bg-rose-50/30 border-l-4 border-rose-400">
          <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-1">
            {data.evidence.labelA}
          </p>
          <p className="text-slate-900 font-medium text-sm">
            {data.evidence.valueA}
          </p>
        </div>

        {/* Source B: The Truth / Physical Reality */}
        <div className="p-4 bg-emerald-50/30 border-l-4 border-emerald-500">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
            {data.evidence.labelB}
          </p>
          <p className="text-slate-900 font-medium text-sm">
            {data.evidence.valueB}
          </p>
        </div>
      </div>

      {/* AI Reasoning */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
        <p className="text-sm text-slate-600 leading-relaxed">
          <span className="font-bold text-blue-600 ml-1">ניתוח AI:</span>
          {data.description}
        </p>
      </div>

      {/* One-Click Action */}
      <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-end gap-3">
        <span className="text-xs text-slate-400 ml-auto">נחסך: 40 דקות חקירה</span>
        <button className="text-slate-500 hover:text-slate-700 text-sm px-3 py-1.5 rounded transition-colors font-medium">
          התעלם
        </button>
        <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-200 flex items-center gap-2 transition-all">
          <CheckCircle2 className="w-4 h-4" />
          {data.suggestedAction}
        </button>
      </div>
    </div>
  );
};

export default AnomalyCard;