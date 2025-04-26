import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import axios from '../utils/api';

const BackupManagerNew = () => {
  const [backupName, setBackupName] = useState('');
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const { darkMode } = useTheme();
  
  // Fetch backups when component mounts
  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/backups');
      setBackups(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching backups:', err);
      setError('Failed to load backups. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackupNameChange = (e) => {
    setBackupName(e.target.value);
  };

  const handleCreateBackup = async () => {
    try {
      setIsCreating(true);
      await axios.post('/api/backups', { name: backupName || 'manual' });
      setBackupName('');
      // Refresh the backup list
      await fetchBackups();
      alert('Backup created successfully!');
    } catch (err) {
      console.error('Error creating backup:', err);
      alert('Failed to create backup. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleRestoreBackup = async (backupId) => {
    if (window.confirm('Are you sure you want to restore this backup? This will replace your current data.')) {
      try {
        await axios.post(`/api/backups/restore/${backupId}`);
        alert('Backup restored successfully!');
      } catch (err) {
        console.error('Error restoring backup:', err);
        alert('Failed to restore backup. Please try again.');
      }
    }
  };

  const handleDeleteBackup = async (backupId) => {
    if (window.confirm('Are you sure you want to delete this backup? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/backups/${backupId}`);
        // Refresh the backup list
        await fetchBackups();
        alert('Backup deleted successfully!');
      } catch (err) {
        console.error('Error deleting backup:', err);
        alert('Failed to delete backup. Please try again.');
      }
    }
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
                disabled={isCreating}
              />
              <button 
                onClick={handleCreateBackup}
                className={`px-4 py-2 bg-blue-600 text-white rounded-r-md ${isCreating ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                disabled={isCreating}
              >
                {isCreating ? 'Creating...' : 'Create Backup'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Available Backups</h2>
        
        {loading ? (
          <p className="text-center py-4 text-gray-700 dark:text-gray-300">Loading backups...</p>
        ) : error ? (
          <p className="text-red-600 dark:text-red-400">{error}</p>
        ) : backups.length === 0 ? (
          <p className="italic text-gray-700 dark:text-gray-300">No backups found. Create your first backup above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {backups.map((backup) => (
                  <tr key={backup.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-white">{backup.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-white">{backup.createdFormatted}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-white">{backup.sizeFormatted}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-white">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleRestoreBackup(backup.id)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          Restore
                        </button>
                        <button 
                          onClick={() => handleDeleteBackup(backup.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackupManagerNew;