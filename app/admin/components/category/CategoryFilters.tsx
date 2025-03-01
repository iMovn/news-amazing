import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export const CategoryFilters = ({
  statusFilter,
  setStatusFilter,
  createdAtFilter,
  setCreatedAtFilter,
  onSearch,
}: {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  createdAtFilter: string;
  setCreatedAtFilter: (value: string) => void;
  onSearch: (value: string) => void;
}) => {
  return (
    <div className="w-64 p-4 bg-gray-50 border-r">
      <h3 className="text-lg font-semibold mb-4">Bộ lọc</h3>
      <div className="space-y-4">
        <Input
          placeholder="Tìm kiếm theo tên..."
          onChange={(e) => onSearch(e.target.value)}
        />
        {/* Lọc theo trạng thái */}
        <div>
          <label className="block text-sm font-medium mb-1">Trạng thái</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Hoạt động</SelectItem>
              <SelectItem value="0">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lọc theo ngày tạo */}
        <div>
          <label className="block text-sm font-medium mb-1">Ngày tạo</label>
          <Input
            type="date"
            value={createdAtFilter}
            onChange={(e) => setCreatedAtFilter(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};