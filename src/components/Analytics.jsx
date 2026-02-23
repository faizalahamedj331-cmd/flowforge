import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { storage } from '../utils/storage';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Analytics({ analytics }) {
  const chartRef = useRef(null);

  // Default analytics if none provided
  const stats = analytics || {
    totalRuns: 0,
    successfulRuns: 0,
    failedRuns: 0,
    totalStepsCompleted: 0,
    averageDuration: 0,
    workflowStats: {}
  };

  // Pie chart data for success/failure
  const pieData = {
    labels: ['Successful', 'Failed'],
    datasets: [
      {
        data: [stats.successfulRuns || 0, stats.failedRuns || 0],
        backgroundColor: ['#10b981', '#ef4444'],
        borderColor: ['#10b981', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
    cutout: '65%',
  };

  // Bar chart data for workflow stats
  const workflowLabels = Object.keys(stats.workflowStats);
  const barData = {
    labels: workflowLabels.length > 0 
      ? workflowLabels.map(id => id.replace(/-/g, ' ').replace(/custom /g, 'Custom ').slice(0, 20))
      : ['No Data'],
    datasets: [
      {
        label: 'Successful Runs',
        data: workflowLabels.map(id => stats.workflowStats[id]?.successful || 0),
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
      {
        label: 'Failed Runs',
        data: workflowLabels.map(id => stats.workflowStats[id]?.failed || 0),
        backgroundColor: '#ef4444',
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
        },
        beginAtZero: true,
      },
    },
  };

  const handleClearAnalytics = () => {
    storage.clearAnalytics();
    window.location.reload();
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--text-primary)'
        }}>
          Analytics Dashboard
        </h2>
        
        {stats.totalRuns > 0 && (
          <motion.button
            onClick={handleClearAnalytics}
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Clear Data
          </motion.button>
        )}
      </div>
      
      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            </div>
            <div>
              <p style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.25rem'
              }}>
                Total Runs
              </p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}>
                {stats.totalRuns}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-success)" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <p style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.25rem'
              }}>
                Successful
              </p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--accent-success)'
              }}>
                {stats.successfulRuns}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-error)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <div>
              <p style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.25rem'
              }}>
                Failed
              </p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--accent-error)'
              }}>
                {stats.failedRuns}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.25rem'
              }}>
                Avg Duration
              </p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--accent-secondary)'
              }}>
                {stats.averageDuration > 0 ? `${Math.round(stats.averageDuration / 1000)}s` : '-'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Charts */}
      {stats.totalRuns > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Pie Chart */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Success Rate
            </h3>
            <div style={{ height: '250px' }}>
              {stats.totalRuns > 0 ? (
                <Pie data={pieData} options={pieOptions} />
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'var(--text-muted)'
                }}>
                  No data available
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Bar Chart */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Workflow Performance
            </h3>
            <div style={{ height: '250px' }}>
              {workflowLabels.length > 0 ? (
                <Bar data={barData} options={barOptions} />
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'var(--text-muted)'
                }}>
                  No data available
                </div>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="card" style={{
          textAlign: 'center',
          padding: '4rem 2rem'
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" style={{ margin: '0 auto 1rem', opacity: 0.5 }}>
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            No Analytics Data Yet
          </h3>
          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--text-muted)'
          }}>
            Run some simulations to see your analytics data here
          </p>
        </div>
      )}
    </div>
  );
}

export default Analytics;
