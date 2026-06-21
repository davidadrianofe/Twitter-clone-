import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineClose } from 'react-icons/ai';
import { messagesService } from '../services/api';

const MessagesList = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await messagesService.getConversations();
      setConversations(response);
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (otherUserId) => {
    try {
      const response = await messagesService.getMessages(otherUserId);
      setMessages(response.data.messages);
      setSelectedConversation(otherUserId);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;

    try {
      await messagesService.sendDirectMessage({
        receiverId: selectedConversation,
        message: messageText,
      });
      setMessageText('');
      loadMessages(selectedConversation);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-300 overflow-y-auto">
        <div className="p-4 border-b border-gray-300 sticky top-0 bg-white">
          <h2 className="text-xl font-bold">Mensagens</h2>
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-500">Carregando...</div>
        ) : conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">Nenhuma conversa</div>
        ) : (
          <div>
            {conversations.map((conv) => (
              <div
                key={conv.other_user_id}
                onClick={() => loadMessages(conv.other_user_id)}
                className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition ${
                  selectedConversation === conv.other_user_id ? 'bg-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={conv.profile_picture || 'https://via.placeholder.com/40'}
                    alt={conv.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold">{conv.full_name}</p>
                    <p className="text-gray-500 text-sm truncate">{conv.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-300 bg-white sticky top-0">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Conversa</h3>
              <button
                onClick={() => setSelectedConversation(null)}
                className="hover:bg-gray-100 p-2 rounded-full"
              >
                <AiOutlineClose size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender_id === selectedConversation ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender_id === selectedConversation
                      ? 'bg-gray-200 text-gray-900'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(msg.created_at).toLocaleTimeString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-300 bg-white">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Escreva uma mensagem..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-full transition"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <AiOutlineMail size={64} className="mx-auto mb-4" />
            <p className="text-lg">Selecione uma conversa para começar</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesList;
