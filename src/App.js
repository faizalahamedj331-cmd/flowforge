import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import WorkflowSelector from './components/WorkflowSelector';
import WorkflowCanvas from './components/WorkflowCanvas';
import ControlPanel from './components/ControlPanel';
import LogsPanel from './components/LogsPanel';
import Builder from './components/Builder';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import { defaultWorkflows, stepStatuses, simulationSpeeds } from './data/workflows';
import { storage } from './utils/storage';

function App() {
  // Theme state
  const [theme, setTheme] = useState('dark');
  
  // Navigation state
  const [activeView, setActiveView] = useState('simulator');
  
  // Workflow state
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  
  // Simulation state
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [speed, setSpeed] = useState('normal');
  const [simulationStartTime, setSimulationStartTime] = useState(null);
  const [enableStepFailure, setEnableStepFailure] = useState(false);
  
  // Logs state
  const [logs, setLogs] = useState([]);
  
  // Analytics state
  const [analytics, setAnalytics] = useState(null);
  
  // Load initial data
  useEffect(() => {
    // Load theme
    const savedTheme = storage.getTheme();
    setTheme(savedTheme);
    document.body.className = savedTheme === 'light' ? 'light-theme' : '';
    
    // Load workflows (default + custom)
    const customWorkflows = storage.getCustomWorkflows();
    setWorkflows([...defaultWorkflows, ...customWorkflows]);
    
    // Load analytics
    setAnalytics(storage.getAnalytics());
    
    // Load settings
    const settings = storage.getSettings();
    setSpeed(settings.defaultSpeed || 'NORMAL');
    setEnableStepFailure(settings.enableStepFailure || false);
  }, []);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      const settings = storage.getSettings();
      if (!settings.enableKeyboardShortcuts) return;
      
      if (e.code === 'Space') {
        e.preventDefault();
        if (!isRunning) {
          handleStart();
        } else {
          handlePause();
        }
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        handleReset();
      } else if (e.code === 'KeyS') {
        e.preventDefault();
        const speeds = ['SLOW', 'NORMAL', 'FAST'];
        const currentIndex = speeds.indexOf(speed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        setSpeed(speeds[nextIndex]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, speed]);
  
  // Add log entry
  const addLog = useCallback((message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { id: Date.now(), timestamp, message, type }]);
  }, []);
  
  // Select workflow
  const handleSelectWorkflow = (workflow) => {
    if (isRunning) return;
    
    setSelectedWorkflow(workflow);
    setWorkflowSteps(workflow.steps.map(step => ({
      ...step,
      status: stepStatuses.PENDING
    })));
    setCurrentStepIndex(-1);
    setLogs([]);
    addLog(`Selected workflow: ${workflow.name}`, 'info');
  };
  
  // Start simulation
  const handleStart = useCallback(() => {
    if (!selectedWorkflow || isRunning) return;
    
    setIsRunning(true);
    setIsPaused(false);
    setSimulationStartTime(Date.now());
    addLog('Simulation started', 'info');
  }, [selectedWorkflow, isRunning, addLog]);
  
  // Pause simulation
  const handlePause = useCallback(() => {
    if (!isRunning) return;
    setIsPaused(!isPaused);
    addLog(isPaused ? 'Simulation resumed' : 'Simulation paused', 'warning');
  }, [isRunning, isPaused, addLog]);
  
  // Reset simulation
  const handleReset = useCallback(() => {
    if (!selectedWorkflow) return;
    
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStepIndex(-1);
    setWorkflowSteps(selectedWorkflow.steps.map(step => ({
      ...step,
      status: stepStatuses.PENDING
    })));
    addLog('Simulation reset', 'info');
  }, [selectedWorkflow, addLog]);
  
  // Simulation effect
  useEffect(() => {
    if (!isRunning || isPaused || !selectedWorkflow) return;
    
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        const nextIndex = prev + 1;
        
        // Update step statuses
        setWorkflowSteps(steps => {
          const newSteps = [...steps];
          
          // Mark previous step as completed
          if (prev >= 0 && prev < newSteps.length) {
            newSteps[prev] = { ...newSteps[prev], status: stepStatuses.COMPLETED };
          }
          
          // Mark current step as running
          if (nextIndex < newSteps.length) {
            newSteps[nextIndex] = { ...newSteps[nextIndex], status: stepStatuses.RUNNING };
            addLog(`Starting: ${newSteps[nextIndex].title}`, 'info');
          }
          
          return newSteps;
        });
        
        // Check if simulation is complete
        if (nextIndex >= selectedWorkflow.steps.length) {
          const duration = Date.now() - simulationStartTime;
          setIsRunning(false);
          addLog('Simulation completed successfully!', 'success');
          
          // Update analytics
          const updatedAnalytics = storage.updateAnalytics({
            workflowId: selectedWorkflow.id,
            success: true,
            stepsCompleted: selectedWorkflow.steps.length,
            duration
          });
          setAnalytics(updatedAnalytics);
          
          return prev;
        }
        
        return nextIndex;
      });
    }, simulationSpeeds[speed]);
    
    return () => clearInterval(interval);
  }, [isRunning, isPaused, speed, selectedWorkflow, simulationStartTime, addLog]);
  
  // Save custom workflow
  const handleSaveWorkflow = (workflow) => {
    const customWorkflows = storage.saveCustomWorkflow(workflow);
    setWorkflows([...defaultWorkflows, ...customWorkflows]);
    addLog(`Workflow "${workflow.name}" saved`, 'success');
  };
  
  // Delete custom workflow
  const handleDeleteWorkflow = (workflowId) => {
    const customWorkflows = storage.deleteCustomWorkflow(workflowId);
    setWorkflows([...defaultWorkflows, ...customWorkflows]);
    
    if (selectedWorkflow?.id === workflowId) {
      setSelectedWorkflow(null);
      setWorkflowSteps([]);
    }
    
    addLog('Workflow deleted', 'warning');
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    storage.setTheme(newTheme);
    document.body.className = newTheme === 'light' ? 'light-theme' : '';
  };
  
  // Clear logs
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      
      <div className="flex">
        {/* Sidebar */}
        <aside style={{
          width: '280px',
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          padding: '1.5rem',
          overflowY: 'auto'
        }}>
          <WorkflowSelector 
            workflows={workflows}
            selectedWorkflow={selectedWorkflow}
            onSelect={handleSelectWorkflow}
            onDelete={handleDeleteWorkflow}
            isRunning={isRunning}
          />
        </aside>
        
        {/* Main Content */}
        <main style={{ flex: 1, padding: '1.5rem' }}>
          <AnimatePresence mode="wait">
            {activeView === 'simulator' && (
              <motion.div
                key="simulator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {selectedWorkflow ? (
                  <>
                    <WorkflowCanvas 
                      steps={workflowSteps}
                      currentStepIndex={currentStepIndex}
                    />
                    <ControlPanel 
                      isRunning={isRunning}
                      isPaused={isPaused}
                      speed={speed}
                      onStart={handleStart}
                      onPause={handlePause}
                      onReset={handleReset}
                      onSpeedChange={setSpeed}
                    />
                    <LogsPanel logs={logs} onClear={clearLogs} />
                  </>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '400px',
                    color: 'var(--text-muted)'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 1rem' }}>
                        <path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8" />
                      </svg>
                      <p style={{ fontSize: '1.125rem' }}>Select a workflow to begin simulation</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            
            {activeView === 'builder' && (
              <motion.div
                key="builder"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Builder 
                  onSave={handleSaveWorkflow}
                  isRunning={isRunning}
                />
              </motion.div>
            )}
            
            {activeView === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Analytics analytics={analytics} />
              </motion.div>
            )}
            
            {activeView === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Settings 
                  theme={theme} 
                  toggleTheme={toggleTheme}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
