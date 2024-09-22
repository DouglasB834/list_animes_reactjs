import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export const Skeleton = () => {
  const itemsPerPage = 10;

  return (
    <TableBody>
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="animate-pulse bg-gray-300 w-16 h-24 rounded" />
          </TableCell>
          <TableCell>
            <div className="animate-pulse bg-gray-300 h-4 w-32 rounded" />
          </TableCell>
          <TableCell>
            <div className="animate-pulse bg-gray-300 h-4 w-24 rounded" />
          </TableCell>
          <TableCell>
            <div className="animate-pulse bg-gray-300 h-4 w-20 rounded" />
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <div className="animate-pulse bg-gray-300 h-4 w-20 rounded" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
