import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepCard from './StepCard';

function WorkflowCanvas({ steps, currentStepIndex }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '1rem'
      }}>
        Workflow Execution
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <AnimatePresence>
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isActive={index === currentStepIndex}
              isCompleted={index < currentStepIndex}
              isLast={index === steps.length - 1}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Progress Bar */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '10px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)'
        }}>
          <span>Progress</span>
          <span>
            {currentStepIndex >= 0 
              ? `${Math.min(currentStepIndex + 1, steps.length)} / ${steps.length}`
              : `0 / ${steps.length}`
            }
          </span>
        </div>
        
        <div style={{
          height: '8px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              borderRadius: '4px'
            }}
            initial={{ width: 0 }}
            animate={{ 
              width: steps.length > 0 
                ? `${((currentStepIndex + 1) / steps.length) * 100}%`
                : '0%'
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkflowCanvas;
