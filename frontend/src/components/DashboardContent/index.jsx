import { useState, useEffect } from 'react';
import LoginHeader from '../LoginHeader';
import MetricsFilters from '../MetricFilters';
import MetricsTable from '../MetricsTable';
import axios from 'axios';
import './styles.css';

function DashboardContent({ user, onLogout, onSessionExpired }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // MetricFilters
  const [metrics, setMetrics] = useState([]);
  const [dateFilter, setDateFilter] = useState(''); // Estado para  filtro real
  const [sortBy, setSortBy] = useState('');         // Estado para a ordenação real
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para a ordem real
  const [tempDateFilter, setTempDateFilter] = useState(''); // Filtro temporário
  const [tempSortBy, setTempSortBy] = useState(''); // Ordenação temporária
  const [tempSortOrder, setTempSortOrder] = useState('asc'); // Ordem temporária
  // Paginação
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 100,
    total: 0,
    total_pages: 0
  });

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.get('http://localhost:5000/metrics', {
        params: {
          date: dateFilter,
          sort_by: sortBy,
          sort_order: sortOrder,
          page: pagination.page,
          per_page: pagination.per_page
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setMetrics(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.total,
        total_pages: response.data.total_pages
      });
    } catch (erro) {
      console.error('Error fetching metrics:', erro.response?.data || erro.message);

      if (erro.response?.status === 401) {
        setError('Sessão expirada. Por favor, faça login novamente.');
        localStorage.removeItem('authToken');

        if (onSessionExpired) {
          onSessionExpired();
        }
      } else {
        setError('Falha ao carregar os dados. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateFilter, sortBy, sortOrder, pagination.page, pagination.per_page]);

  const AplicarOsFiltros = () => {
    // Aplicar os filtros temporários aos filtros reais
    setDateFilter(tempDateFilter);
    setSortBy(tempSortBy);
    setSortOrder(tempSortOrder);
    setPagination({ 
      ...pagination, 
      page: 1, // Voltar para a primeira página 
    }); 
  };

  const ResetarOsFiltros = () => {
    // Limpar todos os filtros
    setTempDateFilter('');
    setTempSortBy('');
    setTempSortOrder('asc');
    setDateFilter('');
    setSortBy('');
    setSortOrder('asc');
    setPagination({ 
      ...pagination, 
      page: 1, // Voltar para a primeira página
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  const handlePerPageChange = (newPerPage) => {
    setPagination({
      ...pagination,
      per_page: newPerPage,
      page: 1, // Voltar para a primeira página
    });
  };

  const titulos = {
    account_id: 'Account ID',
    campaign_id: 'Campaign ID',
    cost_micros: 'Custo (micros)',
    clicks: 'Cliques',
    conversions: 'Conversões',
    impressions: 'Impressões',
    interactions: 'Interações',
    date: 'Data',
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard de Métricas</h1>

      <LoginHeader
        user={user}
        onLogout={onLogout}
      />

      <MetricsFilters
        tempDateFilter={tempDateFilter}
        setTempDateFilter={setTempDateFilter}
        tempSortBy={tempSortBy}
        setTempSortBy={setTempSortBy}
        tempSortOrder={tempSortOrder}
        setTempSortOrder={setTempSortOrder}
        metrics={metrics}
        titulos={titulos}
        AplicarOsFiltros={AplicarOsFiltros}
        ResetarOsFiltros={ResetarOsFiltros}
        dateFilter={dateFilter}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />

      <MetricsTable
        metrics={metrics}
        pagination={pagination}
        titulos={titulos}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

export default DashboardContent;
