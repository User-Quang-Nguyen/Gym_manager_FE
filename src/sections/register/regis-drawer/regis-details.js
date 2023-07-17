import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import numeral from 'numeral';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import {
  Button,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

export const RegisDetails = (props) => {
  const { onApprove, onEdit, onReject, regis } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';

  const createdDate = parseISO(regis.created_at);
  const currentDate = new Date();
  createdDate.setDate(createdDate.getDate() + 7);
  const editable = createdDate >= currentDate;

  const totalAmount = numeral(regis.price).format(`0,0.00 $`);



  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">
            Details
          </Typography>
          {editable && (
          <Button
            color="inherit"
            onClick={onEdit}
            size="small"
            startIcon={(
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            )}
          >
            Edit
          </Button>
          )}
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Created By"
            value={regis.register_by_name}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Customer"
          >
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {regis.customer_name}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {regis.gmail}
            </Typography>
            
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Date"
            value={regis.created_at}
          />
           <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Coach"
            value={regis.trainer_name}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Package"
            value={regis.my_package_name}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Total Amount"
            value={totalAmount}
          />     
        </PropertyList>

      </Stack>
      
    </Stack>
  );
};

RegisDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  regis: PropTypes.object
};
