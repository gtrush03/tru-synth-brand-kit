import React, { useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

interface AgenticOntologyDiagramProps {
  className?: string;
}

const AgenticOntologyDiagram = ({ className }: AgenticOntologyDiagramProps) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const [hoveredOntologyItem, setHoveredOntologyItem] = useState<string | null>(null);
  const [hoveredOutputItem, setHoveredOutputItem] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true, amount: 0.15 });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }
  };

  // Ontology item details
  const ontologyItems: Record<string, { title: string; desc: string; icon: string }> = {
    'crm': { title: 'CRM Data', desc: 'Customer relationship data including contacts, accounts, deals, and interaction history', icon: '👥' },
    'api': { title: 'REST APIs', desc: 'External service integrations and data feeds from third-party platforms', icon: '🔗' },
    'email': { title: 'Email', desc: 'Email communications, threads, attachments, and metadata extraction', icon: '📧' },
    'calendar': { title: 'Calendar', desc: 'Meeting schedules, availability, attendees, and event metadata', icon: '📅' },
    'documents': { title: 'Documents', desc: 'PDFs, spreadsheets, presentations, and structured document extraction', icon: '📁' },
    'databases': { title: 'Databases', desc: 'SQL, NoSQL, and data warehouse connections for structured data access', icon: '🗄️' },
    'cloud': { title: 'Cloud Storage', desc: 'S3, GCS, Azure Blob, and file system integrations', icon: '☁️' },
    'chat': { title: 'Chat / Messaging', desc: 'Slack, Teams, Discord, and real-time communication channels', icon: '💬' },
    'entities': { title: 'Entities', desc: 'Core business objects: People, Companies, Deals, Products mapped from your data', icon: '🏷️' },
    'relations': { title: 'Relations', desc: 'Connections between entities: ownership, membership, dependencies', icon: '🔀' },
    'workflows': { title: 'Workflows', desc: 'Business processes and automation sequences defined in your domain', icon: '⚡' },
    'rules': { title: 'Rules', desc: 'Business logic, validation constraints, and conditional behaviors', icon: '📋' },
    'permissions': { title: 'Permissions', desc: 'Access control, role-based policies, and authorization rules', icon: '🔐' },
    'events': { title: 'Events', desc: 'Business events, triggers, webhooks, and temporal sequences', icon: '📡' },
    'metrics': { title: 'Metrics', desc: 'KPIs, performance indicators, and quantitative measurements', icon: '📈' },
    'knowledge': { title: 'Knowledge', desc: 'Institutional knowledge, documentation, and decision context', icon: '🧠' },
  };

  // Output item details
  const outputItems: Record<string, { title: string; desc: string; icon: string }> = {
    'browser': { title: 'Browser Automation', desc: 'Automated web interactions, form filling, data extraction, and UI testing', icon: '🌐' },
    'document': { title: 'Document Gen', desc: 'PDF reports, spreadsheets, presentations, and formatted documents', icon: '📄' },
    'email_out': { title: 'Email Campaigns', desc: 'Personalized outreach, follow-ups, and automated email sequences', icon: '📤' },
    'slack': { title: 'Slack / Comms', desc: 'Team notifications, channel updates, and messaging integrations', icon: '💬' },
    'crm_out': { title: 'CRM Updates', desc: 'Contact updates, deal progression, and activity logging', icon: '📊' },
    'webhooks': { title: 'Webhooks / API', desc: 'External system triggers, data sync, and third-party integrations', icon: '🔌' },
    'dashboards': { title: 'Dashboards', desc: 'Real-time analytics dashboards, reports, and data visualizations', icon: '📊' },
    'deployments': { title: 'Deployments', desc: 'CI/CD pipelines, infrastructure provisioning, and release management', icon: '🚀' },
  };

  // Data flow paths for hover highlighting
  const dataFlowPaths: Record<string, { mappings: string[]; outputs: string[] }> = {
    crm: { mappings: ['entities', 'relations'], outputs: ['crm_out', 'dashboards'] },
    api: { mappings: ['entities', 'workflows'], outputs: ['webhooks', 'browser'] },
    email: { mappings: ['entities', 'events'], outputs: ['email_out', 'slack'] },
    calendar: { mappings: ['workflows', 'events'], outputs: ['slack', 'dashboards'] },
    documents: { mappings: ['knowledge', 'entities'], outputs: ['document', 'dashboards'] },
    databases: { mappings: ['entities', 'metrics'], outputs: ['dashboards', 'webhooks'] },
    cloud: { mappings: ['knowledge', 'permissions'], outputs: ['deployments', 'document'] },
    chat: { mappings: ['events', 'relations'], outputs: ['slack', 'email_out'] },
  };

  const highlightedNodes = useMemo(() => {
    if (!hoveredOntologyItem || !dataFlowPaths[hoveredOntologyItem]) return null;
    const paths = dataFlowPaths[hoveredOntologyItem];
    const set = new Set<string>([hoveredOntologyItem, ...paths.mappings, ...paths.outputs]);
    return set;
  }, [hoveredOntologyItem]);

  // Perfect alignment calculations for ontology nodes
  const centerX = 475;
  const nodeWidth = 130;
  const nodeGap = 20;
  const rowWidth = nodeWidth * 4 + nodeGap * 3;
  const startX = centerX - rowWidth / 2;

  const x1 = startX;
  const x2 = startX + nodeWidth + nodeGap;
  const x3 = startX + (nodeWidth + nodeGap) * 2;
  const x4 = startX + (nodeWidth + nodeGap) * 3;

  const c1 = x1 + nodeWidth / 2;
  const c2 = x2 + nodeWidth / 2;
  const c3 = x3 + nodeWidth / 2;
  const c4 = x4 + nodeWidth / 2;

  // AI Logo positions - PERFECTLY CENTERED
  const logoSize = 54;
  const logoGap = 16;
  const logoCount = 6;
  const logoTotalWidth = logoSize * logoCount + logoGap * (logoCount - 1);
  const logoStartX = centerX - logoTotalWidth / 2;

  const logos = [
    { id: 'claude', name: 'Claude', color: '#D97757' },
    { id: 'openai', name: 'OpenAI', color: '#10a37f' },
    { id: 'gemini', name: 'Gemini', color: '#4285F4' },
    { id: 'deepseek', name: 'DeepSeek', color: '#4D6BFE' },
    { id: 'zai', name: 'Z.ai', color: '#888888' },
    { id: 'more', name: 'More', color: '#555555' },
  ];

  // Tooltip content
  const tooltips: Record<string, { title: string; desc: string; stats: string }> = {
    ontology: { title: "The Ontology", desc: "Your business data mapped into a structured knowledge graph that agents can reason over", stats: "8 data sources • 8 mapping types" },
    skills: { title: "Skills", desc: "Pre-built prompt templates, reasoning chains, and memory modules for common business tasks", stats: "Prompts • Chains • Memory" },
    tools: { title: "Tools", desc: "Connected capabilities: web search, code execution, browser automation, and API integrations", stats: "Search • Code • Browser" },
    agents: { title: "Agent Orchestration", desc: "Multi-model AI orchestration with intelligent routing across Claude, GPT-4, Gemini, and more", stats: "5 AI models • Auto-routing" },
    output: { title: "Execution Output", desc: "Real-world execution: automated emails, documents, CRM updates, and system integrations", stats: "8 automation types" },
  };

  // Helper to get node opacity based on highlight state
  const getNodeOpacity = (nodeId: string): number => {
    if (!highlightedNodes) return 1;
    return highlightedNodes.has(nodeId) ? 1 : 0.3;
  };

  // Data source nodes - Row 1
  const dataSourcesRow1 = [
    { id: 'crm', label: 'CRM Data', x: x1, cx: c1 },
    { id: 'api', label: 'REST APIs', x: x2, cx: c2 },
    { id: 'email', label: 'Email', x: x3, cx: c3 },
    { id: 'calendar', label: 'Calendar', x: x4, cx: c4 },
  ];

  // Data source nodes - Row 2
  const dataSourcesRow2 = [
    { id: 'documents', label: 'Documents', x: x1, cx: c1 },
    { id: 'databases', label: 'Databases', x: x2, cx: c2 },
    { id: 'cloud', label: 'Cloud Storage', x: x3, cx: c3 },
    { id: 'chat', label: 'Chat / Msgs', x: x4, cx: c4 },
  ];

  // Mapping nodes - Row 1
  const mappingsRow1 = [
    { id: 'entities', label: 'Entities', x: x1, cx: c1 },
    { id: 'relations', label: 'Relations', x: x2, cx: c2 },
    { id: 'workflows', label: 'Workflows', x: x3, cx: c3 },
    { id: 'rules', label: 'Rules', x: x4, cx: c4 },
  ];

  // Mapping nodes - Row 2
  const mappingsRow2 = [
    { id: 'permissions', label: 'Permissions', x: x1, cx: c1 },
    { id: 'events', label: 'Events', x: x2, cx: c2 },
    { id: 'metrics', label: 'Metrics', x: x3, cx: c3 },
    { id: 'knowledge', label: 'Knowledge', x: x4, cx: c4 },
  ];

  // Output nodes - Row 1
  const outputsRow1 = [
    { id: 'browser', label: 'Browser Automation', x: x1, cx: c1 },
    { id: 'document', label: 'Document Gen', x: x2, cx: c2 },
    { id: 'email_out', label: 'Email Campaigns', x: x3, cx: c3 },
    { id: 'slack', label: 'Slack / Comms', x: x4, cx: c4 },
  ];

  // Output nodes - Row 2
  const outputsRow2 = [
    { id: 'crm_out', label: 'CRM Updates', x: x1, cx: c1 },
    { id: 'webhooks', label: 'Webhooks / API', x: x2, cx: c2 },
    { id: 'dashboards', label: 'Dashboards', x: x3, cx: c3 },
    { id: 'deployments', label: 'Deployments', x: x4, cx: c4 },
  ];

  return (
    <div className={cn("relative w-full max-w-[500px] md:max-w-[650px] lg:max-w-[720px] mx-auto", className)} style={{ isolation: 'isolate' }}>
      {/* Ontology Panels - Single container with smooth content transitions */}
      {/* Overview Panel - Side */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 right-[-60px] z-50 pointer-events-none ${
          hoveredSection === 'ontology' && !hoveredOntologyItem
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ transition: 'none' }}
      >
        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl [contain:paint] border border-[#928466]/40 rounded-2xl p-6 shadow-2xl shadow-black/50 w-[220px]">
          {/* Connector node - at top of panel pointing to ontology section */}
          <div className="absolute top-4 -left-8 flex items-center">
            <div className="w-6 h-px bg-gradient-to-r from-[#E8E0CC] to-[#E8E0CC]/50"/>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E8E0CC] shadow-[0_0_8px_rgba(232,224,204,0.6)] -ml-px"/>
          </div>

          <div className="text-[#E8E0CC] font-bold text-xl mb-3">The Ontology</div>
          <div className="w-10 h-0.5 bg-[#928466]/50 mb-4"/>
          <div className="text-white/50 text-sm leading-relaxed mb-4">
            Your domain knowledge structured into entities, relations, and rules
          </div>

          <div className="text-[#928466]/60 text-[10px] uppercase tracking-wider mb-2">Data Sources</div>
          <div className="space-y-2 mb-4">
            {['CRM Data', 'REST APIs', 'Email', 'Calendar', 'Documents', 'Databases', 'Cloud Storage', 'Chat/Messaging'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E8E0CC]"/>
                <span className="text-white/70 text-xs">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-[#928466]/60 text-[10px] uppercase tracking-wider mb-2">Mapping</div>
          <div className="space-y-2">
            {['Entities', 'Relations', 'Workflows', 'Rules', 'Permissions', 'Events', 'Metrics', 'Knowledge'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#928466]"/>
                <span className="text-[#928466] text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Ontology Item - Top tooltip */}
      <div
        className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-[-80px] z-50 pointer-events-none ${
          hoveredOntologyItem
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ transition: 'none' }}
      >
        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl [contain:paint] border border-[#E8E0CC]/30 rounded-2xl p-5 shadow-2xl shadow-black/50 min-w-[280px] max-w-[320px]">
          {/* Arrow pointing down */}
          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[#0a0a0a]/95 border-r border-b border-[#E8E0CC]/30"/>

          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-11 h-11 rounded-xl bg-[#928466]/15 flex items-center justify-center text-xl shrink-0 transition-colors duration-200">
              {hoveredOntologyItem && ontologyItems[hoveredOntologyItem]?.icon}
            </div>

            <div className="flex-1">
              {/* Title */}
              <div className="text-[#E8E0CC] font-bold text-base mb-1 transition-colors duration-200">
                {hoveredOntologyItem && ontologyItems[hoveredOntologyItem]?.title}
              </div>

              {/* Description */}
              <div className="text-white/50 text-xs leading-relaxed transition-colors duration-200">
                {hoveredOntologyItem && ontologyItems[hoveredOntologyItem]?.desc}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output Overview - Side panel - center position, node points down to output section */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 right-[-60px] z-50 pointer-events-none ${
          hoveredSection === 'output' && !hoveredOutputItem
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ transition: 'none' }}
      >
        {hoveredSection === 'output' && !hoveredOutputItem && (
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl [contain:paint] border border-[#928466]/40 rounded-2xl p-6 shadow-2xl shadow-black/50 w-[220px]">
            {/* Connector node - at bottom of panel pointing to output section */}
            <div className="absolute bottom-4 -left-8 flex items-center">
              <div className="w-6 h-px bg-gradient-to-r from-[#928466] to-[#928466]/50"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#928466] shadow-[0_0_8px_rgba(146,132,102,0.6)] -ml-px"/>
            </div>

            <div className="text-[#E8E0CC] font-bold text-xl mb-3">Execution Output</div>
            <div className="w-10 h-0.5 bg-[#928466]/50 mb-4"/>
            <div className="text-white/50 text-sm leading-relaxed mb-4">
              Real-world actions: emails, documents, API calls, automations
            </div>
            <div className="text-[#928466]/60 text-[10px] uppercase tracking-wider mb-2">Outputs</div>
            <div className="space-y-2">
              {['Browser Automation', 'Document Gen', 'Email Campaigns', 'Slack / Comms', 'CRM Updates', 'Webhooks / API', 'Dashboards', 'Deployments'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#928466]"/>
                  <span className="text-[#928466] text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Individual Output Item - Side panel */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 right-[-60px] z-50 pointer-events-none ${
          hoveredOutputItem
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ transition: 'none' }}
      >
        {hoveredOutputItem && outputItems[hoveredOutputItem] && (
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl [contain:paint] border border-[#928466]/30 rounded-2xl p-6 shadow-2xl shadow-black/50 w-[220px]">
            {/* Connector node - at bottom of panel, same as output overview */}
            <div className="absolute bottom-4 -left-8 flex items-center">
              <div className="w-6 h-px bg-gradient-to-r from-[#928466] to-[#928466]/50"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#928466] shadow-[0_0_8px_rgba(146,132,102,0.6)] -ml-px"/>
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-[#928466]/15 flex items-center justify-center mb-4 text-2xl">
              {outputItems[hoveredOutputItem].icon}
            </div>

            {/* Title */}
            <div className="text-[#E8E0CC] font-bold text-xl mb-2">
              {outputItems[hoveredOutputItem].title}
            </div>

            {/* Description */}
            <div className="text-white/50 text-sm leading-relaxed">
              {outputItems[hoveredOutputItem].desc}
            </div>
          </div>
        )}
      </div>

      {/* Agent Orchestration Overview - when hovering the section */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 right-[-60px] z-50 pointer-events-none ${
          (hoveredSection === 'agents' || hoveredSection === 'skills' || hoveredSection === 'tools') && !hoveredLogo
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ transition: 'none' }}
      >
        {(hoveredSection === 'agents' || hoveredSection === 'skills' || hoveredSection === 'tools') && !hoveredLogo && (
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl [contain:paint] border border-[#928466]/30 rounded-2xl p-6 shadow-2xl shadow-black/50 w-[220px]">
            {/* Connector line with node */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-8 flex items-center">
              <div className="w-6 h-px bg-gradient-to-r from-[#928466] to-[#928466]/50"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#928466] shadow-[0_0_8px_rgba(146,132,102,0.6)] -ml-px"/>
            </div>

            {/* Title */}
            <div className="text-[#E8E0CC] font-bold text-xl mb-3 leading-tight">
              {tooltips[hoveredSection]?.title}
            </div>

            {/* Divider */}
            <div className="w-10 h-0.5 bg-[#928466]/50 mb-4"/>

            {/* Description */}
            <div className="text-white/50 text-sm leading-relaxed mb-5">
              {tooltips[hoveredSection]?.desc}
            </div>

            {/* AI Models with golden nodes */}
            <div className="text-[#928466]/60 text-[10px] uppercase tracking-wider mb-2">Models</div>
            <div className="space-y-2">
              {['Claude', 'OpenAI', 'Gemini', 'DeepSeek', 'Z.ai'].map((model, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-[#928466]/60 to-transparent rounded-full"/>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#928466] shadow-[0_0_4px_rgba(146,132,102,0.5)]"/>
                  <span className="text-white/70 text-xs">{model}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Individual Model Panel - when hovering a specific model */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 right-[-60px] z-50 pointer-events-none ${
          hoveredLogo && hoveredLogo !== 'more'
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ transition: 'none' }}
      >
        {hoveredLogo && hoveredLogo !== 'more' && (
          <div className={`bg-[#0a0a0a]/95 backdrop-blur-xl [contain:paint] border rounded-2xl p-6 shadow-2xl shadow-black/50 w-[220px] ${
            hoveredLogo === 'claude' ? 'border-[#D97757]/40' :
            hoveredLogo === 'openai' ? 'border-[#10a37f]/40' :
            hoveredLogo === 'gemini' ? 'border-[#4285F4]/40' :
            hoveredLogo === 'deepseek' ? 'border-[#4D6BFE]/40' :
            'border-[#888888]/40'
          }`}>
            {/* Connector line with colored node */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-8 flex items-center">
              <div className={`w-6 h-px ${
                hoveredLogo === 'claude' ? 'bg-gradient-to-r from-[#D97757] to-[#D97757]/50' :
                hoveredLogo === 'openai' ? 'bg-gradient-to-r from-[#10a37f] to-[#10a37f]/50' :
                hoveredLogo === 'gemini' ? 'bg-gradient-to-r from-[#4285F4] to-[#4285F4]/50' :
                hoveredLogo === 'deepseek' ? 'bg-gradient-to-r from-[#4D6BFE] to-[#4D6BFE]/50' :
                'bg-gradient-to-r from-[#888888] to-[#888888]/50'
              }`}/>
              <div className={`w-2.5 h-2.5 rounded-full -ml-px ${
                hoveredLogo === 'claude' ? 'bg-[#D97757] shadow-[0_0_8px_rgba(217,119,87,0.6)]' :
                hoveredLogo === 'openai' ? 'bg-[#10a37f] shadow-[0_0_8px_rgba(16,163,127,0.6)]' :
                hoveredLogo === 'gemini' ? 'bg-[#4285F4] shadow-[0_0_8px_rgba(66,133,244,0.6)]' :
                hoveredLogo === 'deepseek' ? 'bg-[#4D6BFE] shadow-[0_0_8px_rgba(77,107,254,0.6)]' :
                'bg-[#888888] shadow-[0_0_8px_rgba(136,136,136,0.6)]'
              }`}/>
            </div>

            {/* Model Icon */}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
              hoveredLogo === 'claude' ? 'bg-[#D97757]/15' :
              hoveredLogo === 'openai' ? 'bg-[#10a37f]/15' :
              hoveredLogo === 'gemini' ? 'bg-white/90' :
              hoveredLogo === 'deepseek' ? 'bg-[#4D6BFE]/15' :
              'bg-[#888888]/15'
            }`}>
              {hoveredLogo === 'claude' && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#D97757">
                  <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"/>
                </svg>
              )}
              {hoveredLogo === 'openai' && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#10a37f">
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                </svg>
              )}
              {hoveredLogo === 'gemini' && (
                <svg width="32" height="32" viewBox="0 0 24 24">
                  <defs><linearGradient id="panel-gemini" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4285F4"/><stop offset="25%" stopColor="#9B72CB"/><stop offset="50%" stopColor="#D96570"/><stop offset="75%" stopColor="#F4B400"/><stop offset="100%" stopColor="#0F9D58"/></linearGradient></defs>
                  <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#panel-gemini)"/>
                </svg>
              )}
              {hoveredLogo === 'deepseek' && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#4D6BFE">
                  <path d="M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588z"/>
                </svg>
              )}
              {hoveredLogo === 'zai' && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M12.105 2L9.927 4.953H.653L2.83 2h9.276zM23.254 19.048L21.078 22h-9.242l2.174-2.952h9.244zM24 2L9.264 22H0L14.736 2H24z"/>
                </svg>
              )}
            </div>

            {/* Model Name */}
            <div className={`font-bold text-xl mb-2 ${
              hoveredLogo === 'claude' ? 'text-[#D97757]' :
              hoveredLogo === 'openai' ? 'text-[#10a37f]' :
              hoveredLogo === 'gemini' ? 'text-[#4285F4]' :
              hoveredLogo === 'deepseek' ? 'text-[#4D6BFE]' :
              'text-white'
            }`}>
              {hoveredLogo === 'claude' ? 'Claude' :
               hoveredLogo === 'openai' ? 'OpenAI' :
               hoveredLogo === 'gemini' ? 'Gemini' :
               hoveredLogo === 'deepseek' ? 'DeepSeek' :
               'Z.ai'}
            </div>

            {/* Model Description */}
            <div className="text-white/50 text-sm leading-relaxed mb-4">
              {hoveredLogo === 'claude' ? 'Advanced reasoning and analysis with nuanced understanding' :
               hoveredLogo === 'openai' ? 'Industry-leading GPT models for versatile AI tasks' :
               hoveredLogo === 'gemini' ? 'Google\'s multimodal AI with deep integration' :
               hoveredLogo === 'deepseek' ? 'Cost-effective reasoning with strong performance' :
               'Next-gen AI synthesis and orchestration'}
            </div>

            {/* Model Stats */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/40">Latency</span>
                <span className="text-white/70">{hoveredLogo === 'claude' ? '~2.1s' : hoveredLogo === 'openai' ? '~1.8s' : hoveredLogo === 'gemini' ? '~1.5s' : hoveredLogo === 'deepseek' ? '~2.4s' : '~1.2s'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Context</span>
                <span className="text-white/70">{hoveredLogo === 'claude' ? '200K' : hoveredLogo === 'openai' ? '128K' : hoveredLogo === 'gemini' ? '1M' : hoveredLogo === 'deepseek' ? '64K' : '256K'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Model Panel - when hovering the "more" (+) icon */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 right-[-60px] z-50 pointer-events-none ${
          hoveredLogo === 'more'
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ transition: 'none' }}
      >
        {hoveredLogo === 'more' && (
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl [contain:paint] border border-[#928466]/40 rounded-2xl p-6 shadow-2xl shadow-black/50 w-[220px]">
            {/* Connector line with node */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-8 flex items-center">
              <div className="w-6 h-px bg-gradient-to-r from-[#928466] to-[#928466]/50"/>
              <div className="w-2.5 h-2.5 rounded-full bg-[#928466] shadow-[0_0_8px_rgba(146,132,102,0.6)] -ml-px"/>
            </div>

            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-[#928466]/15 flex items-center justify-center mb-4">
              <span className="text-3xl text-[#928466]">+</span>
            </div>

            {/* Title */}
            <div className="text-[#E8E0CC] font-bold text-xl mb-2">
              Custom Models
            </div>

            {/* Description */}
            <div className="text-white/50 text-sm leading-relaxed mb-4">
              We can integrate any AI model into your orchestration pipeline on request.
            </div>

            {/* Examples */}
            <div className="text-[#928466]/60 text-[10px] uppercase tracking-wider mb-2">Available on Request</div>
            <div className="space-y-2">
              {['Llama 3', 'Mistral', 'Cohere', 'Custom Fine-tuned'].map((model, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#928466]/50"/>
                  <span className="text-white/50 text-xs">{model}</span>
                </div>
              ))}
            </div>

            {/* CTA hint */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <span className="text-[#928466] text-xs">Contact us to add your model</span>
            </div>
          </div>
        )}
      </div>

      <svg
        ref={svgRef}
        className="w-full"
        viewBox="0 0 950 640"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
<linearGradient id="glass-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.10)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)"/>
          </linearGradient>
          <linearGradient id="glass-border" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)"/>
          </linearGradient>
          <linearGradient id="gold-glass-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(146,132,102,0.15)"/>
            <stop offset="100%" stopColor="rgba(146,132,102,0.05)"/>
          </linearGradient>
          <linearGradient id="gold-glass-border" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(232,224,204,0.4)"/>
            <stop offset="100%" stopColor="rgba(146,132,102,0.2)"/>
          </linearGradient>
          <linearGradient id="agent-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(18,18,18,0.95)"/>
            <stop offset="100%" stopColor="rgba(8,8,8,0.98)"/>
          </linearGradient>
          <linearGradient id="output-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(146,132,102,0.18)"/>
            <stop offset="100%" stopColor="rgba(146,132,102,0.08)"/>
          </linearGradient>
          <linearGradient id="gemini-star" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4"/>
            <stop offset="25%" stopColor="#9B72CB"/>
            <stop offset="50%" stopColor="#D96570"/>
            <stop offset="75%" stopColor="#F4B400"/>
            <stop offset="100%" stopColor="#0F9D58"/>
          </linearGradient>
          <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8E0CC"/>
            <stop offset="40%" stopColor="#928466"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>

          <radialGradient id="node-inner-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(146,132,102,0.3)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>

          {/* Dot grid pattern for ontology box */}
          <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="rgba(146,132,102,0.15)"/>
          </pattern>
        </defs>

        {/* ========== THE ONTOLOGY BOX ========== */}
        <motion.g
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ ...sectionVariants, visible: { ...sectionVariants.visible, transition: { ...sectionVariants.visible.transition, delay: 0.05 } } }}
        >
          {/* Main box background */}
          <rect
            x="145" y="10" width="660" height="270" rx="20"
            fill="url(#gold-glass-bg)" stroke="url(#gold-glass-border)" strokeWidth="1"          />
          {/* Dot grid overlay */}
          <rect x="145" y="10" width="660" height="270" rx="20" fill="url(#dot-grid)"/>

          {/* Title badge - ONLY this triggers the overview */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => { setHoveredSection('ontology'); setHoveredOntologyItem(null); }}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <rect x="375" y="0" width="200" height="26" rx="13" fill="rgba(10,10,10,0.9)" stroke="rgba(232,224,204,0.5)" strokeWidth="1"/>
            <text x="475" y="18" textAnchor="middle" fill="#E8E0CC" fontSize="11" fontWeight="600" letterSpacing="0.1em" fontFamily="Inter, system-ui, sans-serif">THE ONTOLOGY</text>
          </g>
          <text x="475" y="36" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" letterSpacing="0.05em" fontFamily="Inter, system-ui, sans-serif">Data Sources  •  Entities  •  Relations  •  Rules</text>
          <text x="475" y="56" textAnchor="middle" fill="rgba(146,132,102,0.5)" fontSize="7" letterSpacing="0.2em" fontFamily="Inter, system-ui, sans-serif">DATA SOURCES</text>

          {/* Data Sources Row 1 */}
          <g >
            {dataSourcesRow1.map((node) => (
              <g
                key={node.id}
                className="cursor-pointer"
                style={{ opacity: getNodeOpacity(node.id) }}
                onMouseEnter={() => { setHoveredOntologyItem(node.id); setHoveredSection(null); }}
                onMouseLeave={() => setHoveredOntologyItem(null)}
              >
                <rect x={node.x} y="65" width={nodeWidth} height="36" rx="10" fill="url(#glass-bg)" stroke={hoveredOntologyItem === node.id ? '#E8E0CC' : 'url(#glass-border)'} strokeWidth={hoveredOntologyItem === node.id ? 2 : 1}/>
                <text x={node.cx} y="88" textAnchor="middle" fill={hoveredOntologyItem === node.id ? '#E8E0CC' : 'rgba(255,255,255,0.8)'} fontSize="10">{node.label}</text>
              </g>
            ))}
          </g>

          {/* Data Sources Row 2 */}
          <g >
            {dataSourcesRow2.map((node) => (
              <g
                key={node.id}
                className="cursor-pointer"
                style={{ opacity: getNodeOpacity(node.id) }}
                onMouseEnter={() => { setHoveredOntologyItem(node.id); setHoveredSection(null); }}
                onMouseLeave={() => setHoveredOntologyItem(null)}
              >
                <rect x={node.x} y="110" width={nodeWidth} height="36" rx="10" fill="url(#glass-bg)" stroke={hoveredOntologyItem === node.id ? '#E8E0CC' : 'url(#glass-border)'} strokeWidth={hoveredOntologyItem === node.id ? 2 : 1}/>
                <text x={node.cx} y="133" textAnchor="middle" fill={hoveredOntologyItem === node.id ? '#E8E0CC' : 'rgba(255,255,255,0.8)'} fontSize="10">{node.label}</text>
              </g>
            ))}
          </g>
        </motion.g>

        {/* ========== INTERNAL LINES ========== */}
        <motion.g
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ ...sectionVariants, visible: { ...sectionVariants.visible, transition: { ...sectionVariants.visible.transition, delay: 0.1 } } }}
        >
          {/* Connection lines from data sources rows to merge point at y=155 */}
          <g stroke="rgba(146,132,102,0.4)" strokeWidth="1.5"  style={{ pointerEvents: 'none' }}>
            {/* Row 1 bottom to merge line */}
            <line x1={c1} y1="101" x2={c1} y2="155"/>
            <line x1={c2} y1="101" x2={c2} y2="155"/>
            <line x1={c3} y1="101" x2={c3} y2="155"/>
            <line x1={c4} y1="101" x2={c4} y2="155"/>
            {/* Row 2 bottom to merge line */}
            <line x1={c1} y1="146" x2={c1} y2="155"/>
            <line x1={c2} y1="146" x2={c2} y2="155"/>
            <line x1={c3} y1="146" x2={c3} y2="155"/>
            <line x1={c4} y1="146" x2={c4} y2="155"/>
            {/* Horizontal merge line */}
            <line x1={c1} y1="155" x2={c4} y2="155"/>
            {/* Down to mapping rows */}
            <line x1={c1} y1="155" x2={c1} y2="195"/>
            <line x1={c2} y1="155" x2={c2} y2="195"/>
            <line x1={c3} y1="155" x2={c3} y2="195"/>
            <line x1={c4} y1="155" x2={c4} y2="195"/>
            {/* Junction dots */}
            <circle cx={c1} cy="155" r="2.5" fill="#928466"/>
            <circle cx={c2} cy="155" r="2.5" fill="#928466"/>
            <circle cx={c3} cy="155" r="2.5" fill="#928466"/>
            <circle cx={c4} cy="155" r="2.5" fill="#928466"/>
          </g>

          <text x="475" y="188" textAnchor="middle" fill="rgba(146,132,102,0.5)" fontSize="7" letterSpacing="0.2em" fontFamily="Inter, system-ui, sans-serif" style={{ pointerEvents: 'none' }}>ONTOLOGY MAPPING</text>

          {/* Mapping Row 1 */}
          <g >
            {mappingsRow1.map((node) => (
              <g
                key={node.id}
                className="cursor-pointer"
                style={{ opacity: getNodeOpacity(node.id) }}
                onMouseEnter={() => { setHoveredOntologyItem(node.id); setHoveredSection(null); }}
                onMouseLeave={() => setHoveredOntologyItem(null)}
              >
                <rect x={node.x} y="195" width={nodeWidth} height="36" rx="10" fill="url(#gold-glass-bg)" stroke={hoveredOntologyItem === node.id ? '#E8E0CC' : 'url(#gold-glass-border)'} strokeWidth={hoveredOntologyItem === node.id ? 2 : 1}/>
                <text x={node.cx} y="218" textAnchor="middle" fill="#E8E0CC" fontSize="10" fontWeight="500">{node.label}</text>
              </g>
            ))}
          </g>

          {/* Mapping Row 2 */}
          <g >
            {mappingsRow2.map((node) => (
              <g
                key={node.id}
                className="cursor-pointer"
                style={{ opacity: getNodeOpacity(node.id) }}
                onMouseEnter={() => { setHoveredOntologyItem(node.id); setHoveredSection(null); }}
                onMouseLeave={() => setHoveredOntologyItem(null)}
              >
                <rect x={node.x} y="240" width={nodeWidth} height="36" rx="10" fill="url(#gold-glass-bg)" stroke={hoveredOntologyItem === node.id ? '#E8E0CC' : 'url(#gold-glass-border)'} strokeWidth={hoveredOntologyItem === node.id ? 2 : 1}/>
                <text x={node.cx} y="263" textAnchor="middle" fill="#E8E0CC" fontSize="10" fontWeight="500">{node.label}</text>
              </g>
            ))}
          </g>
        </motion.g>

        {/* ========== CONNECTION TO AGENTS ========== */}
        <g>
          <line x1="475" y1="280" x2="475" y2="305" stroke="rgba(146,132,102,0.5)" strokeWidth="2" />
          <circle cx="475" cy="292" r="4" fill="#E8E0CC" opacity="0.7"/>
          <polygon points="475,304 471,297 479,297" fill="#928466"/>
        </g>

        {/* ========== AGENT ORCHESTRATION ========== */}
        <motion.g
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ ...sectionVariants, visible: { ...sectionVariants.visible, transition: { ...sectionVariants.visible.transition, delay: 0.15 } } }}
        >
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredSection('agents')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <rect x="175" y="305" width="600" height="145" rx="20" fill="url(#agent-bg)" stroke="rgba(146,132,102,0.4)" strokeWidth="1" />
            <rect x="355" y="295" width="240" height="24" rx="12" fill="rgba(10,10,10,0.95)" stroke="rgba(146,132,102,0.5)" strokeWidth="1"/>
            <text x="475" y="311" textAnchor="middle" fill="#E8E0CC" fontSize="11" fontWeight="600" letterSpacing="0.1em" fontFamily="Inter, system-ui, sans-serif">AGENT ORCHESTRATION</text>

            {/* Skills & Tools row */}
            <g transform="translate(200, 322)">
              {/* Skills */}
              <g
                className="cursor-pointer"
                onMouseEnter={(e) => { e.stopPropagation(); setHoveredSection('skills'); }}
                onMouseLeave={() => setHoveredSection('agents')}
              >
                <rect width="120" height="32" rx="8" fill="rgba(146,132,102,0.06)" stroke="rgba(146,132,102,0.20)" strokeWidth="1"/>
                <text x="60" y="12" textAnchor="middle" fill="rgba(232,224,204,0.9)" fontSize="7" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">SKILLS</text>
                <text x="60" y="25" textAnchor="middle" fill="rgba(232,224,204,0.45)" fontSize="7" fontFamily="Inter, system-ui, sans-serif">Prompts • Chains • Memory</text>
              </g>

              {/* Tools */}
              <g
                transform="translate(430, 0)"
                className="cursor-pointer"
                onMouseEnter={(e) => { e.stopPropagation(); setHoveredSection('tools'); }}
                onMouseLeave={() => setHoveredSection('agents')}
              >
                <rect width="120" height="32" rx="8" fill="rgba(146,132,102,0.06)" stroke="rgba(232,224,204,0.20)" strokeWidth="1"/>
                <text x="60" y="12" textAnchor="middle" fill="rgba(232,224,204,0.9)" fontSize="7" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">TOOLS</text>
                <text x="60" y="25" textAnchor="middle" fill="rgba(232,224,204,0.45)" fontSize="7" fontFamily="Inter, system-ui, sans-serif">Search • Code • Browser</text>
              </g>
            </g>

            {/* AI LOGOS - Perfectly centered with dock-style hover */}
            {logos.map((logo, i) => {
              const x = logoStartX + i * (logoSize + logoGap);
              const isHovered = hoveredLogo === logo.id;
              const centerOffset = logoSize / 2;

              const hoveredIndex = logos.findIndex(l => l.id === hoveredLogo);
              const isNeighbor = hoveredLogo && Math.abs(hoveredIndex - i) === 1;
              const isSecondNeighbor = hoveredLogo && Math.abs(hoveredIndex - i) === 2;

              let scale = 1;
              let yOffset = 370;

              if (isHovered) {
                scale = 1.15;
                yOffset = 360;
              } else if (isNeighbor) {
                scale = 1.06;
                yOffset = 366;
              } else if (isSecondNeighbor) {
                scale = 1.02;
                yOffset = 369;
              }

              return (
                <g
                  key={logo.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLogo(logo.id)}
                  onMouseLeave={() => setHoveredLogo(null)}
                >
                  {/* Reflection/glow underneath when hovered */}
                  <ellipse
                    cx={x + centerOffset}
                    cy={430}
                    rx={isHovered ? 30 : isNeighbor ? 20 : 0}
                    ry={isHovered ? 6 : isNeighbor ? 4 : 0}
                    fill={logo.color}
                    style={{
                      opacity: isHovered ? 0.4 : isNeighbor ? 0.2 : 0,
                      filter: 'blur(4px)',
                      transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                  />

                  {/* Main logo container with smooth dock-style transition */}
                  <g
                    style={{
                      transform: `translate(${x}px, ${yOffset}px)`,
                      transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                  >
                    <g
                      style={{
                        transform: `scale(${scale})`,
                        transformOrigin: `${centerOffset}px ${centerOffset}px`,
                        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }}
                    >
                    {/* Glass background */}
                    <rect
                      width={logoSize}
                      height={logoSize}
                      rx="14"
                      fill={logo.id === 'gemini' ? 'rgba(255,255,255,0.95)' : `${logo.color}15`}
                      stroke={`${logo.color}60`}
                      strokeWidth={isHovered ? "2" : "1"}
                      style={{ transition: 'stroke-width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                    />

                    {/* Inner highlight */}
                    <rect
                      x="2"
                      y="2"
                      width={logoSize - 4}
                      height={logoSize - 4}
                      rx="12"
                      fill="rgba(255,255,255,0.05)"
                    />

                    {/* Icons */}
                    {logo.id === 'claude' && (
                      <g transform="translate(7, 7) scale(1.65)">
                        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757"/>
                      </g>
                    )}
                    {logo.id === 'openai' && (
                      <g transform="translate(7, 7) scale(1.65)">
                        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="#10a37f"/>
                      </g>
                    )}
                    {logo.id === 'gemini' && (
                      <g transform="translate(7, 7) scale(1.65)">
                        <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#gemini-star)"/>
                      </g>
                    )}
                    {logo.id === 'deepseek' && (
                      <g transform="translate(7, 7) scale(1.65)">
                        <path d="M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z" fill="#4D6BFE"/>
                      </g>
                    )}
                    {logo.id === 'zai' && (
                      <g transform="translate(7, 7) scale(1.65)">
                        <path d="M12.105 2L9.927 4.953H.653L2.83 2h9.276zM23.254 19.048L21.078 22h-9.242l2.174-2.952h9.244zM24 2L9.264 22H0L14.736 2H24z" fill="white"/>
                      </g>
                    )}
                    {logo.id === 'more' && (
                      <text x={logoSize/2} y={logoSize/2 + 8} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="26" fontWeight="300">+</text>
                    )}
                    </g>
                  </g>

                  {/* Label */}
                  <text
                    x={x + centerOffset}
                    y={438}
                    textAnchor="middle"
                    fill={isHovered ? "rgba(255,255,255,0.95)" : isNeighbor ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)"}
                    fontSize="8"
                    fontWeight={isHovered ? "500" : "400"}
                    style={{ transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                  >
                    {logo.name}
                  </text>
                </g>
              );
            })}

          </g>
        </motion.g>

        {/* ========== OUTPUT CONNECTIONS ========== */}
        <motion.g
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ ...sectionVariants, visible: { ...sectionVariants.visible, transition: { ...sectionVariants.visible.transition, delay: 0.2 } } }}
        >
          <g stroke="rgba(146,132,102,0.4)" fill="none" strokeWidth="1.5">
            <line x1={c1} y1={455} x2={c1} y2={540} />
            <line x1={c2} y1={455} x2={c2} y2={540} />
            <line x1={c3} y1={455} x2={c3} y2={540} />
            <line x1={c4} y1={455} x2={c4} y2={540} />
          </g>

        </motion.g>

        {/* ========== EXECUTION OUTPUT ========== */}
        <text x="475" y="525" textAnchor="middle" fill="rgba(146,132,102,0.5)" fontSize="7" letterSpacing="0.2em" fontFamily="Inter, system-ui, sans-serif">EXECUTION OUTPUT</text>

        <motion.g
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ ...sectionVariants, visible: { ...sectionVariants.visible, transition: { ...sectionVariants.visible.transition, delay: 0.25 } } }}
        >
          <g >
            {/* Output Row 1 */}
            {outputsRow1.map((node) => (
              <g
                key={node.id}
                className="cursor-pointer"
                style={{ opacity: getNodeOpacity(node.id) }}
                onMouseEnter={() => { setHoveredOutputItem(node.id); setHoveredSection('output'); }}
                onMouseLeave={() => { setHoveredOutputItem(null); setHoveredSection(null); }}
              >
                <rect x={node.x + 5} y="545" width={nodeWidth - 10} height="32" rx="8" fill="url(#node-inner-glow)" opacity="0.5"/>
                <rect
                  x={node.x}
                  y="540"
                  width={nodeWidth}
                  height="40"
                  rx="12"
                  fill="url(#output-bg)"
                  stroke={hoveredOutputItem === node.id ? '#928466' : 'rgba(146,132,102,0.3)'}
                  strokeWidth={hoveredOutputItem === node.id ? 2 : 1}
                />
                <text x={node.cx} y="565" textAnchor="middle" fill={hoveredOutputItem === node.id ? '#E8E0CC' : 'rgba(232,224,204,0.85)'} fontSize="9">{node.label}</text>
              </g>
            ))}

            {/* Output Row 2 */}
            {outputsRow2.map((node) => (
              <g
                key={node.id}
                className="cursor-pointer"
                style={{ opacity: getNodeOpacity(node.id) }}
                onMouseEnter={() => { setHoveredOutputItem(node.id); setHoveredSection('output'); }}
                onMouseLeave={() => { setHoveredOutputItem(null); setHoveredSection(null); }}
              >
                <rect x={node.x + 5} y="590" width={nodeWidth - 10} height="32" rx="8" fill="url(#node-inner-glow)" opacity="0.5"/>
                <rect
                  x={node.x}
                  y="585"
                  width={nodeWidth}
                  height="40"
                  rx="12"
                  fill="url(#output-bg)"
                  stroke={hoveredOutputItem === node.id ? '#928466' : 'rgba(146,132,102,0.3)'}
                  strokeWidth={hoveredOutputItem === node.id ? 2 : 1}
                />
                <text x={node.cx} y="610" textAnchor="middle" fill={hoveredOutputItem === node.id ? '#E8E0CC' : 'rgba(232,224,204,0.85)'} fontSize="9">{node.label}</text>
              </g>
            ))}
          </g>
        </motion.g>

      </svg>
    </div>
  );
};

export default AgenticOntologyDiagram;
