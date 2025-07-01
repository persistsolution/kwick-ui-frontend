import { useEffect, useState } from 'react';
import { utils, writeFile } from 'xlsx';
import { useNavigate } from 'react-router-dom';
import {
 fetchRawAllocateProductsApi,
} from '../../../api/Raw-Making-Products-Api/RawAllocateProducts/RawAllocateProductsApi';

export interface RawAllocateProduct {
  id: number;
  Name: string;
  ShopName: string;
  Roll: number;
  Phone: string;
}

type SortDirection = 'asc' | 'desc';
type SortKey = keyof RawAllocateProduct | null;

const useRawAllocatProducts = () => {
  const [allocateProducts, setAllocateProducts] = useState<RawAllocateProduct[]>([]);
  const [filteredAllocateProducts, setFilteredAllocateProducts] = useState<RawAllocateProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allocateProductsPerPage, setAllocateProductsPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({
    key: null,
    direction: 'asc',
  });
  const [modal, setModal] = useState<boolean>(false);
  const [allocateProductsEditId, setAllocateProductsEditId] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const franchiseList = [
    { id: 'all', label: 'All' },
    { id: 1, label: 'COCO Franchise' },
    { id: 2, label: 'FOFO Franchise' },
    { id: 0, label: 'Other Franchise' },
  ];

  const toggle = (id: number | null) => {
    setModal((prev) => !prev);
    setAllocateProductsEditId(id);
    if (id !== null) localStorage.setItem('AllocateProductsId', String(id));
    else localStorage.removeItem('AllocateProductsId');
  };

  const handleFetchAllocateProducts = async () => {
    setLoading(true)
    try {
      const res: any = await fetchRawAllocateProductsApi();
      const data: RawAllocateProduct[] = res?.data?.data ?? [];
      setAllocateProducts(data);
      setFilteredAllocateProducts(data);
      setLoading(!data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  };

  useEffect(() => {
    handleFetchAllocateProducts();
  }, []);

  const handleSearch = (term: string) => {
    const lower = term.toLowerCase();
    setSearchTerm(term);
    setFilteredAllocateProducts(
      allocateProducts.filter(
        (p) => p.Name.toLowerCase().includes(lower) || p.id.toString().includes(lower),
      ),
    );
  };

  const handleSort = (key: keyof RawAllocateProduct) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';

    const sorted = [...filteredAllocateProducts].sort((a, b) => {
      const av = a[key] as string | number;
      const bv = b[key] as string | number;
      if (av < bv) return direction === 'asc' ? -1 : 1;
      if (av > bv) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredAllocateProducts(sorted);
  };

  const handleNavigateAllocatedProduct = (id: number) =>
    navigate(`/RawProducts/ViewRawAllocatedProducts/${id}`);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const exportToExcel = () => {
    const table = document.getElementById('AllocateProducts-table') as HTMLTableElement | null;
    if (!table) return;
    const wb = utils.table_to_book(table);
    writeFile(wb, 'AllocateProducts_data.xlsx');
  };

  const indexOfLast = currentPage * allocateProductsPerPage;
  const indexOfFirst = indexOfLast - allocateProductsPerPage;
  const currentAllocateProducts = filteredAllocateProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredAllocateProducts.length / allocateProductsPerPage);

  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return {
    indexOfLastAllocateProducts: indexOfLast,
    indexOfFirstAllocateProducts: indexOfFirst,
    allocateProducts,
    filteredAllocateProducts,
    searchTerm,
    currentPage,
    allocateProductsPerPage,
    sortConfig,
    currentAllocateProducts,
    totalPages,
    franchiseList,
    fromDate,
    toDate,
    loading,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setAllocateProductsPerPage,
    toggle,
    modal,
    allocateProductsEditId,
    handleFetchAllocateProducts,
    setFromDate,
    setToDate,
    handleNavigateAllocatedProduct,
  };
};

export default useRawAllocatProducts;
