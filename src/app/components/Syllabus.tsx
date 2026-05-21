'use client';

import React, { useState } from 'react';
import { CourseType, SyllabusModule } from '../types';

interface SyllabusProps {
  activeCourse: CourseType;
  openModal: (course: CourseType, purpose?: 'syllabus' | 'consultation' | 'quick') => void;
}

const cdecSyllabus: SyllabusModule[] = [
  {
    id: 1,
    title: 'Module 1: Introduction to CDEC & SDLC Foundations',
    subtitle: 'IT Team Dynamics & Software Architectures',
    topics: [
      'How IT Companies work [Team dynamics, roles & real-world setups]',
      'What is an Application & Stages of the Application Development Life Cycle',
      'Monolithic vs Microservices vs Serverless Architectures',
      'Developers vs Testers vs DevOps Engineers',
      'Why DevOps? Core value proposition & Real-time production operations',
      'What is an API and its common enterprise uses',
      'Understanding Cloud Native Applications'
    ]
  },
  {
    id: 2,
    title: 'Module 2: Linux Administration & Core Systems',
    subtitle: 'The Absolute Foundation of DevOps Operations',
    topics: [
      'What is Linux? Architecture, Shells & core Kernel layers',
      'Basic commands, working with files, and terminal Editors (Vim/Nano)',
      'Understanding the Linux File System Hierarchy & permissions models',
      'Input/Output Redirections, Pipes, and standard streams',
      'User Administration, groups, and Permission Management',
      'Archiving, text filtering (grep/sed), and cron job scheduling',
      'Linux Package Management, package dependencies & custom installations',
      'Linux Networking concepts & system process management'
    ]
  },
  {
    id: 3,
    title: 'Module 3: Collaborative SCM with Git & GitHub',
    subtitle: 'Code Versioning & Branching Strategies',
    topics: [
      'Git fundamentals: installation, initialization & working directories',
      'Branching Strategies: Gitflow, Feature Branching, and Trunk-based development',
      'Working with Git remotes: GitHub, GitLab, and BitBucket',
      'Managing PRs (Pull Requests), reviews, code sync, and stash controls',
      'Implementing branch protection policies and collaboration guidelines'
    ]
  },
  {
    id: 4,
    title: 'Module 4: Enterprise Cloud Computing on AWS',
    subtitle: 'Architecting Resilient Multi-Region Infrastructures',
    topics: [
      'What is Cloud Computing? Traditional vs Cloud Hosting paradigms',
      'AWS Cloud Architecture, VPC core networking, subnets & routing tables',
      'IAM Foundations (Users, Groups, Roles, Policies) & AWS Pricing Calculator',
      'Compute Services: EC2, Elastic Load Balancer (ELB), and Auto Scaling',
      'Storage Services: Simple Storage Service (S3), EBS volumes, and EFS shares',
      'Serverless computing using AWS Lambda & Managed databases (RDS, MongoDB)',
      'Infrastructure logging via CloudWatch & Container Insights analytics'
    ]
  },
  {
    id: 5,
    title: 'Module 5: Containerization with Docker',
    subtitle: 'Isolating & Standardizing Environments',
    topics: [
      'Docker introduction: Microservices packaging & image layers',
      'Virtualization vs Containerization concepts & engine designs',
      'Docker Commands for container lifecycles, execution & inspects',
      'Writing highly optimized Multi-stage Dockerfiles',
      'Container networking (Bridges, host, overlays) & volume mounts',
      'Docker Compose for multi-container application coordination',
      'Deploying a full three-tier application using Docker'
    ]
  },
  {
    id: 6,
    title: 'Module 6: Container Orchestration with Kubernetes',
    subtitle: 'High Availability Scale & Operations',
    topics: [
      'Kubernetes Architecture: Control Plane, worker nodes, and API Server',
      'Deploying K8s clusters using Kubeadm, AWS EKS, and MiniKube',
      'Core K8s Objects: Pods, Deployments, ReplicaSets, and DaemonSets',
      'Configuring ConfigMaps, Secrets, PV (Persistent Volumes) & PVCs',
      'Kubernetes Networking, Services (ClusterIP, NodePort, LoadBalancer), and Ingress',
      'Writing YAML manifests & package manager deployments via Helm charts',
      'Deploying and scaling three-tier systems on Kubernetes'
    ]
  },
  {
    id: 7,
    title: 'Module 7: Infrastructure as Code (IaC) with Terraform',
    subtitle: 'Automated Declarative Cloud Deployments',
    topics: [
      'Introduction to Terraform, CLI commands, and HCL declarative syntax',
      'Understanding Terraform providers, provisioners, and resource blocks',
      'Building highly modular, reusable, and secure Terraform configurations',
      'Managing Terraform state files, state locking, and remote backends (S3/DynamoDB)',
      'Leveraging dynamic blocks, variables, expressions, and cloud data sources',
      'Deploying a complete three-tier VPC architecture on AWS using Terraform'
    ]
  },
  {
    id: 8,
    title: 'Module 8: Continuous Integration & Deployment (CI/CD)',
    subtitle: 'Building Robust Automated DevOps Pipelines',
    topics: [
      'Jenkins installation, setup, and master-slave distributed agent layout',
      'Creating free-style, multi-branch, and parameterized build pipelines',
      'Writing professional declarative Jenkinsfiles with plugins',
      'Building CI/CD pipelines via GitHub Actions & GitLab CI yaml workflows',
      'Deploying cloud infrastructure automations using Jenkins & Terraform',
      'Building end-to-end automated pipelines for three-tier app deployments'
    ]
  },
  {
    id: 9,
    title: 'Module 9: Observability & Monitoring with Datadog',
    subtitle: 'Enterprise Monitoring & Performance Metrics',
    topics: [
      'Introduction to Datadog, architecture, and Datadog Agent installation',
      'Configuring dashboards, metric collection rules, and threshold alerts',
      'Logs management, log parsing, and infrastructure monitoring',
      'Distributed application tracing and transaction monitoring'
    ]
  },
  {
    id: 10,
    title: 'Module 10: Operations Automation with Python & Shell Scripting',
    subtitle: 'Script-Driven DevOps & Cloud Systems',
    topics: [
      'Introduction to Shell scripting structure, variables, inputs, and commands',
      'Conditions and loops (for/while/if-else) & text processors (SED/AWK)',
      'Automated local tasks, SORT, UNIQ, and hosting websites via scripts',
      'Python programming syntax, core data types, lists, dictionaries, and OOP',
      'Python file handling, exception handling, and custom module building',
      'Automating AWS Cloud resource operations using Python and Boto3 SDK'
    ]
  },
  {
    id: 11,
    title: 'Module 11: Multi-Cloud Competency: Azure & GCP (OFFER)',
    subtitle: 'Cross-Cloud Deployments & Operations',
    topics: [
      'Introduction to Microsoft Azure Cloud & compute services (VMs)',
      'Azure storage structures, virtual networking, and Azure Monitoring alerts',
      'Introduction to Google Cloud Platform (GCP) & compare GCP vs AWS resources',
      'GCP IAM controls, Cloud Storage, Compute Engines & VPC configs',
      'Cloud Monitoring and logging operations inside GCP'
    ]
  }
];

const xdsaiSyllabus: SyllabusModule[] = [
  {
    id: 1,
    title: 'Module 1: Core & Advance Python Programming',
    subtitle: 'Core Engineering & Data Manipulation',
    topics: [
      'Introduction to Data Science & Introduction to Python',
      'Play with Variables, Data Types & Python Expressions',
      'Conditional Statements, Loops, Iterations & Designing Patterns',
      'Data Structure: List, Tuples, Sets & Dictionaries',
      'Functions in Python & OOP Principles structure code',
      'Regular Expressions (Regex) & Optical Character Recognition (OCR)',
      'Handle Error and Exceptions & Package Management in Python',
      'Data Manipulation with Pandas Arrays in Python',
      'Statistical Analysis with Numpy',
      'Data Visualization & Working with Data Files',
      'Advance Data Manipulation Techniques'
    ]
  },
  {
    id: 2,
    title: 'Module 2: SQL - Structured Query Language',
    subtitle: 'Data Architecture, Queries & Operations',
    topics: [
      'Introduction to SQL & Data Query Basics',
      'DDL (Data Definition Language) & Constraints in SQL',
      'DML (Data Manipulation Language) & DTL Essentials',
      'Joining Tables & Aggregate Functions',
      'Understanding Clauses & Connecting to Database using Python'
    ]
  },
  {
    id: 3,
    title: 'Module 3: Statistics for Data Analytics',
    subtitle: 'Probability, Distributions & Inferential Testing',
    topics: [
      'Introduction to Statistics & Descriptive Statistics',
      'Measure of Dispersion & Probability Fundamentals',
      'Graphs / Charts in Statistics',
      'Inferential Statistics & Hypothesis Testing',
      'CHI-Square Testing'
    ]
  },
  {
    id: 4,
    title: 'Module 4: Machine Learning Core',
    subtitle: 'Supervised & Unsupervised Systems',
    topics: [
      'Introduction to Machine Learning & Supervised Machine Learning',
      'Regression Analysis & Classification Techniques',
      'Unsupervised Machine Learning',
      'Underfitting and Overfitting in ML',
      'Hyperparameter Tuning & Balancing Precision'
    ]
  },
  {
    id: 5,
    title: 'Module 5: Deep Learning Systems',
    subtitle: 'Neural Network Architectures',
    topics: [
      'Introduction to Deep Learning & Basics of Neural Network',
      'Artificial Neural Network & Deep Learning Frameworks',
      'Convolutional Neural Network & Recurrent Neural Network',
      'Generative Adversarial Network',
      'Natural Language Processing',
      'Transformers and Attention Mechanisms'
    ]
  },
  {
    id: 6,
    title: 'Module 6: Artificial Intelligence & Generative Models',
    subtitle: 'Mastering Advanced Cognitive Systems',
    topics: [
      'Fundamentals of Artificial Intelligence',
      'Problem Solving and Search Algorithms & Knowledge Engineering',
      'Application of game theory & AI in Sentiment Analysis',
      'AI in Core Business & Deep Dive with Generative Model',
      'Transfer Learning & Fine Tuning Models',
      'Graph Neural Networks & Social Network Analysis'
    ]
  },
  {
    id: 7,
    title: 'Module 7: Business Intelligence (BI) & Advance Excel',
    subtitle: 'Visual Analytics & Interactive C-Suite Dashboards',
    topics: [
      'Introduction to BI tools & Introduction to Tableau',
      'Basic Data Operations & Graphs in Tableau',
      'Sets Tableau Calculations & Interactive Dashboards',
      'BI Case Studies & Introduction to Excel',
      'Conditional Formatting & Data Analysis Functions',
      'Pivot Tables, Data Validation & Excel in Data Science'
    ]
  },
  {
    id: 8,
    title: 'Module 8: R-Programming in Data Science',
    subtitle: 'Alternative Statistical & Programming Stack',
    topics: [
      'Introduction to R-Programming and R-Studio',
      'Play with Variables, Data Types & Python Expressions in R',
      'Conditional Statements, Loops & Iterations in R',
      'Vector and Matrix in R & Arrays, List, DataFrames',
      'Strings and Manipulation & Machine Learning in R'
    ]
  }
];

export default function Syllabus({ activeCourse, openModal }: SyllabusProps) {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  const syllabus = activeCourse === 'cdec' ? cdecSyllabus : xdsaiSyllabus;

  const toggleModule = (id: number) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <section id="syllabus" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left Side: Callouts and download badge */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:sticky lg:top-28">
          <div className="space-y-4">
            <span className="text-[10px] font-extrabold uppercase text-coral tracking-wider bg-coral/10 px-3.5 py-1.5 rounded-full">
              Full-Scale Curriculums
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark tracking-tight">
              Syllabus Engineered for <br />
              <span className="text-gradient">Production Readiness</span>
            </h2>
            <p className="text-sm sm:text-base text-text-medium leading-relaxed font-medium">
              We skip basic code introductions and focus immediately on real enterprise tools, scaling concepts, and standard industry pipeline designs.
            </p>
          </div>

          {/* Interactive Info Card */}
          <div className="rounded-3xl border border-border-light bg-white p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-brand" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/10 text-purple">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-dark">Interactive Practice Sandbox</h4>
                  <p className="text-[11px] text-text-muted">No configuration required - run code on cloud sandbox.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral/10 text-coral">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-dark">Capstone Architecture Labs</h4>
                  <p className="text-[11px] text-text-muted">Deploy complete web configurations to cloud servers.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => openModal(activeCourse, 'syllabus')}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand hover:opacity-95 text-white font-bold text-xs py-4 shadow-lg shadow-coral/10"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Syllabus</span>
            </button>
          </div>
        </div>

        {/* Right Side: Accordion modules */}
        <div className="lg:col-span-7 space-y-4">
          {syllabus.map((mod) => {
            const isExpanded = expandedModule === mod.id;
            return (
              <div
                key={mod.id}
                className={`rounded-2xl border transition-all duration-300 ${isExpanded ? 'border-coral bg-white shadow-lg' : 'border-border-light bg-white/40 hover:bg-white'}`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between p-5 text-left outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1">
                    <span className="block text-xs font-semibold text-text-muted">{mod.subtitle}</span>
                    <h3 className="text-sm sm:text-base font-bold text-text-dark leading-tight">{mod.title}</h3>
                  </div>

                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${isExpanded ? 'border-coral bg-coral text-white rotate-180' : 'border-border-light text-text-muted bg-white'}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Content Topics */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-border-light bg-slate-50/50 rounded-b-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3.5">
                      {mod.topics.map((topic, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          {/* Bullet marker */}
                          <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-coral/10 text-coral">
                            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                          </div>
                          <span className="min-w-0 text-xs sm:text-sm font-medium text-text-medium leading-normal">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
