import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

export const tweetsService = {
  createTweet: (data) => api.post('/tweets', data),
  getTweet: (tweetId) => api.get(`/tweets/${tweetId}`),
  getTimeline: (params) => api.get('/tweets/timeline', { params }),
  deleteTweet: (tweetId) => api.delete(`/tweets/${tweetId}`),
  likeTweet: (tweetId) => api.post(`/tweets/${tweetId}/like`),
};

export const repliesService = {
  createReply: (tweetId, data) => api.post(`/replies/${tweetId}/reply`, data),
  getReplies: (tweetId, params) => api.get(`/replies/${tweetId}/replies`, { params }),
  createRetweet: (tweetId) => api.post(`/replies/${tweetId}/retweet`),
};

export const messagesService = {
  sendDirectMessage: (data) => api.post('/messages/send', data),
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (otherUserId, params) => api.get(`/messages/${otherUserId}`, { params }),
};

export const notificationsService = {
  getNotifications: (params) => api.get('/notifications', { params }),
  getUnreadCount: () => api.get('/notifications/unread/count'),
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
};

export const usersService = {
  getUserById: (userId) => api.get(`/users/${userId}`),
  updateProfile: (data) => api.put('/users/profile', data),
  followUser: (targetUserId) => api.post(`/users/${targetUserId}/follow`),
  getFollowers: (userId, params) => api.get(`/users/${userId}/followers`, { params }),
  searchUsers: (query) => api.get('/users/search', { params: { q: query } }),
};

export default api;
