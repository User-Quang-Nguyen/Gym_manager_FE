import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import { Box, Drawer, IconButton, Stack, SvgIcon, Typography, useMediaQuery } from "@mui/material";
import { RegisDetails } from "./regis-details";
import { RegisEdit } from "./regis-edit";
import { useAuth } from "src/hooks/use-auth";

const valueRegis = (regis, regissCount) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useAuth().user;
  if (regis) return regis;
  else
    return {
      id: null,
      created_at: new Date().toISOString(),
      register_by_name: `${user.first_name} ${user.last_name}`,
      register_by_id: user.id,
    };
};

export const RegisDrawer = (props) => {
  const { container, onClose, open, edit, regis, createRegis, updateRegis, regisCount } = props;
  const [isEditing, setIsEditing] = useState(edit);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleEditOpen = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  let content = null;
  const register = valueRegis(regis,regisCount);

  content = (
    <div>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <IconButton
          color="inherit"
          onClick={() => {
            setIsEditing(false);
            onClose();
          }}
        >
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <Box
        sx={{
          px: 3,
          py: 4,
        }}
      >
        {!isEditing ? (
          <RegisDetails
            onApprove={onClose}
            onEdit={handleEditOpen}
            onReject={onClose}
            regis={register}
          />
        ) : (
          <RegisEdit
            onCancel={handleEditCancel}
            regis={register}
            createRegis={createRegis}
            updateRegis={updateRegis}
          />
        )}
      </Box>
    </div>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            position: "relative",
            width: 500,
          },
        }}
        SlideProps={{ container }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: "none",
          position: "absolute",
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: "100%",
          width: 400,
          pointerEvents: "auto",
          position: "absolute",
        },
      }}
      SlideProps={{ container }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

RegisDrawer.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  regis: PropTypes.object,
};
