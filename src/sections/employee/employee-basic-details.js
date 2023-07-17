import PropTypes from "prop-types";
import { Card, CardHeader, useMediaQuery } from "@mui/material";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";

export const EmployeeBasicDetails = (props) => {
  const { email, phone, gender, birthday, role, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";
  return (
    <Card {...other}>
      <CardHeader title="Staff Details" />
      <PropertyList>
        <PropertyListItem align={align} divider label="Gender" value={gender} />
        <PropertyListItem align={align} divider label="Birthday" value={birthday.slice(0, 10)} />
        <PropertyListItem align={align} divider label="Email" value={email} />
        <PropertyListItem align={align} divider label="Phone" value={phone} />
        <PropertyListItem align={align} divider label="Role" value={role} />
      </PropertyList>
    </Card>
  );
};

EmployeeBasicDetails.propTypes = {
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  role: PropTypes.number,
  gender: PropTypes.string,
};
