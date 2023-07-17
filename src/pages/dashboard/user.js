import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import usersApi from "src/api/customers";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { UserCalendar } from "src/sections/user/user-calendar-activity";
import { UserMember } from "src/sections/user/user-member";
// import { UserLogs } from "src/sections/user/user-logs";
import { PricingPlan } from "src/sections/overview/pricing-plan";
import { useAuth } from "src/hooks/use-auth";

const useLogs = (userId) => {
  const isMounted = useMounted();
  const [logs, setLogs] = useState([]);

  const getLogs = useCallback(async () => {
    try {
      const response = await usersApi.getProcessById(1);
      console.log(response);
      if (isMounted()) {
        setLogs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [userId, isMounted]);

  useEffect(
    () => {
      getLogs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return logs;
};




const Page = () => {
  const user = useAuth().user;
  const logs = useLogs(user ? user.id : 0);

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: User Details | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid xs={12} md={4}>
              <PricingPlan
                cta="Register"
                currency="$"
                description="Get access to our basic facilities and equipment to start your fitness journey."
                features={[
                  "Access to basic gym equipment",
                  "Locker room access",
                  "Personal training guidance",
                ]}
                name="Basic"
                price="50"
                sx={{
                  height: "100%",
                  maxWidth: 460,
                  mx: "auto",
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <PricingPlan
                cta="Register"
                currency="$"
                description="Upgrade your experience with additional amenities and services for an enhanced workout."
                features={[
                  "All features in Basic",
                  "Access to advanced gym equipment",
                  "Group fitness classes",
                  "Nutritional guidance",
                ]}
                name="Advanced"
                popular
                price="80"
                sx={{
                  height: "100%",
                  maxWidth: 460,
                  mx: "auto",
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <PricingPlan
                cta="Register"
                currency="$"
                description="Get the ultimate gym experience with premium perks and exclusive access to advanced features."
                features={[
                  "All features in Advanced",
                  "VIP locker room access",
                  "One-on-one personal training sessions",
                  "Specialized fitness programs",
                  "Priority booking for classes and facilities",
                ]}
                name="Premium"
                price="100"
                sx={{
                  height: "100%",
                  maxWidth: 460,
                  mx: "auto",
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid xs={12} md={7.5}>
              <UserCalendar activity={logs} />
            </Grid>
            <Grid xs={12} md={4.5} mt={4}>
              <UserMember />
            </Grid>

            <Grid xs={12}>
              {/* <UserLogs logs={logs} /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
