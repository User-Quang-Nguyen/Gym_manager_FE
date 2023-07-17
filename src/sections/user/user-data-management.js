import { Box, Button, Card, CardContent, CardHeader, Typography, Stack } from "@mui/material";

export const UserDataManagement = (props) => (
  <Card {...props}>
    <CardHeader title="Data Management" />
    <CardContent sx={{ pt: 0 }}>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined">Reset password</Button>

        <Button color="error" variant="outlined">
          Delete Account
        </Button>
      </Stack>
      <Box sx={{ mt: 1 }}>
        <Typography color="text.secondary" variant="body2">
          Remove this user’s chart if he requested that, if not please be aware that what has been
          deleted can never brought back
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
