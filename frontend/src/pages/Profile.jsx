import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineEdit, AiOutlineCamera, AiOutlineLink } from 'react-icons/ai';
import { usersService } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Tweet from '../components/Tweet';

const Profile = ({ userId }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    bio: '',
    location: '',
    website: '',
  });

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await usersService.getUserById(userId);
      setUser(response.data);
      setEditData({
        fullName: response.data.full_name,
        bio: response.data.bio || '',
        location: response.data.location || '',
        website: response.data.website || '',
      });
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      await usersService.followUser(userId);
      setIsFollowing(!isFollowing);
      setUser({
        ...user,
        followers_count: isFollowing ? user.followers_count - 1 : user.followers_count + 1,
      });
    } catch (error) {
      console.error('Erro ao seguir usuário:', error);
    }
  };

  const handleEditProfile = async () => {
    try {
      await usersService.updateProfile(editData);
      setUser({
        ...user,
        full_name: editData.fullName,
        bio: editData.bio,
        location: editData.location,
        website: editData.website,
      });
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center">Usuário não encontrado</div>;
  }

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="max-w-2xl mx-auto border-r border-l border-gray-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 sticky top-0 bg-white bg-opacity-80 backdrop-blur-sm z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="hover:bg-gray-100 p-2 rounded-full">
          <AiOutlineArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-bold text-lg">{user.full_name}</h2>
          <p className="text-gray-500 text-sm">{tweets.length} Tweets</p>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 relative">
        {isOwnProfile && (
          <button className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
            <AiOutlineCamera size={20} />
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="p-4 border-b border-gray-300">
        <div className="flex justify-between items-start mb-4">
          <img
            src={user.profile_picture || 'https://via.placeholder.com/128'}
            alt={user.username}
            className="w-32 h-32 rounded-full border-4 border-white -mt-16 object-cover"
          />
          {isOwnProfile ? (
            <button
              onClick={() => setEditMode(!editMode)}
              className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-bold py-2 px-6 rounded-full transition"
            >
              <AiOutlineEdit size={18} className="inline mr-2" />
              Editar
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className={`font-bold py-2 px-6 rounded-full transition ${
                isFollowing
                  ? 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isFollowing ? 'Seguindo' : 'Seguir'}
            </button>
          )}
        </div>

        {editMode && isOwnProfile ? (
          <div className="space-y-4 mb-4">
            <input
              type="text"
              value={editData.fullName}
              onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
              placeholder="Nome"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />
            <textarea
              value={editData.bio}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              placeholder="Bio"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              rows={3}
            />
            <input
              type="text"
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              placeholder="Localização"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={editData.website}
              onChange={(e) => setEditData({ ...editData, website: e.target.value })}
              placeholder="Website"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleEditProfile}
                className="flex-1 bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 border border-gray-300 font-bold py-2 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{user.full_name}</h1>
            <p className="text-gray-500">@{user.username}</p>

            {user.bio && <p className="mt-4 text-gray-900">{user.bio}</p>}

            <div className="flex gap-6 mt-4 text-gray-500 text-sm flex-wrap">
              {user.location && <span>📍 {user.location}</span>}
              {user.website && (
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                  <AiOutlineLink size={16} />
                  {user.website}
                </a>
              )}
              <span>Joined {new Date(user.created_at).getFullYear()}</span>
            </div>

            <div className="flex gap-6 mt-4 text-sm">
              <div className="hover:underline cursor-pointer">
                <span className="font-bold">{user.following_count}</span>
                <span className="text-gray-500"> Seguindo</span>
              </div>
              <div className="hover:underline cursor-pointer">
                <span className="font-bold">{user.followers_count}</span>
                <span className="text-gray-500"> Seguidores</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 sticky top-16 bg-white bg-opacity-80 backdrop-blur-sm">
        <button className="flex-1 px-4 py-3 border-b-2 border-blue-500 text-blue-500 font-bold hover:bg-gray-50">
          Tweets
        </button>
        <button className="flex-1 px-4 py-3 text-gray-500 font-bold hover:bg-gray-50">
          Mídia
        </button>
        <button className="flex-1 px-4 py-3 text-gray-500 font-bold hover:bg-gray-50">
          Likes
        </button>
      </div>

      {/* Tweets */}
      {tweets.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <p className="text-lg font-semibold">Nenhum tweet ainda</p>
        </div>
      ) : (
        <div>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} onDelete={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
