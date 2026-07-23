import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  Wifi, 
  WifiOff, 
  ShieldAlert, 
  MapPin, 
  Activity, 
  Zap, 
  CheckCircle, 
  Clock, 
  Layers,
  Sparkles,
  Server,
  Users,
  Building2,
  Truck
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Node {
  id: string;
  name: string;
  type: 'command' | 'shelter' | 'family' | 'supply' | 'repeater';
  x: number;
  y: number;
  status: 'online' | 'degraded' | 'mesh_active' | 'offline';
  battery: number;
  members?: number;
  capacity?: string;
  supplies?: string;
  lastPing: string;
}

const INITIAL_NODES: Node[] = [
  { id: 'node_cmd', name: 'County Emergency Operations Center (EOC)', type: 'command', x: 50, y: 30, status: 'online', battery: 100, lastPing: 'Just now' },
  { id: 'node_sh1', name: 'Shelter Alpha (West High School)', type: 'shelter', x: 25, y: 45, status: 'online', battery: 92, capacity: '82% (240/300 beds occupied)', lastPing: '2s ago' },
  { id: 'node_sh2', name: 'Shelter Bravo (Civic Center)', type: 'shelter', x: 75, y: 55, status: 'mesh_active', battery: 84, capacity: '45% (110/250 beds occupied)', lastPing: '5s ago' },
  { id: 'node_fam1', name: 'Family Group #104 (Johnson Household)', type: 'family', x: 35, y: 70, status: 'online', battery: 88, members: 4, lastPing: '1s ago' },
  { id: 'node_fam2', name: 'Family Group #209 (Chen Household)', type: 'family', x: 65, y: 75, status: 'mesh_active', battery: 65, members: 3, lastPing: '4s ago' },
  { id: 'node_sup1', name: 'Logistics Hub North (Water & Power)', type: 'supply', x: 80, y: 25, status: 'online', battery: 98, supplies: '4,000 Gal Water, 12 Solar Arrays', lastPing: 'Just now' },
  { id: 'node_rep1', name: 'Relay Beacon #04 (Pine Ridge Hill)', type: 'repeater', x: 48, y: 60, status: 'mesh_active', battery: 78, lastPing: '1s ago' },
];

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

const CONNECTIONS: Connection[] = [
  { from: 'node_cmd', to: 'node_sh1', active: true },
  { from: 'node_cmd', to: 'node_sup1', active: true },
  { from: 'node_sh1', to: 'node_rep1', active: true },
  { from: 'node_rep1', to: 'node_sh2', active: true },
  { from: 'node_sh1', to: 'node_fam1', active: true },
  { from: 'node_rep1', to: 'node_fam2', active: true },
  { from: 'node_sh2', to: 'node_fam2', active: true },
];

export function LiveMeshMap() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(INITIAL_NODES[0]);
  const [gridState, setGridState] = useState<'cellular_online' | 'cell_outage_mesh' | 'total_blackout'>('cell_outage_mesh');
  const [pulseKey, setPulseKey] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseKey(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (node: Node) => {
    soundEngine.playClick();
    setSelectedNode(node);
  };

  const handleGridToggle = (state: 'cellular_online' | 'cell_outage_mesh' | 'total_blackout') => {
    soundEngine.playBeep( state === 'cellular_online' ? 800 : state === 'cell_outage_mesh' ? 600 : 400, 0.12 );
    setGridState(state);
  };

  const getNodeIcon = (type: Node['type']) => {
    switch (type) {
      case 'command': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'shelter': return <Building2 className="w-4 h-4 text-blue-400" />;
      case 'family': return <Users className="w-4 h-4 text-amber-400" />;
      case 'supply': return <Truck className="w-4 h-4 text-purple-400" />;
      case 'repeater': return <Radio className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden my-6">
      {/* Top Controls Bar */}
      <div className="p-4 md:p-6 bg-slate-900/90 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Live Mesh Telemetry Simulation
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            Peer-to-Peer Resilient Network Visualizer
          </h4>
        </div>

        {/* State Simulator Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => handleGridToggle('cellular_online')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              gridState === 'cellular_online'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            Cellular Online
          </button>

          <button
            onClick={() => handleGridToggle('cell_outage_mesh')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              gridState === 'cell_outage_mesh'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            Cell Towers Down (Mesh On)
          </button>

          <button
            onClick={() => handleGridToggle('total_blackout')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              gridState === 'total_blackout'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            Grid Blackout
          </button>
        </div>
      </div>

      {/* Main Map Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative min-h-[460px]">
        {/* Interactive SVG Radar Stage */}
        <div className="lg:col-span-8 bg-slate-950 p-6 relative overflow-hidden flex items-center justify-center">
          
          {/* Tactical Grid Background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px), radial-gradient(#1e293b 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px'
            }}
          />

          {/* Radar Sweep Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-slate-800/80 pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20 animate-spin" style={{ animationDuration: '30s' }} />
          </div>

          <svg className="w-full h-[380px] md:h-[440px] relative z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Draw Connecting Signal Lines */}
            {CONNECTIONS.map((conn, idx) => {
              const nodeA = INITIAL_NODES.find(n => n.id === conn.from);
              const nodeB = INITIAL_NODES.find(n => n.id === conn.to);
              if (!nodeA || !nodeB) return null;

              const isConnectedInBlackout = gridState !== 'total_blackout';

              return (
                <g key={`conn_${idx}`}>
                  {/* Outer line glow */}
                  <line
                    x1={nodeA.x}
                    y1={nodeA.y}
                    x2={nodeB.x}
                    y2={nodeB.y}
                    stroke={gridState === 'cell_outage_mesh' ? '#10b981' : gridState === 'total_blackout' ? '#ef4444' : '#3b82f6'}
                    strokeWidth="0.8"
                    strokeOpacity={isConnectedInBlackout ? "0.4" : "0.15"}
                    strokeDasharray={gridState === 'cell_outage_mesh' ? '2 2' : 'none'}
                  />

                  {/* Animated Packet Pulses */}
                  {isConnectedInBlackout && (
                    <circle r="1" fill="#34d399">
                      <animateMotion
                        path={`M ${nodeA.x} ${nodeA.y} L ${nodeB.x} ${nodeB.y}`}
                        dur={`${2 + (idx % 3)}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Draw Interactive Nodes */}
            {INITIAL_NODES.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              
              return (
                <g 
                  key={node.id} 
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group"
                  onClick={() => handleNodeClick(node)}
                >
                  {/* Selection Ripple Ring */}
                  {isSelected && (
                    <circle r="6" fill="none" stroke="#10b981" strokeWidth="0.5" className="animate-ping" />
                  )}

                  {/* Node Outer Circle */}
                  <circle
                    r={isSelected ? "4.5" : "3.5"}
                    fill={node.type === 'command' ? '#059669' : node.type === 'shelter' ? '#2563eb' : node.type === 'family' ? '#d97706' : '#9333ea'}
                    stroke="#0f172a"
                    strokeWidth="1"
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  {/* Node Inner Core Dot */}
                  <circle r="1.5" fill="#ffffff" />

                  {/* Node Label Text */}
                  <text
                    y="7"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="2.2"
                    fontWeight="600"
                    className="font-mono tracking-tight group-hover:fill-white pointer-events-none"
                  >
                    {node.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Grid Mode Overlay Notice */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2">
            {gridState === 'cellular_online' && (
              <>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Primary Telecom Active • LTE / 5G Sync On</span>
              </>
            )}
            {gridState === 'cell_outage_mesh' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Cellular Down • AERA Bluetooth/Wi-Fi Mesh Routing Traffic</span>
              </>
            )}
            {gridState === 'total_blackout' && (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Severe Electromagnetic Interference • Local Caching Active</span>
              </>
            )}
          </div>
        </div>

        {/* Right Panel: Selected Node Telemetry Details */}
        <div className="lg:col-span-4 bg-slate-900/95 border-t lg:border-t-0 lg:border-l border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                  {selectedNode && getNodeIcon(selectedNode.type)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Node Inspector</span>
                  <h5 className="text-sm font-bold text-white line-clamp-1">{selectedNode?.name}</h5>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                {selectedNode?.status === 'online' ? '100% Signal' : 'Mesh Relayed'}
              </span>
            </div>

            {selectedNode && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block font-mono">Node Type</span>
                    <span className="font-semibold text-slate-200 uppercase text-[11px]">{selectedNode.type}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block font-mono">Power Reserve</span>
                    <span className="font-semibold text-emerald-400 text-[11px]">{selectedNode.battery}% Battery</span>
                  </div>
                </div>

                {selectedNode.capacity && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-mono">Shelter Capacity</span>
                    <span className="font-medium text-slate-200 text-xs">{selectedNode.capacity}</span>
                  </div>
                )}

                {selectedNode.supplies && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-mono">Available Emergency Stock</span>
                    <span className="font-medium text-slate-200 text-xs">{selectedNode.supplies}</span>
                  </div>
                )}

                {selectedNode.members && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-mono">Registered Family Count</span>
                    <span className="font-medium text-emerald-300 text-xs">{selectedNode.members} Verified Active</span>
                  </div>
                )}

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/60 text-xs space-y-2">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Lat/Long Coordinates</span>
                    <span className="font-mono text-slate-300">37.7749° N, 122.4194° W</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Last Heartbeat</span>
                    <span className="font-mono text-emerald-400">{selectedNode.lastPing}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Encryption Level</span>
                    <span className="font-mono text-slate-300">AES-256 Quantum Resistant</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Click any node on the radar grid to simulate point-to-point emergency messages even when cellular towers fail.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
