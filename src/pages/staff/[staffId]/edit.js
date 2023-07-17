import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { Avatar, Box, Chip, Container, Link, Stack, SvgIcon, Typography } from "@mui/material";
import staffApi from "src/api/staff";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { paths } from "src/paths";
import { EmployeeEditForm } from "src/sections/employee/employee-edit-form";
import { getInitials } from "src/utils/get-initials";

const useStaff = () => {
  const route = useRouter();
  const isMounted = useMounted();
  const [staff, setStaff] = useState(null);

  const getStaff = useCallback(async () => {
    try {
      const staffId = route.query.staffId;
      const response = await staffApi.getStaffById(staffId);

      if (isMounted()) {
        setStaff(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getStaff();
  }, []);

  return staff;
};

const Page = () => {
  const staff = useStaff();

  usePageView();

  if (!staff) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Staff Edit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.staff.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Staff</Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Avatar
                    // src={staff.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  >
                    {getInitials(`${staff.first_name} ${staff.last_name}`)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {staff.first_name} {staff.last_name}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <EmployeeEditForm staff={staff} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
