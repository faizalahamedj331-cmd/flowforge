import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Builder({ onSave, isRunning }) {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [steps, setSteps] = useState([]);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepDescription, setNewStepDescription] = useState('');

  const addStep = () => {
    if (!newStepTitle.trim()) return;
    
    const newStep = {
      id: `step-${Date.now()}`,
      title: newStepTitle.trim(),
      description: newStepDescription.trim() || 'No description'
    };
    
    setSteps([...steps, newStep]);
    setNewStepTitle('');
    setNewStepDescription('');
  };

  const removeStep = (stepId) => {
    setSteps(steps.filter(s => s.id !== stepId));
  };

  const moveStep = (index, direction) => {
    const newSteps = [...steps];
    if (direction === 'up' && index > 0) {
      [newSteps[index], newSteps[index - 1]] = [newSteps[index - 1], newSteps[index]];
    } else if (direction === 'down' && index < newSteps.length - 1) {
      [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    }
    setSteps(newSteps);
  };

  const handleSave = () => {
    if (!workflowName.trim() || steps.length === 0) return;
    
    const workflow = {
      id: `custom-${Date.now()}`,
      name: workflowName.trim(),
      description: workflowDescription.trim() || 'Custom workflow',
      steps: steps
    };
    
    onSave(workflow);
    
    // Reset form
    setWorkflowName('');
    setWorkflowDescription('');
    setSteps([]);
  };

  const isValid = workflowName.trim().length > 0 && steps.length > 0;

  return (
    <div>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '1.5rem'
      }}>
        Custom Workflow Builder
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem'
      }}>
        {/* Left Column - Workflow Details */}
        <div>
          {/* Workflow Info */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Workflow Details
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
              }}>
                Workflow Name *
              </label>
              <input
                type="text"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                placeholder="Enter workflow name"
                className="input"
                disabled={isRunning}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
              }}>
                Description
              </label>
              <input
                type="text"
                value={workflowDescription}
                onChange={(e) => setWorkflowDescription(e.target.value)}
                placeholder="Enter description"
                className="input"
                disabled={isRunning}
              />
            </div>
          </div>
          
          {/* Add Step Form */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Add Step
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
              }}>
                Step Title *
              </label>
              <input
                type="text"
                value={newStepTitle}
                onChange={(e) => setNewStepTitle(e.target.value)}
                placeholder="Enter step title"
                className="input"
                disabled={isRunning}
                onKeyPress={(e) => e.key === 'Enter' && addStep()}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
              }}>
                Description
              </label>
              <input
                type="text"
                value={newStepDescription}
                onChange={(e) => setNewStepDescription(e.target.value)}
                placeholder="Enter step description"
                className="input"
                disabled={isRunning}
                onKeyPress={(e) => e.key === 'Enter' && addStep()}
              />
            </div>
            
            <motion.button
              onClick={addStep}
              disabled={!newStepTitle.trim() || isRunning}
              className="btn btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                opacity: !newStepTitle.trim() ? 0.5 : 1
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Step
            </motion.button>
          </div>
        </div>
        
        {/* Right Column - Steps Preview */}
        <div>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            minHeight: '400px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}>
                Steps ({steps.length})
              </h3>
            </div>
            
            {steps.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: 'var(--text-muted)'
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 1rem', opacity: 0.5 }}>
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="15" y2="16" />
                </svg>
                <p style={{ fontSize: '0.9375rem' }}>No steps added yet</p>
                <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>Add steps using the form on the left</p>
              </div>
            ) : (
              <AnimatePresence>
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.875rem',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '8px',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {/* Step Number */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'white',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    
                    {/* Step Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '0.125rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {step.title}
                      </h4>
                      <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Move Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button
                        onClick={() => moveStep(index, 'up')}
                        disabled={index === 0 || isRunning}
                        style={{
                          width: '24px',
                          height: '20px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-secondary)',
                          cursor: index === 0 ? 'not-allowed' : 'pointer',
                          opacity: index === 0 ? 0.3 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveStep(index, 'down')}
                        disabled={index === steps.length - 1 || isRunning}
                        style={{
                          width: '24px',
                          height: '20px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-secondary)',
                          cursor: index === steps.length - 1 ? 'not-allowed' : 'pointer',
                          opacity: index === steps.length - 1 ? 0.3 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => removeStep(step.id)}
                      disabled={isRunning}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--accent-error)',
                        cursor: isRunning ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            
            {/* Save Button */}
            {steps.length > 0 && (
              <motion.button
                onClick={handleSave}
                disabled={!isValid || isRunning}
                className="btn btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  opacity: !isValid || isRunning ? 0.5 : 1
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save Workflow
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Builder;
