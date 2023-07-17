import PropTypes from "prop-types";
import { useCallback, useState, useEffect } from "react";
import { Button, Stack, TextField, Typography, Autocomplete, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMounted } from "src/hooks/use-mounted";
import employeesApi from "src/api/staff";
import packagesApi from "src/api/packages";
import { toast } from "react-hot-toast";
import { createResourceId } from "src/utils/create-resource-id";
import staffApi from "src/api/staff";

const useCoach = (coachId) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    coachSelect: [],
    coach: null,
  });

  const getEmployees = useCallback(async () => {
    try {
      const response = await staffApi.getStaff(
        {
          filters: {
            query: undefined,
            role: "TRAINER",
          },
          page: 0,
          rowsPerPage: 5,
          sortBy: "updatedAt",
          sortDir: "desc",
        }
      );
      console.log(coachId);

      if (isMounted()) {
        const coachSelect = response.data;
        console.log(coachSelect);
        const filteredCoach = coachSelect.find((item) => item.id === 8);
        console.log(filteredCoach);
        const result = { coachSelect: coachSelect, coach: filteredCoach };
        setState(result);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getEmployees();
  }, []);

  return state;
};

const usePackages = (packId) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    packSelect: [],
    pack: null,
  });

  const getPackages = useCallback(async () => {
    try {
      const response = await packagesApi.getPackages();

      if (isMounted()) {
        const packSelect = response.data;
        console.log(packSelect);
        const filteredPack = packSelect.find((item) => item.id === packId);
        console.log(filteredPack);
        const result = { packSelect: packSelect, pack: filteredPack };
        setState(result);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getPackages();
  }, []);

  return state;
};


export const RegisEdit = (props) => {
  const { onCancel, regis, setIsEditing, createRegis, updateRegis } = props;

  const { coachSelect, coach } = useCoach(regis.trainer_id);
  const { packSelect, pack } = usePackages(regis.my_package_id);

  const formik = useFormik({
    initialValues: {
      customer_name: regis.customer_name,
      gmail: regis.gmail,
      trainer: coach,
      pack: pack
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (regis.id !== null) {
          const updateRegister = {
            ...regis,
            trainer_id: values.trainer ? values.trainer.id : null,
            trainer_name: values.trainer ? `${values.trainer.first_name} ${values.trainer.last_name}` : null,
            my_package_id: values.pack.id,
            my_package_name: values.pack.name,
            price: values.pack.price
          };
          updateRegis(regis.id, updateRegister);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Register updated");
        } else {
          const newRegis = {
            ...regis,
            customer_name: values.customer_name,
            gmail: values.gmail,
            trainer_id: values.trainer ? values.trainer.id : null,
            trainer_name: values.trainer ? `${values.trainer.first_name} ${values.trainer.last_name}` : null,
            my_package_id: values.pack.id,
            my_package_name: values.pack.name,
            price: values.pack.price
          };
          createRegis(newRegis);
          await wait(500);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Register created");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
      setIsEditing(false);
    },
  });



  const onChangePackage = (value) => {
    if (value) document.getElementById("totalAmountField").value = value.price;
    return;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h6">{(regis.id && "Edits") || "New register"}</Typography>
        <Stack spacing={3}>
          <TextField
            disabled
            fullWidth
            label="Created By"
            name="register_by_name"
            value={regis.register_by_name}
          />
          <TextField disabled fullWidth label="Date" name="date" value={regis.created_at} />
          <TextField
            fullWidth
            label="Customer name"
            name="customer_name"
            value={formik.values.customer_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.customer?.name && formik.errors.customer?.name}
            helperText={formik.touched.customer?.name && formik.errors.customer?.name}
          />
          <TextField
            fullWidth
            label="Email"
            name="gmail"
            value={formik.values.gmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.customer?.email && formik.errors.customer?.email}
            helperText={formik.touched.customer?.email && formik.errors.customer?.email}
          />
          <Autocomplete
            id="coachSelect"
            fullWidth
            options={coachSelect}
            value={formik.values.trainer}
            autoHighlight
            onChange={(event, value) => formik.setFieldValue('trainer', value)}
            getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 }, borderRadius: "50%" }}
                {...props}
              >
                <img loading="lazy" width="40" src={option.avatar} alt="" />
                {`${option.first_name} ${option.last_name}`}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Coach" />}
          />
          <Autocomplete
            id="packSelect"
            fullWidth
            options={packSelect}
            value={formik.values.pack}
            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => { formik.setFieldValue('pack', value); onChangePackage(value) }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 }, borderRadius: "50%" }}
                {...props}
              >
                {option.name}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Package" />}
          />
          <TextField
            id="totalAmountField"
            fullWidth
            autoHighlight
            label="Total Amount"
            name="totalAmount"
            InputProps={{
              readOnly: true,
            }}
            defaultValue={regis.price}
          />
        </Stack>
        <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={2}>
          <Button color="primary" type="submit" size="small" variant="contained">
            Save changes
          </Button>
          <Button color="inherit" onClick={onCancel} size="small">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

RegisEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  regis: PropTypes.object,
  regis: PropTypes.object,
};
