import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { wait } from "src/utils/wait";
import roomsApi from "src/api/rooms";

const initialValues = (room) => {
  if (room)
    return {
      name: room.name || "",
      address: room.address || "",
      acreage: room.acreage || 0,
      submit: null,
    };
  return {
    name: "",
    address: "",
    acreage: 0,
    submit: null,
  };
};

export const RoomAddForm = (props) => {
  const { room, onClose, editRoom, createRoom, ...other } = props;

  const formik = useFormik({
    initialValues: initialValues(room),
    validationSchema: Yup.object({
      address: Yup.string().max(255),
      name: Yup.string().max(255).required("Name is required"),
      acreage: Yup.number().min(0).max(1000),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (room) {
          editRoom(room.id, values);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Employee updated");
        } else {
          createRoom(values);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Employee created");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card sx={{ width: "400px" }}>
        <CardHeader title="Add room" />
        <CardContent sx={{ pt: 0 }}>
          <Stack container spacing={3}>
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Room name"
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
            />
            <TextField
              error={!!(formik.touched.address && formik.errors.address)}
              fullWidth
              helperText={formik.touched.address && formik.errors.address}
              label="Address"
              name="address"
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <TextField
              error={!!(formik.touched.acreage && formik.errors.acreage)}
              fullWidth
              helperText={formik.touched.acreage && formik.errors.acreage}
              label="Acreage"
              name="acreage"
              value={formik.values.acreage}
              type="number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Stack>
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
            onClick={onClose}
          >
            Add
          </Button>
          <Button color="inherit" disabled={formik.isSubmitting} onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

RoomAddForm.propTypes = {
  room: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};
