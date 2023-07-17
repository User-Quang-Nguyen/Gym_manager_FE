import React, { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Link,
  Stack,
  SvgIcon,
  TabProps,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import staffApi from "src/api/staff";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { paths } from "src/paths";
import { EmployeeBasicDetails } from "src/sections/employee/employee-basic-details";
import { EmployeeDataManagement } from "src/sections/employee/employee-data-management";
import { getInitials } from "src/utils/get-initials";

const useStaff = () => {
  const route = useRouter();
  const isMounted = useMounted();
  const [staff, setStaff] = useState(null);

  const getStaff = useCallback(async () => {
    try {
      const staffId = route.query.staffId;
      const response = await staffApi.getStaffById(staffId);
      console.log(response);
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
  [];

  return staff;
};

const Page = () => {
  const [currentTab, setCurrentTab] = useState("details");
  const staff = useStaff();

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  if (!staff) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Staff Details</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
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
                <Button
                  color="inherit"
                  component={NextLink}
                  href={paths.staff.edit(staff.id)}
                  endIcon={
                    <SvgIcon>
                      <Edit02Icon />
                    </SvgIcon>
                  }
                >
                  Edit
                </Button>
              </Stack>
            </Stack>
            <EmployeeBasicDetails
              gender={staff.gender}
              birthday={staff.birth}
              email={staff.gmail}
              phone={staff.phone}
              role={staff.role_name}
            />
            <EmployeeDataManagement id={staff.id} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
