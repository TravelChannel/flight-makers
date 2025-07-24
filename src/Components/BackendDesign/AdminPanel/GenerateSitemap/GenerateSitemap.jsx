import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GenerateSiteMap } from "../../../../API/BackendAPI/AmaBackend/GenerateSiteMap";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Container,
  Typography,
  Box,
} from "@mui/material";

const GenerateSitemap = ({ onSubmit }) => {
  const today = new Date().toISOString().split('T')[0];
  const baseUrl = "https://www.flightmakers.com/";
  const initialValues = {
    slug: "",
    priority: 0.85,
    changefreq: "weekly",
    lastMod: today,
    baseUrl: baseUrl,
  };

  const validationSchema = Yup.object({
    slug: Yup.string()
      .matches(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphenated")
      .required("Slug is required"),
    priority: Yup.number().required("Priority is required"),
    changefreq: Yup.string()
      .oneOf(["daily", "weekly", "monthly"])
      .required("Change frequency is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log("Form Submitted:", values);
      const response = await GenerateSiteMap(values);
      console.log("Sitemap Response:", response);
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 4, p: 4, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        color="primary"
      >
        Add Sitemap Route
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Field name="slug">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  label="Slug"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={meta.touched && !!meta.error}
                  helperText={<ErrorMessage name="slug" />}
                  placeholder="e.g. cheap-flights-from-newyork-to-london"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "25px" },
                    mb: 3,
                  }}
                />
              )}
            </Field>

            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Field name="priority">
                {({ field, meta }) => (
                  <Select
                    {...field}
                    label="Priority"
                    variant="outlined"
                    error={meta.touched && !!meta.error}
                    sx={{ borderRadius: "25px" }}
                  >
                    <MenuItem value="1.0">1.0 (highest)</MenuItem>
                    <MenuItem value="0.85">0.85</MenuItem>
                    <MenuItem value="0.5">0.5</MenuItem>
                    <MenuItem value="0.3">0.3</MenuItem>
                  </Select>
                )}
              </Field>
              <ErrorMessage
                name="priority"
                component="div"
                className="Mui-error"
              />
            </FormControl>

            <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
              <InputLabel>Change Frequency</InputLabel>
              <Field name="changefreq">
                {({ field, meta }) => (
                  <Select
                    {...field}
                    label="Change Frequency"
                    variant="outlined"
                    error={meta.touched && !!meta.error}
                    sx={{ borderRadius: "25px" }}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                )}
              </Field>
              <ErrorMessage
                name="changefreq"
                component="div"
                className="Mui-error"
              />
            </FormControl>

            <Field type="hidden" name="lastMod" />

            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  borderRadius: "25px",
                  px: 6,
                  py: 1.5,
                  fontSize: "1.1rem",
                }}
              >
                {isSubmitting ? "Submitting..." : "Add Route"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default GenerateSitemap;
