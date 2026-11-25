import React from 'react';
import {
  Compass, Sparkles, Bot, ScanSearch, ShieldCheck, Workflow, Database,
  BadgeCheck, Infinity as InfinityIcon, Cloud, Code2, Landmark, HeartPulse,
  ShoppingCart, Shield, Factory, Layers, FileSearch, ListChecks, PlayCircle,
  Bug, Rocket, Network, UserCheck, GitBranch, ScrollText, Plug, Lock,
  Terminal, Cpu, Container, Activity, Headphones, UserPlus, BarChart3, Siren,
  Inbox, Copy, GitCompare, MessageSquare, KeyRound, EyeOff, Server, ShieldAlert, Scale,
} from 'lucide-react';

// Explicit map keeps lucide tree-shaking intact (no `import *`).
const map = {
  Compass, Sparkles, Bot, ScanSearch, ShieldCheck, Workflow, Database,
  BadgeCheck, Infinity: InfinityIcon, Cloud, Code2, Landmark, HeartPulse,
  ShoppingCart, Shield, Factory, Layers, FileSearch, ListChecks, PlayCircle,
  Bug, Rocket, Network, UserCheck, GitBranch, ScrollText, Plug, Lock,
  Terminal, Cpu, Container, Activity, Headphones, UserPlus, BarChart3, Siren,
  Inbox, Copy, GitCompare, MessageSquare, KeyRound, EyeOff, Server, ShieldAlert, Scale,
};

const Icon = ({ name, ...props }) => {
  const Cmp = map[name] || Sparkles;
  return <Cmp aria-hidden="true" {...props} />;
};

export default Icon;
