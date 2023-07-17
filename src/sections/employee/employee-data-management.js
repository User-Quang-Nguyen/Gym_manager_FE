import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Card,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import employeesApi from "src/api/staff";
import { paths } from "src/paths";

export const EmployeeDataManagement = (props) => {
  const { id, ...other } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    employeesApi.deleteEmployeeById(id);
    router.push(paths.employees.index);
  };

  return (
    <Card {...props}>
      <CardHeader title="Employee Management" />
      <CardContent sx={{ pt: 0 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined">Reset password</Button>

          <Button color="error" variant="outlined" onClick={handleClickOpen}>
            Delete Account
          </Button>
        </Stack>
      </CardContent>
      <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move", color: "red" }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this employee?</DialogContentText>
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
    </Card>
  );
};
