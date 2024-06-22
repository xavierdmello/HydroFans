import React from 'react';

interface WaterTrackingProps {
  currentIntake: number;
  suggestedIntake: number;
  dailyIntake: number[];
}

const WaterTracking: React.FC<WaterTrackingProps> = ({ currentIntake, suggestedIntake, dailyIntake }) => {
  const currentIntakeInCups = (currentIntake / 240).toFixed(2);
  const suggestedIntakeInCups = (suggestedIntake / 240).toFixed(2);

  const maxIntake = Math.max(...dailyIntake, suggestedIntake);

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const getDayColor = (intake: number) => {
    const intensity = intake / suggestedIntake;
    if (intensity >= 1) return 'bg-blue-600';
    if (intensity >= 0.75) return 'bg-blue-400';
    if (intensity >= 0.5) return 'bg-blue-200';
    if (intensity > 0) return 'bg-gray-300';
    return 'bg-gray-100';
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Water Tracking</h2>
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-64 bg-gray-200 rounded-lg overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 bg-blue-600"
            style={{ height: `${(currentIntake / suggestedIntake) * 100}%` }}
          />
        </div>
        <div className="ml-4">
          <p className="text-xl font-bold">{currentIntake} mL</p>
          <p className="text-sm text-gray-500">({currentIntakeInCups} cups)</p>
          <p className="text-sm text-gray-500">Suggested: {suggestedIntake} mL ({suggestedIntakeInCups} cups)</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Daily Intake</h3>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: daysInMonth }).map((_, day) => (
            <div
              key={day}
              className={`w-8 h-8 ${getDayColor(dailyIntake[day] || 0)}`}
              title={`${day + 1}: ${dailyIntake[day] || 0} mL`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterTracking;
