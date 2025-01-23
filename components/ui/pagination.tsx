interface PaginationProps {
  total: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ total, currentPage, onChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
      <div className="flex justify-center space-x-2">
          {pages.map((page) => (
              <button
                  key={page}
                  className={`px-3 py-1 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => onChange(page)}
              >
                  {page}
              </button>
          ))}
      </div>
  );
};
