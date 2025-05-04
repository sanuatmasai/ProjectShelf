import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { CASE_STUDIES_ME, CASE_STUDY } from "@/imports/api";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit2,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const searchKeyOptions = [
  { value: "title", label: "Title" },
  { value: "startTime", label: "Start Time" },
  { value: "endTime", label: "End Time" },

];

function CaseStudiesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKey, setSearchKey] = useState("title"); // Default search by title
  const navigate = useNavigate();
    const { data, refetch, loading } = useQuery(CASE_STUDIES_ME);
    const { mutate } = useMutation();

  const filteredData = useMemo(() => {
    const response=data?.data?.data
    return response
      ? response?.filter((form) =>
          form[searchKey]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : [];
  }, [searchQuery, searchKey,data]);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
        <h3 className="text-lg font-semibold">Loading...</h3>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <select
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
          >
            {searchKeyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-slate-500">
          Total Records: {filteredData.length}
        </div>
        <Button onClick={() => navigate("create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Case Study
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Theme ID</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((form) => (
              <TableRow key={form.id}>
                <TableCell className="font-medium">{form.title}</TableCell>

                <TableCell>{form?.startTime}</TableCell>
                <TableCell>{form?.endTime}</TableCell>
                <TableCell>{form?.themeId}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate("edit", {
                          state: {caseStudy:form}
                        })
                      }
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>

                  
                    <Button
                      onClick={async () => {
                        await mutate({
                          url: `${CASE_STUDY}/${form.id}`,
                          method: "DELETE",
                        });
                        refetch();
                      }}
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredData.length > 0 ? (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length)} of{" "}
            {filteredData.length} case studies
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
          <h3 className="text-lg font-semibold">No data found</h3>
          <p className="mt-1 text-sm text-slate-500">
            Try adjusting your search or filter to find results.
          </p>
        </div>
      )}
    </div>
  );
}

export default CaseStudiesTable;
