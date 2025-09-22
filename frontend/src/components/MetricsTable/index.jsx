import PaginationControls from '../PaginationControls';
import './styles.css';

function MetricsTable({
    metrics,
    pagination,
    titulos,
    onPageChange,
    onPerPageChange
}) {
    return (
        <div className='metric-table'>
            <h2>Métricas</h2>

            <div className='page-info'>

                <div className="page-control">
                    <label className="label">Itens por página:</label>
                    <select
                        value={pagination.per_page}
                        onChange={(e) => onPerPageChange(parseInt(e.target.value))}
                        className="input-filter"
                    >
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="500">500</option>
                    </select>
                </div>

                <div className="table-info">
                    <p>Mostrando {metrics.length} de {pagination.total} registros</p>
                </div>

            </div>

            {pagination.total_pages > 1 && (
                <PaginationControls
                    pagination={pagination}
                    onPageChange={onPageChange}
                />
            )}

            <div className="table-wrapper">
                {metrics.length === 0 ? (
                    <p className="no-data">Nenhum dado encontrado.</p>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                {Object.keys(metrics[0]).map((key) => (
                                    <th key={key}>
                                        {titulos[key] || key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, i) => (
                                        <td key={i}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {pagination.total_pages > 1 && (
                <PaginationControls
                    pagination={pagination}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}

export default MetricsTable;
