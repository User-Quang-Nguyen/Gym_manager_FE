import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {
  Box,
  IconButton,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
  Typography
} from '@mui/material';
import { useAuth } from '../../hooks/use-auth';

export const AccountPopover = (props) => {
  const { user, anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const auth = useAuth();
  const handleLogout = async () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
      return;
    };
  
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 200 } }}
      {...other}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">
         {user ? `${user.first_name} ${user.last_name}` : ' '}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user ? user.email : ' '}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton
          component={NextLink}
          href={'/account'}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <AccountCircleOutlinedIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant="body1">
                Profile
              </Typography>
            )}
          />
        </ListItemButton>
        <ListItemButton
          component={NextLink}
          href={'/settings'}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <SettingsOutlinedIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant="body1">
                Settings
              </Typography>
            )}
          />
        </ListItemButton>
        <Divider sx={{ my: '0 !important' }} />
        <ListItemButton

          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <LogoutOutlinedIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            color="inherit"
            primary={(
              <Typography variant="body1">
                Logout
              </Typography>
            )}
          />
        </ListItemButton>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
