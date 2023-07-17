import NextLink from "next/link";
import PropTypes from "prop-types";
import { Button, Card, CardContent, CardMedia, Link, Stack, Typography } from "@mui/material";
import { paths } from "src/paths";

export const RoomCard = (props) => {
  const { room, onClickEdit, onClickDelete } = props;

  return (
    <Card variant="outlined">
      <CardMedia
        image={"/assets/rooms/room-1.png"}
        component={NextLink}
        href={paths.gyms.details(room.id || 1)}
        sx={{ height: 180 }}
      />
      <CardContent>
        <Link
          color="text.primary"
          underline="none"
          variant="subtitle1"
          component={NextLink}
          href={paths.gyms.details(room.id || 1)}
        >
          {room.name}
        </Link>
        <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
          {room.address}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
          {`Acreage: ${room.acreage} m²`}
        </Typography>
      </CardContent>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 3 }}
      >
        <Button
          variant="contained"
          onClick={() => {
            onClickEdit(room);
          }}
        >
          Edit
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            onClickDelete(room.id);
          }}
        >
          Delete
        </Button>
      </Stack>
    </Card>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};
