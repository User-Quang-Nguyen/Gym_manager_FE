import { Card, CardHeader, Divider, useMediaQuery } from "@mui/material";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";

export const UserMember = ({ register }) => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Card>
      <CardHeader title="Member" />
      <PropertyList>
        {register ? (
          <>
            <PropertyListItem align={align} divider label="Member Card" value={register[0].id} />
            <PropertyListItem
              align={align}
              divider
              label="Package"
              value={register[0].my_package_name}
            />
            <PropertyListItem
              align={align}
              divider
              label="Registration Date"
              value={register[0].created_at.slice(0, 10)}
            />
            <PropertyListItem align={align} divider label="Expiration Date" value="2023-08-01" />
            <PropertyListItem
              align={align}
              divider
              label="Trainer"
              value={register[0].trainer_name}
            />
            <PropertyListItem
              align={align}
              divider
              label="Registered by"
              value={register[0].register_by_name}
            />
          </>
        ) : (
          <>
            <PropertyListItem align={align} divider label="Member Card" value="" />
            <PropertyListItem align={align} divider label="Package" value="" />
            <PropertyListItem align={align} divider label="Registration Date" value="" />
            <PropertyListItem align={align} divider label="Expiration Date" value="" />
            <PropertyListItem align={align} divider label="Trainer" value="" />
            <PropertyListItem align={align} divider label="Registered by" value="" />
          </>
        )}
      </PropertyList>
      <Divider />
    </Card>
  );
};
