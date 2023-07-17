import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { paths } from "src/paths";
import { wait } from "src/utils/wait";
import customersApi from "src/api/customers";

const initialValues = (customer) => {
  const today = new Date().toISOString().slice(0, 10);
  if (customer) {
    if (customer.birth) {
      customer.birth = customer.birth.slice(0, 10);
    }
    return {
      first_name: customer.first_name || "",
      last_name: customer.last_name || "",
      gender: customer.gender || "male",
      birth: customer.birth || today,
      gmail: customer.gmail || "",
      phone: customer.phone || "",
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
    submit: null,
  };
};

export const UserEditForm = (props) => {
  const { customer, onClose, ...other } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialValues(customer),
    validationSchema: Yup.object({
      id: props.id,
      first_name: Yup.string().max(255).required("First name is required"),
      last_name: Yup.string().max(255).required("Last name is required"),
      gender: Yup.string(),
      birth: Yup.string(),
      gmail: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      phone: Yup.string().max(15),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (customer) {
          const updatedCustomer = {
            ...customer,
            ...values,
          };
          customersApi.updateCustomerById(updatedCustomer);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Customer updated");
          router.push(paths.customers.details(customer.id));
        } else {
          const newCustomer = {
            password: "1234567",
            role_id: 2,
            role_name: "CUSTOMER",
            ...values,
          };
          customersApi.createCustomer(newCustomer);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Customer created");
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
        <CardHeader title="Edit Customer" />
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
                name="birth"
                type="date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.birth}
              />
            </Grid>

            <Grid xs={12} md={6}></Grid>
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
          <Button
            // onClick={formik.onSubmit}
            // disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Save Changes
          </Button>
          {customer ? (
            <Button
              color="inherit"
              component={NextLink}
              disabled={formik.isSubmitting}
              href={paths.customers.details(customer.id)}
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

UserEditForm.propTypes = {
  customer: PropTypes.object,
  onClose: PropTypes.func,
};
