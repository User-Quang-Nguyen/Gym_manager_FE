import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography } from '@mui/material';
import packagesApi from 'src/api/packages';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { paths } from 'src/paths';
import { PackageListSearch } from 'src/sections/package/package-list-search';
import { PackageListTable } from 'src/sections/package/package-list-table';
import { useAuth } from 'src/hooks/use-auth';

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

const usePackages = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    packages: [],
    packagesCount: 0,
  });

  const getPackages = useCallback(async () => {
    try {
      const response = await packagesApi.getPackages();

      if (isMounted()) {
        setState({
          packages: response.data,
          packagesCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getPackages();
  }, [search, getPackages]);

  const deletePackage = useCallback(async (packageId) => {
    try {
      if (isMounted()) {
        packagesApi.deletePackageById(packageId);
        setState((prevState) => {
          const updatedPackages = prevState.packages.filter((pkg) => pkg.id !== packageId);
          return {
            ...prevState,
            packages: updatedPackages,
            packagesCount: updatedPackages.length,
          };
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const updatePackage = useCallback(async (packageId, updatedData) => {
    try {
      if (isMounted()) {
        packagesApi.updatePackageById(packageId, updatedData);
        setState((prevState) => {
          const updatedPackages = prevState.packages.map((pkg) =>
            pkg.id === packageId ? { ...pkg, ...updatedData } : pkg
          );
          return {
            ...prevState,
            packages: updatedPackages,
          };
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  return {
    ...state,
    deletePackage,
    updatePackage,
  };
};

const PackageList = () => {
  const { search, updateSearch } = useSearch();
  const { packages, packagesCount, deletePackage, updatePackage } = usePackages(search);
  const role_name = useAuth().user.role_name;
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
        <title>Package List</title>
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
                <Typography variant="h4">Packages</Typography>
              </Stack>
              {role_name === "MANAGER" && (

                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={3}
                >
                  <Button
                    component={NextLink}
                    href={paths.packages.create}
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
              )}
            </Stack>
            <Card>
              <PackageListSearch onFiltersChange={handleFiltersChange} />
              <PackageListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                packages={packages}
                packagesCount={packagesCount}
                rowsPerPage={search.rowsPerPage}
                deletePackage={deletePackage}
                updatePackage={updatePackage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

PackageList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PackageList;
