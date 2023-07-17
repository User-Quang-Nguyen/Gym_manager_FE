import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { paths } from "src/paths";
import { wait } from "src/utils/wait";
import staffApi from "src/api/staff";
import { createResourceId } from "src/utils/create-resource-id";

const ROLE = [
  {
    label: "Manager",
    value: "MANAGER",
  },
  {
    label: "Customer Care",
    value: "CARING",
  },
  {
    label: "Trainer",
    value: "TRAINER",
  },
  {
    label: "Sale",
    value: "SALE",
  },
];

const initialValues = (staff) => {
  const today = new Date().toISOString().slice(0, 10);
  if (staff) {
    staff.birth = staff.birth.slice(0, 10);
    return {
      last_name: staff.last_name || "",
      first_name: staff.first_name || "",
      gender: staff.gender || "male",
      birth: staff.birth || today,
      gmail: staff.gmail || "",
      phone: staff.phone || "",
      role_name: staff.role_name || "",
      submit: null,
    };
  }

  return {
    first_name: "",
    last_name: "",
    gender: "male",
    birth: today,
    gmail: "",
    phone: "",
    role_name: "MANAGER",
    submit: null,
  };
};

export const EmployeeEditForm = (props) => {
  const { staff, onClose, ...other } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialValues(staff),
    validationSchema: Yup.object({
      gender: Yup.string(),
      birth: Yup.string(),
      gmail: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      first_name: Yup.string().max(255).required("Name is required"),
      last_name: Yup.string().max(255),
      phone: Yup.string().max(15),
      role_name: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (staff) {
          const updateStaff = {
            ...staff,
            ...values,
          };
          staffApi.updateStaffById(updateStaff);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Staff updated");
          router.push(paths.staff.details(staff.id));
        } else {
          const newStaff = {
            password: "1234567",
            role_id: 1,
            role_name: "MANAGER",
            ...values,
          };
          staffApi.createStaff(newStaff);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Staff created");
          onClose();
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
      <Card>
        <CardHeader title="Edit Staff" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.first_name && formik.errors.first_name)}
                fullWidth
                helperText={formik.touched.first_name && formik.errors.first_name}
                label="First name"
                name="first_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.first_name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.last_name && formik.errors.last_name)}
                fullWidth
                helperText={formik.touched.last_name && formik.errors.last_name}
                label="Last name"
                name="last_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.last_name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="gmail"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.gmail}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone number"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                select
                error={!!(formik.touched.gender && formik.errors.gender)}
                fullWidth
                helperText={formik.touched.gender && formik.errors.gender}
                label="Gender"
                name="gender"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.gender}
              >
                <MenuItem key={"male"} value={"male"}>
                  male
                </MenuItem>
                <MenuItem key={"female"} value={"female"}>
                  female
                </MenuItem>
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.birth && formik.errors.birth)}
                fullWidth
                helperText={formik.touched.birth && formik.errors.birth}
                label="Birthday"
                name="birthday"
                type="date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.birth}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                select
                id="role"
                name="role"
                label="Role"
                value={formik.values.role}
                // onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
                defaultValue={formik.initialValues.role_name}
              >
                {ROLE.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
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
          <Button disabled={formik.isSubmitting} type="submit" variant="contained">
            Save Changes
          </Button>
          {staff ? (
            <Button
              color="inherit"
              component={NextLink}
              disabled={formik.isSubmitting}
              href={paths.staff.details(staff.id)}
            >
              Cancel
            </Button>
          ) : (
            <Button color="inherit" disabled={formik.isSubmitting} onClick={onClose}>
              Cancel
            </Button>
          )}
        </Stack>
      </Card>
    </form>
  );
};

EmployeeEditForm.propTypes = {
  staff: PropTypes.object,
  onClose: PropTypes.func,
};
