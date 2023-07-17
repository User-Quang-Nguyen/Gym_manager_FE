import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import numeral from 'numeral';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

export const RegisListTable = (props) => {
  const {
    onRegisSelect,
    onPageChange,
    onRowsPerPageChange,
    regiss,
    regissCount,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Table>
        <TableBody>
          {regiss.map((regis) => {
            
            const createdAt = parseISO(regis.created_at);
            
            const createdAtMonth = format(createdAt, 'LLL').toUpperCase();
            const createdAtDay = format(createdAt, 'd');

            const totalAmount = numeral(regis.price).format(`0,0.00 $`);

            return (
              <TableRow
                hover
                key={regis.id}
                onClick={() => onRegisSelect?.(regis.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? 'neutral.800'
                        : 'neutral.200',
                      bregisRadius: 2,
                      maxWidth: 'fit-content',
                      ml: 3,
                      p: 1
                    }}
                  >
                    <Typography
                      align="center"
                      variant="subtitle2"
                    >
                      {createdAtMonth}
                    </Typography>
                    <Typography
                      align="center"
                      variant="h6"
                    >
                      {createdAtDay}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">
                      {regis.customer_name}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      {regis.my_package_name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                 {totalAmount}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={regissCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

RegisListTable.propTypes = {
  onRegisSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  regiss: PropTypes.array.isRequired,
  regissCount: PropTypes.number,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
