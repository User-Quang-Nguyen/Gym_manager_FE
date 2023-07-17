import NextLink from "next/link";
import Head from "next/head";
import { Box, Breadcrumbs, Container, Link, Stack, Typography } from "@mui/material";
import { BreadcrumbsSeparator } from "src/components/breadcrumbs-separator";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { paths } from "src/paths";
import { PackageCreateForm } from "src/sections/package/package-create-form";

const PackageCreate = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>Dashboard: Package Create | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">Create a new package</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.dashboard.admin}
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.packages.index}
                  variant="subtitle2"
                >
                  Packages
                </Link>
                <Typography color="text.secondary" variant="subtitle2">
                  Create
                </Typography>
              </Breadcrumbs>
            </Stack>
            <PackageCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

PackageCreate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PackageCreate;
