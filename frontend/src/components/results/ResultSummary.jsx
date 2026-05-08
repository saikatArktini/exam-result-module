import React from 'react';
import { GraduationCap, MapPin, Calendar, User, Printer } from 'lucide-react';
import GradeBadge from './GradeBadge';

const ResultSummary = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-4xl mx-auto my-8 print:shadow-none print:border-none print:m-0">
      {/* Header / School Info */}
      <div className="bg-indigo-600 p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <GraduationCap className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Exams Authority</h1>
            <p className="text-indigo-100 text-sm mt-1 flex items-center gap-1 opacity-80">
              <MapPin className="h-3 w-3" /> New Delhi, India
            </p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <div className="text-xs uppercase tracking-widest text-indigo-200 font-bold mb-1">Status</div>
          <div className={`text-2xl font-black px-6 py-2 rounded-xl inline-block ${
            result.status === 'PASS' ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'
          }`}>
            {result.status}
          </div>
        </div>
      </div>

      <div className="p-10 text-left">
        {/* Student Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2 tracking-widest">Student Name</span>
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <User className="h-4 w-4 text-indigo-500" /> {result.student?.name}
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2 tracking-widest">Roll Number</span>
            <div className="font-mono text-gray-900 font-bold">{result.student?.rollNumber}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2 tracking-widest">Class / Section</span>
            <div className="font-bold text-gray-900">{result.student?.className} - {result.student?.section}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2 tracking-widest">Exam Session</span>
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <Calendar className="h-4 w-4 text-indigo-500" /> {result.examName}
            </div>
          </div>
        </div>

        {/* Marks Table */}
        <div className="mb-12 overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Full Marks</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Pass Marks</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Obtained</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {result.marks.map((mark, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800 uppercase text-xs tracking-tight">{mark.subjectName}</td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-gray-500">{mark.fullMarks}</td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-red-400">{mark.passMarks}</td>
                  <td className="px-6 py-4 text-right font-black text-gray-900 text-base">{mark.marksObtained}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-indigo-50/30 border-t-2 border-indigo-100">
                <td colSpan={3} className="px-6 py-6 font-black text-indigo-900 uppercase text-sm">Grand Total</td>
                <td className="px-6 py-6 text-right font-black text-2xl text-indigo-600">{result.totalMarks}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Percentage</span>
              <div className="text-3xl font-black text-gray-900">{result.percentage.toFixed(2)}%</div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Final Grade</span>
              <GradeBadge grade={result.grade} />
            </div>
          </div>
          
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-100 transition-all font-bold text-sm print:hidden"
          >
            <Printer className="h-4 w-4" /> Print Marksheet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
