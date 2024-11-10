import React from 'react';
import './hw2024.css';

interface Session {
  time: string;
  title: string;
}

const sessions = [
    { time: '09:30', title: '開場'},
    { time: '10:00', title: '開会'},
    { time: '10:10', title: 'パネルディスカッション'},
    { time: '11:40', title: 'お昼休み'},
    { time: '12:40', title: 'アイデアソン'},
    { time: '13:30', title: 'チーム発表と審査・講評'},
    { time: '14:10', title: '休憩'},
    { time: '14:20', title: 'ポスターセッション'},
    { time: '15:30', title: '交流会'},
    { time: '16:45', title: '閉会式'},
  ];

const Timetable: React.FC<{}> = ({}) => {
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
