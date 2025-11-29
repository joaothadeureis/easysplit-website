import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Fev', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
  { name: 'Abr', uv: 2780, pv: 3908 },
  { name: 'Mai', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
  { name: 'Jul', uv: 3490, pv: 4300 },
];

const barData = [
  { name: 'Var A', value: 45 },
  { name: 'Var B', value: 78 },
];

export const DashboardMockup: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-4xl rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
      {/* Fake Browser Header */}
      <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto text-xs font-medium text-neutral-500">EasySplit Dashboard</div>
      </div>

      {/* Content */}
      <div className="p-6 grid gap-6 md:grid-cols-2">
        {/* Metric Cards */}
        <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { label: 'Usuários', val: '12.450', color: 'text-white' },
                { label: 'Sessões', val: '8.900', color: 'text-brand-yellow' },
                { label: 'Conversões', val: '1.280', color: 'text-white' },
                { label: 'Taxa Conv.', val: '8,5%', color: 'text-brand-yellow' },
            ].map((s, i) => (
                <div key={i} className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-800">
                    <div className="text-xs text-neutral-400 mb-1">{s.label}</div>
                    <div className={`text-xl md:text-2xl font-bold ${s.color}`}>{s.val}</div>
                </div>
            ))}
        </div>

        {/* Charts */}
        <div className="bg-neutral-800/30 p-4 rounded-lg border border-neutral-800 min-h-[200px]">
            <div className="text-sm text-neutral-400 mb-4">Evolução de Sessões</div>
            <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: '#FACC15' }}
                        />
                        <Area type="monotone" dataKey="uv" stroke="#FACC15" fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-neutral-800/30 p-4 rounded-lg border border-neutral-800 min-h-[200px]">
             <div className="text-sm text-neutral-400 mb-4">Comparativo A/B: Receita</div>
             <div className="h-[150px] w-full flex items-end justify-around pb-4">
                 <div className="w-1/3 h-full flex flex-col justify-end items-center gap-2">
                    <div className="w-full bg-neutral-700 rounded-t-sm h-[45%] transition-all hover:bg-neutral-600"></div>
                    <span className="text-xs text-neutral-500">Variante A</span>
                 </div>
                 <div className="w-1/3 h-full flex flex-col justify-end items-center gap-2">
                    <div className="w-full bg-brand-yellow rounded-t-sm h-[78%] shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all hover:bg-yellow-300"></div>
                    <span className="text-xs text-brand-yellow font-bold">Variante B</span>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};