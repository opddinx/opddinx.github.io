import React from 'react';

interface Session {
  time: string;
  title: string;
}

const Timetable: React.FC<{ sessions: Session[]}> = ({ sessions }) => {
  return (
    <div className="container mx-auto py-8">

      <h1 className="text-3xl font-bold text-center mb-8">タイムテーブル</h1>
      {/* Timetable */}
      <div className="space-y-6">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">{session.time}</span>
            </div>
            <h3 className="text-xl font-semibold mt-2">{session.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
