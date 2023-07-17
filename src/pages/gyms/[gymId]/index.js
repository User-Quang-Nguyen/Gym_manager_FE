import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "src/components/breadcrumbs-separator";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { paths } from "src/paths";
import { EquipmentListSearch } from "src/sections/equipment/equip-list-search";
import { EquipmentListTable } from "src/sections/equipment/equip-list-table";
import roomsApi from "src/api/rooms";

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useEquipments = (search) => {
  const route = useRouter();
  const isMounted = useMounted();
  const [state, setState] = useState({
    equipments: [],
    equipmentsCount: 0,
  });

  const getEquipments = useCallback(async () => {
    try {
      const { gymId } = route.query;
      const response = await roomsApi.getRoomById(gymId);
      console.log(response);
      if (isMounted()) {
        setState((prevState) => ({
          ...prevState,
          equipments: response,
          equipmentsCount: response.length,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }, [route.query, isMounted]);

  useEffect(() => {
    getEquipments();
  }, [search, getEquipments]);

  const deleteEquip = useCallback(async (equipId) => {
    try {
      if (isMounted()) {
        setState((prevState) => {
          const updatedEquipments = prevState.equipments.filter((equip) => equip.id !== equipId);
          return {
            ...prevState,
            equipments: updatedEquipments,
            equipmentsCount: updatedEquipments.length,
          };
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const updateEquip = useCallback(async (equipId, updatedData) => {
    try {
      console.log(updatedData);
      if (isMounted()) {
        setState((prevState) => {
          const updatedEquipments = prevState.equipments.map((equip) =>
            equip.id === equipId ? { ...equip, ...updatedData } : equip
          );
          return {
            ...prevState,
            equipments: updatedEquipments,
          };
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  return {
    equipments: state.equipments,
    equipmentsCount: state.equipmentsCount,
    deleteEquip,
    updateEquip,
  };
};


const EquipmentList = () => {
  const { gymId } = useRouter().query;
  const { search, updateSearch } = useSearch();
  const { equipments, equipmentsCount , deleteEquip, updateEquip } = useEquipments(search);
  usePageView();

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [updateSearch]
  );

  const handlePageChange = useCallback(
    (event, page) => {
      updateSearch((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [updateSearch]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      updateSearch((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    [updateSearch]
  );

  return (
    <>
      <Head>
        <title>Dashboard: Equipment List | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Equipments</Typography>
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
                    href={paths.gyms.index}
                    variant="subtitle2"
                  >
                    Gyms
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    Equipment
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  component={NextLink}
                  href={paths.gyms.create(gymId)}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              <EquipmentListSearch onFiltersChange={handleFiltersChange} />
              <EquipmentListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                equipments={equipments}
                equipmentsCount={equipmentsCount}
                deleteEquip = {deleteEquip}
                updateEquip = {updateEquip}
                rowsPerPage={search.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

EquipmentList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EquipmentList;
