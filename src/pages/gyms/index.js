import Head from "next/head";
import React, { useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Dialog,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useMounted } from "src/hooks/use-mounted";

import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import { usePageView } from "src/hooks/use-page-view";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { RoomCard } from "src/sections/gym/room-card";
import { RoomAddForm } from "src/sections/gym/room-add-form";
import roomsApi from "src/api/rooms";

const useRooms = () => {
  const isMounted = useMounted();
  const [rooms, setRooms] = React.useState([]);

  const getRooms = useCallback(async () => {
    try {
      const response = await roomsApi.getRooms();
      console.log(response);
      if (isMounted()) {
        setRooms(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const createRoom = useCallback(
    async (newRoom) => {
      try {
        const response = await roomsApi.createRoom(newRoom);
        if (isMounted()) {
          setRooms([...rooms, newRoom]);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isMounted, rooms]
  );

  const editRoom = useCallback(
    async (roomId, updatedRoom) => {
      try {
        const response = await roomsApi.updateRoomById(roomId, updatedRoom);
        if (isMounted()) {
          const updatedRooms = rooms.map((room) => (room.id === roomId ? response : room));
          setRooms(updatedRooms);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isMounted, rooms]
  );

  const deleteRoom = useCallback(
    async (roomId) => {
      try {
        await roomsApi.deleteRoomById(roomId);
        if (isMounted()) {
          const updatedRooms = rooms.filter((room) => room.id !== roomId);
          setRooms(updatedRooms);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isMounted, rooms]
  );

  useEffect(() => {
    getRooms();
  }, []);

  return { rooms, createRoom, editRoom, deleteRoom };
};

const Page = () => {
  const { rooms, createRoom, editRoom, deleteRoom } = useRooms();
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  const onCloseModel = () => {
    setOpenModal(false);
  };

  const onClickEdit = (room) => {
    setSelectedRoom(room);
    setOpenModal(true);
  };

  const onClickDelete = (id) => {
    deleteRoom(id);
    setOpenModal(false);
  };

  usePageView();

  return (
    <>
      <Head>
        <title>Dashboard: Gym Room</title>
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
                <Typography variant="h4">Gyms</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <Upload01Icon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <Download01Icon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => {
                    setSelectedRoom(null);
                    setOpenModal(true);
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Stack>

            <Grid
              container
              spacing={{
                xs: 3,
                lg: 4,
              }}
            >
              {rooms.map((room,index) => (
                <Grid key={index} xs={12} md={4}>
                  <RoomCard room={room} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Dialog open={openModal} onClose={onCloseModel}>
            <RoomAddForm
              room={selectedRoom}
              onClose={onCloseModel}
              editRoom={editRoom}
              createRoom={createRoom}
            ></RoomAddForm>
          </Dialog>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
