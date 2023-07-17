import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
  CardActions,
} from "@mui/material";
import { paths } from "src/paths";
import packagesApi from "src/api/packages";

const initialValues = {
  description: "",
  name: "",
  price: 0,
  submit: null,
};

const validationSchema = Yup.object({
  description: Yup.string().max(5000),
  name: Yup.string().max(255).required(),
  price: Yup.number().min(0).required(),
});

export const PackageCreateForm = (props) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        packagesApi.createPackage(formik.values);
        toast.success("Package created");
        router.push(paths.packages.index);
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
    <form onSubmit={formik.handleSubmit} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6">Package details</Typography>
            </Grid>
            <Grid xs={12} md={8}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Package Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  error={!!(formik.touched.price && formik.errors.price)}
                  fullWidth
                  label="price"
                  name="price"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.price}
                />
                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Stack alignItems="center" direction="row" justifyContent="flex-end" spacing={1}>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </form>
  );
};
