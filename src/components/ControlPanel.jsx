import React from 'react';
import { motion } from 'framer-motion';

function ControlPanel({ isRunning, isPaused, speed, onStart, onPause, onReset, onSpeedChange }) {
  const speeds = [
    { value: 'slow', label: 'Slow' },
    { value: 'normal', label: 'Normal' },
    { value: 'fast', label: 'Fast' }
  ];

  return (
    <div style={{
      marginBottom: '1.5rem',
      padding: '1.25rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px solid var(--border-color)'
    }}>
      <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '1rem'
      }}>
        Simulation Controls
      </h3>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Playback Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {/* Start Button */}
          {!isRunning ? (
            <motion.button
              onClick={onStart}
              className="btn btn-success"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Start
            </motion.button>
          ) : (
            <motion.button
              onClick={onPause}
              className="btn btn-warning"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isPaused ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Resume
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  Pause
                </>
              )}
            </motion.button>
          )}
          
          {/* Reset Button */}
          <motion.button
            onClick={onReset}
            className="btn btn-danger"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </motion.button>
        </div>
        
        {/* Speed Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            Speed:
          </span>
          
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            padding: '4px'
          }}>
            {speeds.map((s) => (
              <motion.button
                key={s.value}
                onClick={() => onSpeedChange(s.value.toUpperCase())}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: speed === s.value.toUpperCase() 
                    ? 'var(--accent-primary)' 
                    : 'transparent',
                  color: speed === s.value.toUpperCase() 
                    ? 'white' 
                    : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
                whileHover={{
                  backgroundColor: speed === s.value.toUpperCase() 
                    ? 'var(--accent-primary)' 
                    : 'var(--border-color)'
                }}
              >
                {s.label}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: isRunning 
            ? isPaused 
              ? 'rgba(245, 158, 11, 0.1)' 
              : 'rgba(16, 185, 129, 0.1)'
            : 'rgba(100, 116, 139, 0.1)',
          borderRadius: '8px'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: isRunning 
              ? isPaused 
                ? 'var(--accent-warning)' 
                : 'var(--accent-success)'
              : 'var(--text-muted)'
          }} />
          <span style={{
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: isRunning 
              ? isPaused 
                ? 'var(--accent-warning)' 
                : 'var(--accent-success)'
              : 'var(--text-muted)'
          }}>
            {isRunning 
              ? isPaused 
                ? 'Paused' 
                : 'Running'
              : 'Ready'
            }
          </span>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
