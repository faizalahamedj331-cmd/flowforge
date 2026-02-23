import React from 'react';
import { motion } from 'framer-motion';

function StepCard({ step, index, isActive, isCompleted, isLast }) {
  const getStatusColor = () => {
    if (step.status === 'completed') return 'var(--accent-success)';
    if (step.status === 'running') return 'var(--accent-primary)';
    if (step.status === 'error') return 'var(--accent-error)';
    return 'var(--border-color)';
  };

  const getStatusBadge = () => {
    switch (step.status) {
      case 'completed':
        return <span className="badge badge-completed">Completed</span>;
      case 'running':
        return <span className="badge badge-running">Running</span>;
      case 'error':
        return <span className="badge badge-error">Error</span>;
      default:
        return <span className="badge badge-pending">Pending</span>;
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      <motion.div
        className={`step-card ${isActive ? 'active' : ''} ${step.status === 'completed' ? 'completed' : ''} ${step.status === 'error' ? 'error' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Glow effect for active step */}
        {isActive && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
              zIndex: 0
            }}
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Step Number */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: isCompleted 
                ? 'var(--accent-success)' 
                : isActive 
                  ? 'var(--accent-primary)' 
                  : 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: isCompleted || isActive ? 'white' : 'var(--text-muted)'
            }}>
              {isCompleted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            
            {getStatusBadge()}
          </div>
          
          {/* Step Title */}
          <h4 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.375rem'
          }}>
            {step.title}
          </h4>
          
          {/* Step Description */}
          <p style={{
            fontSize: '0.8125rem',
            color: 'var(--text-muted)'
          }}>
            {step.description}
          </p>
          
          {/* Status Indicator */}
          {isActive && (
            <motion.div
              style={{
                marginTop: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: 'var(--accent-primary)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              />
              Processing...
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Connector Line */}
      {!isLast && (
        <div style={{
          width: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{
            width: '100%',
            height: '2px',
            backgroundColor: isCompleted ? 'var(--accent-success)' : 'var(--border-color)',
            transition: 'background-color 0.3s ease'
          }} />
          
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                position: 'absolute',
                right: '-4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-success)'
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default StepCard;
