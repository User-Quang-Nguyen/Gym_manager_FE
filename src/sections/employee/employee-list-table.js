import { useCallback, useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { paths } from "src/paths";

const useSelectionModel = (employees) => {
  const employeeIds = useMemo(() => {
    return employees.map((employee) => employee.id);
  }, [employees]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [employeeIds]);

  const selectOne = useCallback((employeeId) => {
    setSelected((prevState) => [...prevState, employeeId]);
  }, []);

  const deselectOne = useCallback((employeeId) => {
    setSelected((prevState) => {
      return prevState.filter((id) => id !== employeeId);
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected([...employeeIds]);
  }, [employeeIds]);

  const deselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  return {
    deselectAll,
    deselectOne,
    selectAll,
    selectOne,
    selected,
  };
};

export const EmployeeListTable = (props) => {
  const {
    staff,
    staffCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    handleDeleteEmployee,
    rowsPerPage,
    ...other
  } = props;
  const { deselectAll, selectAll, deselectOne, selectOne, selected } = useSelectionModel(staff);

  const handleToggleAll = useCallback(
    (event) => {
      const { checked } = event.target;

      if (checked) {
        selectAll();
      } else {
        deselectAll();
      }
    },
    [selectAll, deselectAll]
  );

  const selectedAll = selected.length === staff.length;
  const selectedSome = selected.length > 0 && selected.length < staff.length;
  const enableBulkActions = selected.length > 0;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    selected.forEach((index) => handleDeleteEmployee(index));
    setOpen(false);
  };

  return (
    <Box sx={{ position: "relative" }} {...other}>
      {enableBulkActions && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            display: enableBulkActions ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox checked={selectedAll} indeterminate={selectedSome} onChange={handleToggleAll} />
          <Button onClick={handleClickOpen} color="inherit" size="small">
            Delete
          </Button>
          <Button color="inherit" size="small">
            Edit
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleToggleAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((staff) => {
              const isSelected = selected.includes(staff.id);
              return (
                <TableRow hover key={staff.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        const { checked } = event.target;

                        if (checked) {
                          selectOne(staff.id);
                        } else {
                          deselectOne(staff.id);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Avatar
                        // src={staff.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      ></Avatar>
                      <div>
                        <Link
                          color="inherit"
                          component={NextLink}
                          href={paths.staff.details(staff.id)}
                          variant="subtitle2"
                        >
                          {staff.first_name} {staff.last_name}
                        </Link>
                        <Typography color="text.secondary" variant="body2">
                          {staff.email}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>{staff.role_name}</TableCell>
                  <TableCell>{staff.gender}</TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell align="right">
                    <IconButton component={NextLink} href={paths.staff.edit(staff.id)}>
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={staffCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move", color: "red" }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this staff?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

EmployeeListTable.propTypes = {
  staff: PropTypes.array.isRequired,
  staffCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
