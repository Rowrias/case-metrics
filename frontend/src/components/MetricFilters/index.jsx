import './styles.css';

function MetricsFilters({
  tempDateFilter,
  setTempDateFilter,
  tempSortBy,
  setTempSortBy,
  tempSortOrder,
  setTempSortOrder,
  metrics,
  titulos,
  AplicarOsFiltros,
  ResetarOsFiltros,
  dateFilter,
  sortBy,
  sortOrder
}) {
  return (
    <div className="controls">
        <h2>Filtros</h2>

        <div className="controls-group">
          <div className="...">
            <label className="label">Filtrar por Data:</label>
            <input
              type="date"
              value={tempDateFilter}
              onChange={(e) => setTempDateFilter(e.target.value)}
              className="input-filter"
            />
          </div>
          <div className="...">
            <label className="label">Ordenar por:</label>
            <select
              value={tempSortBy}
              onChange={(e) => setTempSortBy(e.target.value)}
              className="input-filter"
            >
              <option value="">Nenhum</option>
              {metrics.length > 0 &&
                Object.keys(metrics[0]).map((key) => (
                  <option key={key} value={key}>
                    {titulos[key] || key}
                  </option>
                ))}
            </select>
          </div>
          <div className="...">
            <label className="label">Ordem:</label>
            <select
              value={tempSortOrder}
              onChange={(e) => setTempSortOrder(e.target.value)}
              className="input-filter"
            >
              <option value="asc">Crescente</option>
              <option value="desc">Decrescente</option>
            </select>
          </div>
        </div>

        <div className="control-group buttons">
          <button onClick={AplicarOsFiltros} className="...">
            Aplicar Filtros
          </button>
          <button onClick={ResetarOsFiltros} className="...">
            Limpar Filtros
          </button>
        </div>

        {(dateFilter || sortBy) && (
          <div className="filters-info">
            {dateFilter && (
              <p>Filtro aplicado: Data = {dateFilter}</p>
            )}
            {sortBy && (
              <p>Ordenação aplicada: {titulos[sortBy] || sortBy} ({sortOrder === 'asc' ? 'Crescente' : 'Decrescente'})</p>
            )}
          </div>
        )}

      </div>
  );
}

export default MetricsFilters;
