import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// BackupManager component - simplified version for demo purposes
// The full implementation is in pages/BackupManager.js
const BackupManager = () => {
  const [backupName, setBackupName] = useState('');
  const { darkMode } = useTheme();
  
  const handleBackupNameChange = (e) => {
    setBackupName(e.target.value);
  };

  const handleCreateBackup = () => {
    // Backup creation logic would go here
    console.log('Creating backup with name:', backupName || 'Unnamed backup');
    alert('Backup created successfully!');
    setBackupName('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Backup Manager</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Backup</h2>
        
        <div className="mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Backup name (optional)</label>
            <div className="flex">
              <input 
                type="text"
                value={backupName}
                onChange={handleBackupNameChange}
                placeholder="Enter a name for this backup"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button 
                onClick={handleCreateBackup}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                Create Backup
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Backup History</h2>
        <p className="italic text-gray-700 dark:text-gray-300">No backups found. Create your first backup above.</p>
      </div>
    </div>
  );
};

export default BackupManager;
