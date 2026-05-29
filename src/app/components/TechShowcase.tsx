'use client';

import React, { useState } from 'react';
import { CourseType } from '../types';
import { FaAws } from 'react-icons/fa';
import { IoLogoTableau } from 'react-icons/io5';
import {
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiAnsible,
  SiGit,
  SiGithub,
  SiPrometheus,
  SiGrafana,
  SiPython,
  SiPostgresql,
  SiR,
  SiScikitlearn,
  SiPytorch,
  SiTensorflow,
  SiOpenai,
  SiGooglecloud
} from 'react-icons/si';

interface Tool {
  name: string;
  category: string;
  description: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  useCase: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
}

interface ShowcaseProps {
  activeCourse: CourseType;
  openModal: (course: CourseType, purpose?: 'syllabus' | 'consultation' | 'quick') => void;
}

const devopsTools: Tool[] = [
  {
    name: 'Amazon Web Services (AWS)',
    category: 'Cloud Infrastructure',
    description: 'Deploy highly scalable, fault-tolerant infrastructure spanning global regions, mastering EC2, S3, RDS, IAM, and VPC structures.',
    skillLevel: 'Intermediate',
    useCase: 'Production Hosting & Cloud Architecture',
    badgeBg: 'bg-orange-50 border-orange-200/50',
    badgeText: 'text-orange-600',
    accentColor: 'group-hover:border-orange-400 group-hover:shadow-orange-500/5'
  },
  {
    name: 'Docker',
    category: 'Containerization',
    description: 'Package applications into lightweight, standalone container images to guarantee consistent runtime environments across any developer workspace or production server.',
    skillLevel: 'Beginner',
    useCase: 'App Isolation & Portability',
    badgeBg: 'bg-sky-50 border-sky-200/50',
    badgeText: 'text-sky-600',
    accentColor: 'group-hover:border-sky-400 group-hover:shadow-sky-500/5'
  },
  {
    name: 'Kubernetes',
    category: 'Orchestration',
    description: 'Automate deployment, scaling, and production management of containerized application clusters, mastering self-healing, rolling updates, and ingress.',
    skillLevel: 'Advanced',
    useCase: 'Microservices Scale Management',
    badgeBg: 'bg-blue-50 border-blue-200/50',
    badgeText: 'text-blue-600',
    accentColor: 'group-hover:border-blue-400 group-hover:shadow-blue-500/5'
  },
  {
    name: 'Terraform',
    category: 'Infrastructure as Code (IaC)',
    description: 'Define, version, and provision complex multi-cloud cloud infrastructures using safe, human-readable declarative configuration files.',
    skillLevel: 'Intermediate',
    useCase: 'Automated Environment Provisioning',
    badgeBg: 'bg-purple-50 border-purple-200/50',
    badgeText: 'text-purple-600',
    accentColor: 'group-hover:border-purple-400 group-hover:shadow-purple-500/5'
  },
  {
    name: 'Jenkins',
    category: 'CI/CD Pipelines',
    description: 'Build continuous integration and delivery pipelines for automatic testing, code analysis, container building, and zero-downtime deployment triggers.',
    skillLevel: 'Intermediate',
    useCase: 'Continuous Integration Automation',
    badgeBg: 'bg-red-50 border-red-200/50',
    badgeText: 'text-red-600',
    accentColor: 'group-hover:border-red-400 group-hover:shadow-red-500/5'
  },
  {
    name: 'Ansible',
    category: 'Configuration Management',
    description: 'Automate software installation, package updates, system configuration, and remote task execution across dozens of remote servers in parallel.',
    skillLevel: 'Beginner',
    useCase: 'Server Fleet Configuration Orchestration',
    badgeBg: 'bg-slate-50 border-slate-200/50',
    badgeText: 'text-slate-700',
    accentColor: 'group-hover:border-slate-400 group-hover:shadow-slate-500/5'
  },
  {
    name: 'Git & GitHub',
    category: 'Version Control',
    description: 'Manage complex code changes, branch policies, pull requests, and collaborate effectively with developers inside global agile teams.',
    skillLevel: 'Beginner',
    useCase: 'Collaborative Source Code Hosting',
    badgeBg: 'bg-emerald-50 border-emerald-200/50',
    badgeText: 'text-emerald-600',
    accentColor: 'group-hover:border-emerald-400 group-hover:shadow-emerald-500/5'
  },
  {
    name: 'Prometheus & Grafana',
    category: 'Monitoring & Observability',
    description: 'Establish real-time cluster metrics, CPU/memory alerts, and visualize live system performance statistics inside stunning operations dashboards.',
    skillLevel: 'Advanced',
    useCase: 'System Health Tracking & Alerting',
    badgeBg: 'bg-amber-50 border-amber-200/50',
    badgeText: 'text-amber-600',
    accentColor: 'group-hover:border-amber-400 group-hover:shadow-amber-500/5'
  }
];

const dataScienceTools: Tool[] = [
  {
    name: 'Python Programming',
    category: 'Programming & Manipulation',
    description: 'Master Core & Advance Python, handling NumPy matrix operations, Pandas dataframes, file manipulation, and OOP principles.',
    skillLevel: 'Beginner',
    useCase: 'Primary Data Science Scripting & Wrangling Engine',
    badgeBg: 'bg-sky-50 border-sky-200/50',
    badgeText: 'text-sky-600',
    accentColor: 'group-hover:border-sky-400 group-hover:shadow-sky-500/5'
  },
  {
    name: 'SQL (Structured Query Language)',
    category: 'Relational Databases',
    description: 'Design robust schemas and master DDL/DML, joins, aggregates, windows, and database connectivity using Python.',
    skillLevel: 'Beginner',
    useCase: 'Structured Enterprise Query Processing & Storage',
    badgeBg: 'bg-emerald-50 border-emerald-200/50',
    badgeText: 'text-emerald-600',
    accentColor: 'group-hover:border-emerald-400 group-hover:shadow-emerald-500/5'
  },
  {
    name: 'R-Programming',
    category: 'Statistical Programming',
    description: 'Learn R-Studio, vector & matrix mechanics, array operations, list manipulation, and statistical modeling in R.',
    skillLevel: 'Beginner',
    useCase: 'Alternative Statistical Analytics Stack',
    badgeBg: 'bg-blue-50 border-blue-200/50',
    badgeText: 'text-blue-600',
    accentColor: 'group-hover:border-blue-400 group-hover:shadow-blue-500/5'
  },
  {
    name: 'Scikit-Learn',
    category: 'Machine Learning',
    description: 'Implement supervised and unsupervised algorithms: regression, classification techniques, clustering, and Optuna tuning.',
    skillLevel: 'Intermediate',
    useCase: 'Predictive Modeling & Inference Testing',
    badgeBg: 'bg-rose-50 border-rose-200/50',
    badgeText: 'text-rose-600',
    accentColor: 'group-hover:border-rose-400 group-hover:shadow-rose-500/5'
  },
  {
    name: 'PyTorch & TensorFlow',
    category: 'Deep Learning',
    description: 'Design deep neural networks, CNNs, RNNs, LSTMs, and deploy transfer learning with attention mechanisms and Transformers.',
    skillLevel: 'Advanced',
    useCase: 'Neural Network Model Training & Computer Vision',
    badgeBg: 'bg-orange-50 border-orange-200/50',
    badgeText: 'text-orange-600',
    accentColor: 'group-hover:border-orange-400 group-hover:shadow-orange-500/5'
  },
  {
    name: 'Generative AI & LLMs',
    category: 'Artificial Intelligence',
    description: 'Deep dive with generative model APIs, transfer learning, fine-tuning models, graph neural networks, and sentiment analysis.',
    skillLevel: 'Advanced',
    useCase: 'Advanced Cognitive & Generative AI Solutions',
    badgeBg: 'bg-purple-50 border-purple-200/50',
    badgeText: 'text-purple-600',
    accentColor: 'group-hover:border-purple-400 group-hover:shadow-purple-500/5'
  },
  {
    name: 'Tableau & Power BI',
    category: 'Business Intelligence',
    description: 'Master BI tools to execute data operations, Sets calculations, and construct stunning interactive KPI dashboards.',
    skillLevel: 'Intermediate',
    useCase: 'Enterprise Reporting & Executive Data Storytelling',
    badgeBg: 'bg-indigo-50 border-indigo-200/50',
    badgeText: 'text-indigo-600',
    accentColor: 'group-hover:border-indigo-400 group-hover:shadow-indigo-500/5'
  },
  {
    name: 'AWS & Google Cloud',
    category: 'Big Data & Cloud',
    description: 'Leverage Hadoop, Spark, and major cloud computing platforms to process, deploy, and scale big data workloads.',
    skillLevel: 'Intermediate',
    useCase: 'Distributed Big Data Systems & Cloud Hosting',
    badgeBg: 'bg-amber-50 border-amber-200/50',
    badgeText: 'text-amber-600',
    accentColor: 'group-hover:border-amber-400 group-hover:shadow-amber-500/5'
  }
];

const getTechIcon = (name: string, className: string = "h-6 w-6") => {
  const normName = name.toLowerCase();

  // AWS / Cloud
  if (normName.includes('amazon web services') || normName.includes('aws')) {
    if (normName.includes('google cloud')) {
      return (
        <div className="flex items-center justify-center -space-x-2">
          <FaAws style={{ color: '#FF9900' }} className={className} />
          <SiGooglecloud style={{ color: '#4285F4' }} className={className} />
        </div>
      );
    }
    return <FaAws style={{ color: '#FF9900' }} className={className} />;
  }

  // Docker
  if (normName.includes('docker')) {
    return <SiDocker style={{ color: '#2496ED' }} className={className} />;
  }

  // Kubernetes
  if (normName.includes('kubernetes')) {
    return <SiKubernetes style={{ color: '#326CE5' }} className={className} />;
  }

  // Terraform
  if (normName.includes('terraform')) {
    return <SiTerraform style={{ color: '#844FBA' }} className={className} />;
  }

  // Jenkins
  if (normName.includes('jenkins')) {
    return <SiJenkins style={{ color: '#D24939' }} className={className} />;
  }

  // Ansible
  if (normName.includes('ansible')) {
    return <SiAnsible style={{ color: '#EE0000' }} className={className} />;
  }

  // Git & GitHub
  if (normName.includes('git')) {
    return (
      <div className="flex items-center justify-center -space-x-2">
        <SiGit style={{ color: '#F05032' }} className={className} />
        <SiGithub style={{ color: '#181717' }} className={className} />
      </div>
    );
  }

  // Prometheus & Grafana
  if (normName.includes('prometheus') || normName.includes('grafana')) {
    return (
      <div className="flex items-center justify-center -space-x-2">
        <SiPrometheus style={{ color: '#E6522C' }} className={className} />
        <SiGrafana style={{ color: '#F47A20' }} className={className} />
      </div>
    );
  }

  // Python
  if (normName.includes('python')) {
    return <SiPython style={{ color: '#3776AB' }} className={className} />;
  }

  // SQL (Structured Query Language)
  if (normName.includes('sql') || normName.includes('structured query')) {
    return <SiPostgresql style={{ color: '#4169E1' }} className={className} />;
  }

  // R-Programming
  if (normName.includes('r-programming') || normName.includes('r-studio')) {
    return <SiR style={{ color: '#276DC3' }} className={className} />;
  }

  // Scikit-Learn
  if (normName.includes('scikit')) {
    return <SiScikitlearn style={{ color: '#F7931E' }} className={className} />;
  }

  // PyTorch & TensorFlow
  if (normName.includes('pytorch') || normName.includes('tensorflow')) {
    return (
      <div className="flex items-center justify-center -space-x-2">
        <SiPytorch style={{ color: '#EE4C2C' }} className={className} />
        <SiTensorflow style={{ color: '#FF6F00' }} className={className} />
      </div>
    );
  }

  // Generative AI & LLMs
  if (normName.includes('generative') || normName.includes('ai') || normName.includes('llm')) {
    return <SiOpenai style={{ color: '#10A37F' }} className={className} />;
  }

  // Tableau & Power BI
  if (normName.includes('tableau') || normName.includes('power bi')) {
    return (
      <div className="flex items-center justify-center -space-x-2">
        <IoLogoTableau style={{ color: '#E97627' }} className={className} />
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="13" width="4.5" height="7" rx="0.75" fill="#F2C811"/>
          <rect x="9.75" y="8" width="4.5" height="12" rx="0.75" fill="#F2B211"/>
          <rect x="16.5" y="3" width="4.5" height="17" rx="0.75" fill="#E29611"/>
        </svg>
      </div>
    );
  }

  // Fallback beautiful gear icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
};;

export default function TechShowcase({ activeCourse, openModal }: ShowcaseProps) {
  const isDevops = activeCourse === 'cdec';
  const tools = isDevops ? devopsTools : dataScienceTools;
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const getDifficultyBadge = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/55';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200/55';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200/55';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <section id="tools-showcase" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border-light relative overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-coral/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-purple/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Area */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-[10px] font-extrabold uppercase text-coral tracking-wider bg-coral/10 px-3.5 py-1.5 rounded-full">
          Hands-on Toolkit
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight font-display">
          Technologies & Tools <span className="text-gradient">You Will Master</span>
        </h2>
        <p className="text-sm sm:text-base text-text-muted">
          Our industry-vetted learning paths are heavily focused on practical, laboratory-based training. Build complete portfolio projects and master the exact tech stack required by top employers.
        </p>
      </div>

      {/* Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {tools.map((tool, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedTool(tool === selectedTool ? null : tool)}
            className={`group rounded-3xl border border-border-light bg-white/50 p-6 hover:bg-white transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-lg shadow-sm ${tool.accentColor}`}
          >
            <div className="space-y-5">
              {/* Icon & Category Alignment */}
              <div className="flex items-start justify-between gap-4">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                  tool.badgeBg
                }`}>
                  {getTechIcon(tool.name, "h-6 w-6")}
                </div>
                <div className="flex flex-col items-end gap-1.5 text-right">
                  <span className={`text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md border shrink-0 ${tool.badgeBg} ${tool.badgeText}`}>
                    {tool.category}
                  </span>
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border ${getDifficultyBadge(tool.skillLevel)}`}>
                    {tool.skillLevel}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5">
                <h3 className="font-semibold text-base text-text-dark group-hover:text-coral transition-colors leading-snug">
                  {tool.name}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed font-normal">
                  {tool.description}
                </p>
              </div>
            </div>

            {/* Hover details display or baseline specs */}
            <div className="mt-6 pt-4 border-t border-border-light/70 space-y-1">
              <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">Use Case</span>
              <p className="text-[11px] font-bold text-text-dark leading-snug">
                {tool.useCase}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Modal Dialog for detailed info (Optional interactive touch) */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in select-none">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-border-light shadow-2xl relative">
            <button
              onClick={() => setSelectedTool(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-text-muted hover:text-text-dark hover:bg-slate-100 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-4.5">
                <div className={`h-15 w-15 rounded-2xl flex items-center justify-center shrink-0 border shadow-md ${selectedTool.badgeBg}`}>
                  {getTechIcon(selectedTool.name, "h-8 w-8")}
                </div>
                <div className="space-y-1 min-w-0">
                  <span className={`text-xs uppercase font-extrabold tracking-wider px-3 py-0.5 rounded-lg border inline-block ${selectedTool.badgeBg} ${selectedTool.badgeText}`}>
                    {selectedTool.category}
                  </span>
                  <h3 className="text-2xl font-black text-text-dark leading-tight truncate">{selectedTool.name}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Core Training Goal</span>
                  <p className="text-sm text-text-medium leading-relaxed font-medium">{selectedTool.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-border-light">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Curriculum Level</span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded border inline-block ${getDifficultyBadge(selectedTool.skillLevel)}`}>
                      {selectedTool.skillLevel}
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-border-light">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Industry Standard</span>
                    <span className="text-xs font-black text-text-dark">100% Industry Aligned</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Practical Use Case</span>
                  <p className="text-sm font-extrabold text-coral">{selectedTool.useCase}</p>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedTool(null);
                    openModal(activeCourse, 'syllabus');
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-brand text-white font-extrabold text-xs shadow-md hover:shadow-lg hover:shadow-coral/10 active:scale-95 transition-all text-center"
                >
                  Download Practice Labs Curriculum
                </button>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="px-6 py-3.5 rounded-2xl border border-border-light text-text-medium hover:bg-slate-50 font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Bottom Bar */}
      <div className="rounded-3xl border border-border-light bg-gradient-to-r from-coral/5 to-purple/5 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 bottom-0 left-1/2 w-48 bg-white/20 blur-xl -skew-x-12 pointer-events-none" />

        <div className="space-y-2 text-center md:text-left">
          <h4 className="font-extrabold text-lg sm:text-xl text-text-dark">
            Ready to master these tools in live interactive labs?
          </h4>
          <p className="text-xs sm:text-sm text-text-muted font-medium">
            Join the upcoming {isDevops ? 'Cloud DevOps' : 'Data Science & AI'} cohort and gain verified industry skills.
          </p>
        </div>

        <button
          onClick={() => openModal(activeCourse, 'syllabus')}
          className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-text-dark hover:bg-text-dark/90 text-white font-black text-xs shadow-md hover:shadow-lg active:scale-95 transition-all whitespace-nowrap"
        >
          Download Full Tech-Stack Syllabus
        </button>
      </div>
    </section>
  );
}
