import PropTypes from "prop-types";
import { Card, CardHeader, useMediaQuery } from "@mui/material";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";

export const UserBasicDetails = (props) => {
  const { birthday, email, phone, gender, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Card {...other}>
      <CardHeader title="Customer Details" />
      <PropertyList>
        <PropertyListItem align={align} divider label="Gender" value={gender} />
        <PropertyListItem align={align} divider label="Birthday" value={birthday} />
        <PropertyListItem align={align} divider label="Email" value={email} />
        <PropertyListItem align={align} divider label="Phone" value={phone} />
      </PropertyList>
    </Card>
  );
};

UserBasicDetails.propTypes = {
  gender: PropTypes.string,
  birthday: PropTypes.string,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
};
