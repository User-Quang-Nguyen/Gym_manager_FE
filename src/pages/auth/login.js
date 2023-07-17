// import { useCallback, useState } from "react";
// import Head from "next/head";
// import NextLink from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
// import { wait } from "src/utils/wait";
// import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  // SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
// import { paths } from "src/paths";

const initialValues = {
  gmail: "admin@gmail.com",
  password: "admin123",
  submit: null,
};

// Validate credentials
const validationSchema = Yup.object({
  gmail: Yup.string().email("Must be a valid gmail").max(255).required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
});

const Page = () => {
  const router = useRouter();
  const auth = useAuth();

  // Routing
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.gmail, values.password);
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Card elevation={16}>
      {/* Form's header */}
      <CardHeader
        subheader={
          <Typography color="text.secondary" variant="body2">
            Don`&lsquot have an account yet?
            <Link href="/auth/register" underline="hover" variant="subtitle2">
              {" "}
              Register
            </Link>
          </Typography>
        }
        sx={{ pb: 0 }}
        title="Log in"
      />

      {/* Form's content */}
      <CardContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              error={!!(formik.touched.gmail && formik.errors.gmail)}
              fullWidth
              helperText={formik.touched.gmail && formik.errors.gmail}
              label="Email Address"
              name="gmail"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="gmail"
              value={formik.values.gmail}
            />
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
            />
          </Stack>
          {formik.errors.submit && (
            <Typography color="error" sx={{ mt: 3 }} variant="body2">
              {formik.errors.submit}
            </Typography>
          )}
          <Button fullWidth size="large" sx={{ mt: 2 }} type="submit" variant="contained">
            Log In
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Link href="/auth/forgot-password" underline="hover" variant="subtitle2">
              Forgot password?
            </Link>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
