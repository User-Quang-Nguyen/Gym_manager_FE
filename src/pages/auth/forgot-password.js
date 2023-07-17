// import NextLink from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
// import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  // Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  // Link,
  // SvgIcon,
  TextField,
  // Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
// import { paths } from "src/paths";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
});

const Page = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  return (
    <Card elevation={16}>
      <CardHeader sx={{ pb: 0 }} title="Forgot password" />
      <CardContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            error={!!(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
          <Button fullWidth size="large" sx={{ mt: 2 }} type="submit" variant="contained">
            Send reset link
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
