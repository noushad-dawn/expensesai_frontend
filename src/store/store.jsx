import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // App domain states
  const [expenses, setExpenses] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  // Initialize auth state from token
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/me');
          setUser(res.data.data);
        } catch (error) {
          console.error('Session validation failed:', error.message);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    const { token: userToken, ...userData } = res.data.data;
    localStorage.setItem('token', userToken);
    setToken(userToken);
    setUser(userData);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await API.post('/auth/register', { name, email, password });
    const { token: userToken, ...userData } = res.data.data;
    localStorage.setItem('token', userToken);
    setToken(userToken);
    setUser(userData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setDashboardData(null);
    setExpenses([]);
    setSalaries([]);
    setAiData(null);
  };

  // Dashboard API fetching
  const fetchDashboardData = async () => {
    try {
      const res = await API.get('/dashboard');
      setDashboardData(res.data.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error.message);
    }
  };

  // Expense CRUD APIs
  const fetchExpenses = async (filters = {}) => {
    try {
      const res = await API.get('/expenses', { params: filters });
      setExpenses(res.data.data);
    } catch (error) {
      console.error('Failed to fetch expenses list:', error.message);
    }
  };

  const addExpense = async (expenseData) => {
    const res = await API.post('/expenses', expenseData);
    setExpenses(prev => [res.data.data, ...prev]);
    fetchDashboardData(); // Recalculate stats dynamically
    return res.data;
  };

  const updateExpense = async (id, expenseData) => {
    const res = await API.put(`/expenses/${id}`, expenseData);
    setExpenses(prev => prev.map(e => (e._id === id ? res.data.data : e)));
    fetchDashboardData();
    return res.data;
  };

  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    setExpenses(prev => prev.filter(e => e._id !== id));
    fetchDashboardData();
  };

  // Salary CRUD APIs
  const fetchSalaries = async () => {
    try {
      const res = await API.get('/salary');
      setSalaries(res.data.data);
    } catch (error) {
      console.error('Failed to retrieve salaries list:', error.message);
    }
  };

  const addSalary = async (salaryData) => {
    const res = await API.post('/salary', salaryData);
    setSalaries(prev => [res.data.data, ...prev]);
    fetchDashboardData();
    return res.data;
  };

  const updateSalary = async (id, salaryData) => {
    const res = await API.put(`/salary/${id}`, salaryData);
    setSalaries(prev => prev.map(s => (s._id === id ? res.data.data : s)));
    fetchDashboardData();
    return res.data;
  };

  const deleteSalary = async (id) => {
    await API.delete(`/salary/${id}`);
    setSalaries(prev => prev.filter(s => s._id !== id));
    fetchDashboardData();
  };

  // Gemini AI recommendation trigger
  const fetchAIAnalysis = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await API.post('/ai/analyze');
      setAiData(res.data.data);
    } catch (error) {
      setAiError(error.response?.data?.error || 'AI recommendations service failed');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        loading,
        expenses,
        salaries,
        dashboardData,
        aiData,
        aiLoading,
        aiError,
        login,
        register,
        logout,
        fetchDashboardData,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        fetchSalaries,
        addSalary,
        updateSalary,
        deleteSalary,
        fetchAIAnalysis
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
