const STORAGE_KEYS = {
  CUSTOM_WORKFLOWS: 'flowforge_custom_workflows',
  THEME: 'flowforge_theme',
  ANALYTICS: 'flowforge_analytics',
  SETTINGS: 'flowforge_settings'
};

export const storage = {
  // Theme
  getTheme: () => {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    return theme || 'dark';
  },
  
  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // Custom Workflows
  getCustomWorkflows: () => {
    const workflows = localStorage.getItem(STORAGE_KEYS.CUSTOM_WORKFLOWS);
    return workflows ? JSON.parse(workflows) : [];
  },

  saveCustomWorkflow: (workflow) => {
    const workflows = storage.getCustomWorkflows();
    const existingIndex = workflows.findIndex(w => w.id === workflow.id);
    
    if (existingIndex >= 0) {
      workflows[existingIndex] = workflow;
    } else {
      workflows.push(workflow);
    }
    
    localStorage.setItem(STORAGE_KEYS.CUSTOM_WORKFLOWS, JSON.stringify(workflows));
    return workflows;
  },

  deleteCustomWorkflow: (workflowId) => {
    const workflows = storage.getCustomWorkflows();
    const filtered = workflows.filter(w => w.id !== workflowId);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_WORKFLOWS, JSON.stringify(filtered));
    return filtered;
  },

  // Export/Import Workflows
  exportWorkflows: () => {
    const customWorkflows = storage.getCustomWorkflows();
    const analytics = storage.getAnalytics();
    const theme = storage.getTheme();
    
    const exportData = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      customWorkflows,
      analytics,
      theme
    };
    
    return JSON.stringify(exportData, null, 2);
  },

  importWorkflows: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      
      if (!data.version || !data.customWorkflows) {
        throw new Error('Invalid workflow file format');
      }
      
      // Import custom workflows
      if (data.customWorkflows && Array.isArray(data.customWorkflows)) {
        const existingWorkflows = storage.getCustomWorkflows();
        const mergedWorkflows = [...existingWorkflows];
        
        data.customWorkflows.forEach(workflow => {
          const existingIndex = mergedWorkflows.findIndex(w => w.id === workflow.id);
          if (existingIndex >= 0) {
            mergedWorkflows[existingIndex] = workflow;
          } else {
            mergedWorkflows.push(workflow);
          }
        });
        
        localStorage.setItem(STORAGE_KEYS.CUSTOM_WORKFLOWS, JSON.stringify(mergedWorkflows));
      }
      
      // Optionally import analytics
      if (data.analytics) {
        localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(data.analytics));
      }
      
      // Optionally import theme
      if (data.theme) {
        localStorage.setItem(STORAGE_KEYS.THEME, data.theme);
      }
      
      return { success: true, message: 'Workflows imported successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Analytics
  getAnalytics: () => {
    const analytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    return analytics ? JSON.parse(analytics) : {
      totalRuns: 0,
      successfulRuns: 0,
      failedRuns: 0,
      totalStepsCompleted: 0,
      averageDuration: 0,
      workflowStats: {},
      executionHistory: []
    };
  },

  updateAnalytics: (data) => {
    const analytics = storage.getAnalytics();
    
    analytics.totalRuns += 1;
    if (data.success) {
      analytics.successfulRuns += 1;
    } else {
      analytics.failedRuns += 1;
    }
    analytics.totalStepsCompleted += data.stepsCompleted || 0;
    
    // Update workflow-specific stats
    const workflowId = data.workflowId;
    if (!analytics.workflowStats[workflowId]) {
      analytics.workflowStats[workflowId] = {
        runs: 0,
        successful: 0,
        failed: 0,
        totalSteps: 0,
        totalDuration: 0
      };
    }
    
    analytics.workflowStats[workflowId].runs += 1;
    if (data.success) {
      analytics.workflowStats[workflowId].successful += 1;
    } else {
      analytics.workflowStats[workflowId].failed += 1;
    }
    analytics.workflowStats[workflowId].totalSteps += data.stepsCompleted || 0;
    analytics.workflowStats[workflowId].totalDuration += data.duration || 0;
    
    // Add to execution history (keep last 50)
    if (!analytics.executionHistory) {
      analytics.executionHistory = [];
    }
    analytics.executionHistory.push({
      workflowId,
      success: data.success,
      stepsCompleted: data.stepsCompleted || 0,
      duration: data.duration || 0,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 executions
    if (analytics.executionHistory.length > 50) {
      analytics.executionHistory = analytics.executionHistory.slice(-50);
    }
    
    // Calculate average duration
    analytics.averageDuration = Math.round(
      (analytics.averageDuration * (analytics.totalRuns - 1) + data.duration) / analytics.totalRuns
    );
    
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
    return analytics;
  },

  clearAnalytics: () => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify({
      totalRuns: 0,
      successfulRuns: 0,
      failedRuns: 0,
      totalStepsCompleted: 0,
      averageDuration: 0,
      workflowStats: {},
      executionHistory: []
    }));
  },

  // Export Analytics as CSV
  exportAnalyticsCSV: () => {
    const analytics = storage.getAnalytics();
    let csv = 'Metric,Value\n';
    csv += `Total Runs,${analytics.totalRuns}\n`;
    csv += `Successful Runs,${analytics.successfulRuns}\n`;
    csv += `Failed Runs,${analytics.failedRuns}\n`;
    csv += `Total Steps Completed,${analytics.totalStepsCompleted}\n`;
    csv += `Average Duration (ms),${analytics.averageDuration}\n`;
    csv += '\nWorkflow Stats\n';
    csv += 'Workflow ID,Runs,Successful,Failed,Total Steps,Avg Duration\n';
    
    Object.entries(analytics.workflowStats || {}).forEach(([id, stats]) => {
      const avgDuration = stats.runs > 0 ? Math.round(stats.totalDuration / stats.runs) : 0;
      csv += `${id},${stats.runs},${stats.successful},${stats.failed},${stats.totalSteps},${avgDuration}\n`;
    });
    
    return csv;
  },

  // Settings
  getSettings: () => {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : {
      defaultSpeed: 'normal',
      autoSave: true,
      showNotifications: true
    };
  },

  saveSettings: (settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
};

export default storage;
