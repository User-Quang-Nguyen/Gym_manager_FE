import { Fragment, useCallback, useState } from "react";
import numeral from "numeral";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import ChevronRightIcon from "@untitled-ui/icons-react/build/esm/ChevronRight";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  SvgIcon,
  Table,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

const categoryOptions = [
  {
    label: "Strength",
    value: "Strength",
  },
  {
    label: "Cardio",
    value: "Cardio",
  },
];

export const EquipmentListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    equipments,
    equipmentsCount,
    rowsPerPage,
    deleteEquip,
    updateEquip,
    ...other
  } = props;
  const [currentEquipment, setCurrentEquipment] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClodeModal = () => {
    setOpenModal(false);
  }

  const handleEquipmentToggle = useCallback((equipmentId) => {
    setCurrentEquipment((prevEquipmentId) => {
      if (prevEquipmentId === equipmentId) {
        return null;
      }
      return equipmentId;
    });
    console.log(currentEquipment);
  }, []);

  const handleEquipmentClose = useCallback(() => {
    setCurrentEquipment(null);
  }, []);

  const handleEquipmentUpdate = (equipment) => {
    let updatedEquipments = equipment;
    try{
      updatedEquipments = {
      ...equipment,
      name: document.getElementById('name').value,
      category_name: document.getElementById('category_name').value,
      price: document.getElementById('price').value,
      purchase_date: document.getElementById('purchase_date').value,
      warranty_period: document.getElementById('warranty_period').value
    }
    updateEquip(equipment.id, updatedEquipments);
    setCurrentEquipment(null);
    toast.success("Equipment updated");
    }catch {
      setCurrentEquipment(null);
      toast.error("Error updated");
    }
  };

  const handleEquipmentDelete = useCallback((equipId) => {
    deleteEquip(equipId);
    setOpenModal(false);
    setCurrentEquipment(null);
    toast.error("Equipment cannot be deleted");
  }, []);

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Warranty Period</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipments.map((equipment) => {
              const isCurrent = equipment.id === currentEquipment;
              const price = numeral(equipment.price).format(`0,0.00 $`);
              return (
                <Fragment key={equipment.id}>
                  <TableRow hover key={equipment.id}>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(isCurrent && {
                          position: "relative",
                          "&:after": {
                            position: "absolute",
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: "primary.main",
                            width: 3,
                            height: "calc(100% + 1px)",
                          },
                        }),
                      }}
                    >
                      <IconButton onClick={() => handleEquipmentToggle(equipment.id)}>
                        <SvgIcon>{isCurrent ? <ChevronDownIcon /> : <ChevronRightIcon />}</SvgIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {equipment.image ? (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "neutral.50",
                              backgroundImage: `url(${equipment.image})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              borderRadius: 1,
                              display: "flex",
                              height: 80,
                              justifyContent: "center",
                              overflow: "hidden",
                              width: 80,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "neutral.50",
                              borderRadius: 1,
                              display: "flex",
                              height: 80,
                              justifyContent: "center",
                              width: 80,
                            }}
                          >
                            <SvgIcon>
                              <Image01Icon />
                            </SvgIcon>
                          </Box>
                        )}
                        <Box
                          sx={{
                            cursor: "pointer",
                            ml: 2,
                          }}
                        >
                          <Typography variant="subtitle2">{equipment.name}</Typography>
                          <Typography color="text.secondary" variant="body2">
                            in {equipment.category_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>{new Date().toISOString().slice(0, 10)}</TableCell>
                    <TableCell>{` ${equipment.warranty_period} month`}</TableCell>
                  </TableRow>
                  {isCurrent && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
                          position: "relative",
                          "&:after": {
                            position: "absolute",
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: "primary.main",
                            width: 3,
                            height: "calc(100% + 1px)",
                          },
                        }}
                      >
                        <CardContent>
                          <Grid
                            container
                            spacing={3}
                            sx={{
                              width: "98%",
                            }}
                          >
                            <Grid item md={6} xs={12}>
                              <Typography variant="h6">Basic details</Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    id="name"
                                    defaultValue={equipment.name}
                                    fullWidth
                                    label="Equipment name"
                                    name="name"
                                  />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                  <TextField
                                    id="category_name"
                                    defaultValue={equipment.category_name}
                                    fullWidth
                                    label="Category"
                                    select
                                  >
                                    {categoryOptions.map((option) => (
                                      <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Typography variant="h6">Pricing</Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    id="price"
                                    defaultValue={equipment.price}
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">{"$"}</InputAdornment>
                                      ),
                                    }}
                                    type="number"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    id="purchase_date"
                                    defaultValue={equipment.purchase_date.slice(0, 10)}
                                    fullWidth
                                    label="Purchase Date"
                                    name="purchase_date"
                                    type="date"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                  sx={{
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  <TextField
                                    id="warranty_period"
                                    defaultValue={equipment.warranty_period}
                                    fullWidth
                                    label="warranty Period"
                                    name="warranty_period"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">month</InputAdornment>
                                      ),
                                    }}
                                    type="number"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Stack
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between"
                          sx={{ p: 2, width: "95%" }}
                        >
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Button
                              onClick={() => {handleEquipmentUpdate(equipment)}}
                              type="submit"
                              variant="contained"
                            >
                              Update
                            </Button>
                            <Button color="inherit" onClick={handleEquipmentClose}>
                              Cancel
                            </Button>
                          </Stack>
                          <div>
                            <Button
                              onClick={() => {
                                setOpenModal(true);
                              }}
                              color="error"
                            >
                              Delete equipment
                            </Button>
                          </div>
                        </Stack>
                        <Dialog
                          open={openModal}
                          onClose={handleClodeModal}
                          aria-labelledby="draggable-dialog-title"
                        >
                          <DialogTitle
                            style={{ cursor: "move", color: "red" }}
                            id="draggable-dialog-title"
                          >
                            Delete
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Are you sure you want to delete this equipment
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button autoFocus onClick={handleClodeModal}>
                              Cancel
                            </Button>
                            <Button onClick={() => {handleEquipmentDelete(equipment.id)}} color="error">
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={equipmentsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

EquipmentListTable.propTypes = {
  equipments: PropTypes.array.isRequired,
  equipmentsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
