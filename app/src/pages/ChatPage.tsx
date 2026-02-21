import { MessageSquare } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <MessageSquare className="w-10 h-10 text-blue-500" />
      </div>
      <h1 className="text-3xl font-bold text-[#0B1A3A] mb-4">Messages</h1>
      <p className="text-gray-500 max-w-md text-center">
        The chat system is currently under development. Soon, you will be able to message candidates and recruiters directly here!
      </p>
    </div>
  );
}