import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function WorkflowSelector({ workflows, selectedWorkflow, onSelect, onDelete, isRunning }) {
  return (
    <div>
      <h3 style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        marginBottom: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Select Workflow
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <AnimatePresence>
          {workflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div
                onClick={() => onSelect(workflow)}
                style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  backgroundColor: selectedWorkflow?.id === workflow.id 
                    ? 'rgba(59, 130, 246, 0.15)' 
                    : 'var(--bg-tertiary)',
                  border: `2px solid ${
                    selectedWorkflow?.id === workflow.id 
                      ? 'var(--accent-primary)' 
                      : 'var(--border-color)'
                  }`,
                  cursor: isRunning ? 'not-allowed' : 'pointer',
                  opacity: isRunning ? 0.6 : 1,
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                whileHover={!isRunning ? { scale: 1.02, borderColor: 'var(--accent-primary)' } : {}}
                whileTap={!isRunning ? { scale: 0.98 } : {}}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <h4 style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    {workflow.name}
                  </h4>
                  
                  {!workflow.id.includes('-') && (
                    <span style={{
                      fontSize: '0.625rem',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(139, 92, 246, 0.2)',
                      color: 'var(--accent-secondary)',
                      fontWeight: 500
                    }}>
                      NEW
                    </span>
                  )}
                </div>
                
                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem'
                }}>
                  {workflow.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.75rem'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                  </svg>
                  <span>{workflow.steps.length} steps</span>
                  
                  {workflow.id.includes('custom-') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(workflow.id);
                      }}
                      style={{
                        marginLeft: 'auto',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        color: 'var(--accent-error)',
                        cursor: 'pointer',
                        fontSize: '0.6875rem',
                        fontWeight: 500
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {workflows.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--text-muted)'
        }}>
          <p>No workflows available</p>
        </div>
      )}
    </div>
  );
}

export default WorkflowSelector;
