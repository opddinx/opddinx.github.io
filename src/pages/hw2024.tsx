import React from 'react';
import { Calendar, Users, FileText, ExternalLink } from 'lucide-react';
import './hw2024.css';
import Timetable from './timetable';



const presentations = [
  {
    title: "Machine Learning in Healthcare",
    members: ["Alice Chen", "Bob Smith", "Carol Davis"],
    abstract: "An exploration of how machine learning algorithms are revolutionizing medical diagnosis and treatment planning...",
    pdfLink: "/path/to/presentation.pdf"
  },
  {
    title: "Sustainable Computing",
    members: ["David Wilson", "Eva Brown"],
    abstract: "Investigating green computing practices and their impact on environmental sustainability...",
    pdfLink: "/path/to/presentation2.pdf"
  }
];

const PresentationPage = () => {
    const pdfUrl = 'https://drive.google.com/file/d/1kKjl6NNNv3-rp-p8bzpyQQ967j6Cbuos/preview';
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            ヒューマンウェアシンポジウム2024「社会が求める融合研究とは？」
          </h1>
          <p className="mt-2 text-gray-600">
            2024年12月6日（金）に開催されるヒューマンウェアシンポジウム2024のタイムテーブルおよびポスターの一覧です。
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">
      <Timetable/>
        <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">ポスター一覧</h1>
          {presentations.map((presentation, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6"
            >
              {/* Title and Date */}
              <div className="border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {presentation.title}
                  </h2>
                </div>
              </div>
              
              {/* Members */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  <h3 className="text-sm font-medium text-gray-500">Presenters</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {presentation.members.map((member, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              {/* Abstract */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <FileText className="w-4 h-4 mr-2 text-gray-500" />
                  <h3 className="text-sm font-medium text-gray-500">Abstract</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {presentation.abstract}
                </p>
              </div>

              {/* PDF Link */}
              <div className="flex justify-end">
                <a
                  href={presentation.pdfLink}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Presentation
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
              {/* Horizontal PDF Preview from Google Drive */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto my-6 p-4 bg-gray-200">
            <h2 className="text-xl font-semibold mb-4">Event Guide</h2>
            <div className="overflow-y-auto">
            <iframe
                src={pdfUrl}
                width="100%"    // Use full width of the container
                height="600"    // Adjust height for better visibility
                style={{ border: 'none' }}
                title="PDF Preview"
            />
            </div>
        </div>
    </div>
  );
};

export default PresentationPage;