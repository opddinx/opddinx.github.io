import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

interface Session {
  time: string;
  title: string;
  speaker: string;
}

const Timetable: React.FC<{ sessions: Session[], pdfUrl: string }> = ({ sessions, pdfUrl }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">タイムテーブル</h1>

      {/* PDF Preview */}
      <div className="mb-8 p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">チラシ</h2>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js`}>
          <div className="overflow-y-auto h-64">
            <Viewer fileUrl={pdfUrl} />
          </div>
        </Worker>
      </div>

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
            <p className="text-gray-600 italic">by {session.speaker}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
