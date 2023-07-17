import React, { useCallback, useEffect, useState, useMemo, useRef } from "react";
import Head from "next/head";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { Box, Button, Divider, Stack, SvgIcon, Typography } from "@mui/material";
import registersApi from "src/api/registers";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { RegisDrawer } from "src/sections/register/regis-drawer";
import { RegisListContainer } from "src/sections/register/regis-list-container";
import { RegisListSearch } from "src/sections/register/regis-list-search";
import { RegisListTable } from "src/sections/register/regis-list-table";

const useSearch = () => {
  const [search, setSearch] = React.useState({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "createdAt",
    sortDir: "desc",
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useRegiss = (search) => {
  const isMounted = useMounted();
  const [state, setState] = React.useState({
    regiss: [],
    regissCount: 0,
  });

  const getRegiss = useCallback(async () => {
    try {
      const response = await registersApi.getRegisters(search);
      console.log(response);
      if (isMounted()) {
        setState({
          regiss: response.data,
          regissCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  const createRegis = useCallback(
    async (regissData) => {
      try {
        const response = await registersApi.createRegister(regissData);
        console.log(response);
        if (isMounted()) {
          setState((prevState) => ({
            ...prevState,
            regiss: [regissData, ...prevState.regiss],
            regissCount: prevState.regissCount + 1,
          }));
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isMounted]
  );

  const updateRegis = useCallback(
    async (regissId, regissData) => {
      try {
        // Make an API call to update an existing regiss
        const response = await registersApi.updateRegisterById(regissId, regissData);
        console.log(response);
        if (isMounted()) {
          setState((prevState) => {
            const updatedRegiss = prevState.regiss.map((regiss) =>
              regiss.id === regissId ? { ...regiss, ...regissData } : regiss
            );
            return {
              ...prevState,
              regiss: updatedRegiss,
            };
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isMounted]
  );

  useEffect(() => {
    getRegiss();
  }, [search, createRegis, updateRegis]);

  return {
    ...state,
    createRegis,
    updateRegis,
  };
};

const Page = () => {
  const rootRef = useRef(null);
  const { search, updateSearch } = useSearch();
  const { regiss, regissCount, createRegis, updateRegis } = useRegiss(search);
  const [drawer, setDrawer] = useState({
    isOpen: false,
    isEdit: false,
    data: undefined,
  });

  const currentRegis = useMemo(() => {
    if (!drawer.data) {
      return undefined;
    }

    return regiss.find((regis) => regis.id === drawer.data);
  }, [drawer, regiss]);

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
  const handleSortChange = useCallback(
    (sortDir) => {
      updateSearch((prevState) => ({
        ...prevState,
        sortDir,
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

  const handleClickAdd = () => {
    setDrawer({
      isOpen: true,
      isEdit: true,
      data: undefined,
    });
  };

  const handleRegisOpen = useCallback(
    (regisId) => {
      // Close drawer if is the same regis

      if (drawer.isOpen && drawer.data === regisId) {
        setDrawer({
          isOpen: false,
          data: undefined,
        });
        return;
      } else if (regisId) {
        setDrawer({
          isOpen: true,
          data: regisId,
        });
        return;
      }
      setDrawer({
        isOpen: true,
        isEdit: true,
        data: undefined,
      });
    },
    [drawer]
  );

  const handleRegisClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: undefined,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Register List</title>
      </Head>
      <Divider />
      <Box
        component="main"
        ref={rootRef}
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <RegisListContainer open={drawer.isOpen}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">Registers</Typography>
                </div>
                <div>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={handleClickAdd}
                  >
                    Add
                  </Button>
                </div>
              </Stack>
            </Box>
            <Divider />
            <RegisListSearch
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              sortBy={search.sortBy}
              sortDir={search.sortDir}
            />
            <Divider />
            <RegisListTable
              onRegisSelect={handleRegisOpen}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              regiss={regiss}
              regissCount={regissCount}
              page={search.page}
              rowsPerPage={search.rowsPerPage}
            />
          </RegisListContainer>
          <RegisDrawer
            container={rootRef.current}
            onClose={handleRegisClose}
            open={drawer.isOpen}
            edit={drawer.isEdit}
            regis={currentRegis}
            regissCount={regissCount}
            createRegis={createRegis}
            updateRegis={updateRegis}
          />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
