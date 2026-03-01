import Dashboard from '../components/Dashboard';
import Alerts from '../components/Alerts';
import MaintenanceInsights from '../components/MaintainenceInsights';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Car } from 'lucide-react';

export default function DashboardPage() {
  const { vehicles, addVehicle } = useAuth();
  const [showAddVehicle, setShowAddVehicle] = useState(vehicles.length === 0);
  const [vehicleId, setVehicleId] = useState('');

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicleId.trim()) {
      addVehicle(vehicleId.trim());
      setVehicleId('');
      setShowAddVehicle(false);
    }
  };

  if (vehicles.length === 0 && !showAddVehicle) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-[#1a1a24] border border-gray-800 rounded-lg p-8 text-center">
            <div className="text-blue-400 flex justify-center mb-4">
              <Car size={64} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">No Vehicles Added</h2>
            <p className="text-gray-400 mb-6">
              You need to add at least one vehicle to access the dashboard.
            </p>
            <button
              onClick={() => setShowAddVehicle(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Add Your First Vehicle
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showAddVehicle) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-[#1a1a24] border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Add Vehicle</h2>
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-300 mb-2">
                  Vehicle ID / Registration Number
                </label>
                <input
                  type="text"
                  id="vehicleId"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Enter vehicle ID"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Add Vehicle
                </button>
                {vehicles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAddVehicle(false)}
                    className="flex-1 bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Vehicle Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Managing {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setShowAddVehicle(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            + Add Vehicle
          </button>
        </div>
      </div>
      <Dashboard />
      <Alerts />
      <MaintenanceInsights />
    </div>
  );
}
