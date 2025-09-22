import './styles.css';

function PaginationControls({ pagination, onPageChange }) {
    return (
        <div className="pagination-controls">
            <button
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
            >
                Anterior
            </button>

            <span className="pagination-info">
                Página {pagination.page} de {pagination.total_pages}
            </span>

            <button
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.total_pages}
            >
                Próxima
            </button>
        </div>
    );
}

export default PaginationControls;
