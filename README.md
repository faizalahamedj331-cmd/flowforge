# FlowForge – Interactive Workflow Automation Simulator

A production-ready frontend SaaS application for visually simulating real-world workflows with interactive controls, real-time logs, custom workflow builder, and analytics dashboard.

![FlowForge](https://img.shields.io/badge/version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18.2-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3-blue)

## 🚀 Features

### Core Features
- **Workflow Selection**: Choose from 5 predefined workflows (Job Application, Software Development, Order Processing, Employee Onboarding, Bug Fix)
- **Step-by-Step Simulation**: Watch workflows execute in real-time with visual step indicators
- **Real-Time Activity Logs**: See detailed logs of each step execution
- **Simulation Controls**: Start, pause, reset, and adjust simulation speed (Slow/Normal/Fast)

### Advanced Features
- **Custom Workflow Builder**: Create your own workflows with custom steps
- **Analytics Dashboard**: View statistics including success rate, total runs, failed runs, and average duration
- **Dark/Light Theme Toggle**: Switch between themes with persistent storage
- **Local Storage**: All custom workflows and analytics are saved locally

## 🛠️ Tech Stack

- **React 18** – Functional components with Hooks
- **Tailwind CSS** – Utility-first CSS framework
- **Framer Motion** – Smooth animations
- **Chart.js** – Analytics charts
- **Local Storage API** – Data persistence

## 📁 Project Structure

```
flowforge/
├── public/
│   └── index.html          # Main HTML entry point
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── WorkflowSelector.jsx    # Workflow list sidebar
│   │   ├── WorkflowCanvas.jsx      # Main workflow visualization
│   │   ├── StepCard.jsx             # Individual step display
│   │   ├── ControlPanel.jsx         # Simulation controls
│   │   ├── LogsPanel.jsx            # Real-time activity logs
│   │   ├── Builder.jsx              # Custom workflow builder
│   │   └── Analytics.jsx            # Analytics dashboard
│   ├── data/
│   │   └── workflows.js         # Predefined workflow data
│   ├── utils/
│   │   └── storage.js           # Local storage utilities
│   ├── App.js                   # Main application component
│   ├── index.js                 # React entry point
│   └── index.css                # Global styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## ⚡ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to the project directory**
   
```
bash
   cd flowforge
   
```

2. **Install dependencies**
   
```
bash
   npm install
   
```

3. **Start the development server**
   
```
bash
   npm start
   
```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Building for Production

```
bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🎯 Usage Guide

### Running a Simulation
1. Select a workflow from the sidebar
2. Click **Start** to begin simulation
3. Watch the steps execute in real-time
4. Use **Pause** to temporarily stop execution
5. Use **Reset** to start over

### Creating Custom Workflows
1. Click **Builder** in the navigation
2. Enter workflow name and description
3. Add steps with titles and descriptions
4. Use arrow buttons to reorder steps
5. Click **Save Workflow** to save

### Viewing Analytics
1. Complete several workflow simulations
2. Click **Analytics** in the navigation
3. View success rate, total runs, and performance charts

## 🔧 Configuration

### Changing Simulation Speed
Use the speed selector in the Control Panel:
- **Slow**: 2 seconds per step
- **Normal**: 1 second per step
- **Fast**: 0.5 seconds per step

### Theme Toggle
Click the sun/moon icon in the navbar to switch between dark and light themes.

## 📊 Workflow Data

### Predefined Workflows

1. **Job Application Flow** (5 steps)
   - Apply → Screening → Technical Interview → HR Interview → Offer

2. **Software Development Flow** (5 steps)
   - Code → Build → Test → Deploy → Monitor

3. **Order Processing Flow** (6 steps)
   - Order Received → Payment Verification → Inventory Check → Packaging → Shipping → Delivered

4. **Employee Onboarding Flow** (6 steps)
   - Welcome Email → Documentation → IT Setup → Training → Team Introduction → First Project

5. **Bug Fix Workflow** (7 steps)
   - Bug Reported → Triage → Investigation → Fix Implementation → Code Review → QA Testing → Deploy Fix

## 🎨 UI Design

The application features:
- Modern dark theme as default
- Glassmorphism effects
- Smooth Framer Motion animations
- Responsive grid layout
- Card-based component design
- Gradient accents (blue to purple)

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
