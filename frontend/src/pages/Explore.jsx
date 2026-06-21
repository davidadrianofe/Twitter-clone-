import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { usersService, tweetsService } from '../services/api';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ users: [], tweets: [] });
  const [loading, setLoading] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState([
    { topic: '#ReactJS', tweets: '245K', trend: 'Trending Worldwide' },
    { topic: '#Node.js', tweets: '189K', trend: 'Technology · Trending' },
    { topic: '#WebDevelopment', tweets: '567K', trend: 'Trending Worldwide' },
    { topic: '#JavaScript', tweets: '432K', trend: 'Technology · Trending' },
    { topic: '#TailwindCSS', tweets: '156K', trend: 'Development · Trending' },
    { topic: '#FullStack', tweets: '298K', trend: 'Trending Worldwide' },
  ]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setLoading(true);
      try {
        const [usersResponse] = await Promise.all([
          usersService.searchUsers(query),
        ]);
        setSearchResults({
          users: usersResponse,
          tweets: [],
        });
      } catch (error) {
        console.error('Erro na busca:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults({ users: [], tweets: [] });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults({ users: [], tweets: [] });
  };

  return (
    <div className="max-w-2xl mx-auto border-r border-l border-gray-300">
      {/* Search Header */}
      <div className="p-4 border-b border-gray-300 sticky top-0 bg-white bg-opacity-80 backdrop-blur-sm z-10">
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Buscar Twitter"
            className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 outline-none focus:bg-white focus:border-2 focus:border-blue-400 transition"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="absolute right-3 top-3 hover:text-red-500">
              <AiOutlineClose size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Search Results or Trending */}
      {searchQuery ? (
        <div>
          {loading ? (
            <div className="p-8 text-center text-gray-500">Buscando...</div>
          ) : searchResults.users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>Nenhum resultado encontrado para "{searchQuery}"</p>
            </div>
          ) : (
            <div>
              <h3 className="p-4 text-xl font-bold border-b border-gray-300">Pessoas</h3>
              {searchResults.users.map((user) => (
                <div
                  key={user.id}
                  className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <img
                      src={user.profile_picture || 'https://via.placeholder.com/48'}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold hover:underline">{user.full_name}</p>
                      <p className="text-gray-500 text-sm">@{user.username}</p>
                      {user.bio && <p className="text-sm mt-1">{user.bio}</p>}
                    </div>
                  </div>
                  <button className="bg-black text-white rounded-full px-4 py-1 font-bold hover:bg-gray-800 transition opacity-0 group-hover:opacity-100">
                    Seguir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3 className="p-4 text-xl font-bold">O que está em tendência</h3>
          {trendingTopics.map((trend, idx) => (
            <div
              key={idx}
              className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition"
            >
              <p className="text-gray-500 text-xs font-semibold">{trend.trend}</p>
              <p className="font-bold text-lg hover:underline">{trend.topic}</p>
              <p className="text-gray-500 text-sm">{trend.tweets} Tweets</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
