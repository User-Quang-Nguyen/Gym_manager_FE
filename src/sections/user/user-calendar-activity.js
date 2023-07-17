const { parseISO, isSameMonth } = require("date-fns");
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  useMediaQuery,
  Stack,
  Typography,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const UserCalendar = (props) => {
  const { activity = [], ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const date = new Date();

  // const onChange = (selectedDate) => {
  //   // setDate(selectedDate);
  // };
  let markedDates = [];
  if(activity && activity.process)
    markedDates = activity.process.map((item) => item.createdAt.slice(0, 10));

  const tileContent = ({ date }) => {
    if (markedDates.includes(date.toISOString().slice(0, 10))) {
      return (
        <div
          style={{
            backgroundColor: "red",
            borderRadius: "50%",
            width: "80%",
            height: "80%",
            margin: "10%",
          }}
        />
      );
    }
  };

  let count = 0;

  if(activity && activity.process)
    activity.process.forEach((item) => {
      const createdAt = parseISO(item.createdAt);
      if (isSameMonth(createdAt, date)) {
        count++;
      }
    });

  return (
    <Card {...props}>
      <CardHeader title="Calendar" />
      <Stack container spacing={4}>
        <Box display="flex" justifyContent="center">
          <Calendar
            value={date}
            // onChange={onChange}
            tileContent={tileContent}
          />
        </Box>
        <Typography variant="body1" align="center">
          {`This month you have trained ${count} sessions. Let's keep trying !`}
        </Typography>
      </Stack>
    </Card>
  );
};
