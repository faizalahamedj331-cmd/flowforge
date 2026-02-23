import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { storage } from '../utils/storage';

function Settings({ theme, toggleTheme, onExport, onImport }) {
  const [settings, setSettings] = useState({
    defaultSpeed: 'normal',
    autoSave: true,
    showNotifications: true,
    enableKeyboardShortcuts: true,
    enableStepFailure: false
  });
  
  const [importData, setImportData] = useState('');
  const [importStatus, setImportStatus] = useState(null);

  useEffect(() => {
    const savedSettings = storage.getSettings();
    setSettings(savedSettings);
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    storage.saveSettings(newSettings);
  };

  const handleExport = () => {
    const data = storage.exportWorkflows();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowforge-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importData.trim()) return;
    const result = storage.importWorkflows(importData);
    setImportStatus(result);
    if (result.success) {
      setImportData('');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const handleExportCSV = () => {
    const csv = storage.exportAnalyticsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowforge-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '1.5rem'
      }}>
        Settings
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Appearance Settings */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            Appearance
          </h3>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 0',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div>
              <p style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'var(--text-primary)'
              }}>
                Dark Mode
              </p>
              <p style={{
                fontSize: '0.8125rem',
                color: 'var(--text-muted)'
              }}>
                Toggle dark/light theme
              </p>
            </div>
            <motion.button
              onClick={toggleTheme}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: theme === 'dark' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                animate={{ x: theme === 'dark' ? 20 : 0 }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Simulation Settings */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Simulation
          </h3>

          {/* Default Speed */}
          <div style={{
            padding: '0.75rem 0',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <p style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Default Speed
            </p>
            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              {['slow', 'normal', 'fast'].map(speed => (
                <motion.button
                  key={speed}
                  onClick={() => handleSettingChange('defaultSpeed', speed)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: settings.defaultSpeed === speed ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    color: settings.defaultSpeed === speed ? 'white' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    textTransform: 'capitalize'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {speed}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Enable Step Failure */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 0'
          }}>
            <div>
              <p style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'var(--text-primary)'
              }}>
                Simulate Failures
              </p>
              <p style={{
                fontSize: '0.8125rem',
                color: 'var(--text-muted)'
              }}>
                Randomly fail steps for testing
              </p>
            </div>
            <motion.button
              onClick={() => handleSettingChange('enableStepFailure', !settings.enableStepFailure)}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: settings.enableStepFailure ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                animate={{ x: settings.enableStepFailure ? 20 : 0 }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Keyboard Shortcuts */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
            </svg>
            Controls
          </h3>

          {/* Keyboard Shortcuts Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 0',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div>
              <p style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'var(--text-primary)'
              }}>
                Keyboard Shortcuts
              </p>
              <p style={{
                fontSize: '0.8125rem',
                color: 'var(--text-muted)'
              }}>
                Enable keyboard controls
              </p>
            </div>
            <motion.button
              onClick={() => handleSettingChange('enableKeyboardShortcuts', !settings.enableKeyboardShortcuts)}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: settings.enableKeyboardShortcuts ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                animate={{ x: settings.enableKeyboardShortcuts ? 20 : 0 }}
              />
            </motion.button>
          </div>

          {/* Shortcuts List */}
          <div style={{ paddingTop: '0.75rem' }}>
            <p style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Available Shortcuts
            </p>
            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              padding: '0.75rem',
              fontSize: '0.8125rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.375rem',
                color: 'var(--text-secondary)'
              }}>
                <span>Start/Pause</span>
                <kbd style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}>Space</kbd>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.375rem',
                color: 'var(--text-secondary)'
              }}>
                <span>Reset</span>
                <kbd style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}>R</kbd>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'var(--text-secondary)'
              }}>
                <span>Speed Toggle</span>
                <kbd style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}>S</kbd>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Data Management
          </h3>

          {/* Export Button */}
          <motion.button
            onClick={handleExport}
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              marginBottom: '0.75rem',
              justifyContent: 'flex-start'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Export All Data (JSON)
          </motion.button>

          {/* Export CSV */}
          <motion.button
            onClick={handleExportCSV}
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              marginBottom: '1rem',
              justifyContent: 'flex-start'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Export Analytics (CSV)
          </motion.button>

          {/* Import */}
          <div style={{ marginBottom: '0.5rem' }}>
            <p style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Import Data
            </p>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste JSON data here..."
              style={{
                width: '100%',
                height: '80px',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem',
                resize: 'none',
                marginBottom: '0.5rem'
              }}
            />
            <motion.button
              onClick={handleImport}
              disabled={!importData.trim()}
              className="btn btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                opacity: importData.trim() ? 1 : 0.5
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Import Data
            </motion.button>
          </div>

          {/* Import Status */}
          {importStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                borderRadius: '8px',
                backgroundColor: importStatus.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${importStatus.success ? 'var(--accent-success)' : 'var(--accent-error)'}`
              }}
            >
              <p style={{
                fontSize: '0.8125rem',
                color: importStatus.success ? 'var(--accent-success)' : 'var(--accent-error)'
              }}>
                {importStatus.message}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Settings;
