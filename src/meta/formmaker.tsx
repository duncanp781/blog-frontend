import React, { useState, useEffect } from "react";
import { Form } from "../styled/form.styled";
import { PageTitle } from "../styled/pageTitle.styled";
import { TextField, Button } from "@mui/material";
import _ from "lodash";

// If include is not stated, we assume it is included.
interface FormEntry {
  name: string;
  type: string;
  label: string;
  required: boolean;
  minRows?: number;
  maxRows?: number;
  value?: string | null;
  include?: boolean;
}

type Props = {
  entries: FormEntry[];
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children?: React.ReactNode;
};

type EntriesObject = { [key: string]: string };

function FormMaker({ entries, title, onSubmit, children }: Props) {
  const [values, setValues] = React.useState<EntriesObject>({});
  useEffect(() => {
    setValues((prevValues: EntriesObject) =>
      entries.reduce((acc, entry) => {
        acc[entry.name] = entry.value || "";
        return acc;
      }, {} as EntriesObject)
    );
  }, [entries]);

  const reset = () => {
    setValues((prevValues: EntriesObject) =>
      entries.reduce((acc, entry) => {
        acc[entry.name] = "";
        return acc;
      }, {} as EntriesObject)
    );
  };
  return (
    <>
      <PageTitle>{title}</PageTitle>
      {/* Always reset form entries after submission. */}
      <Form
        onSubmit={(e) => {
          onSubmit(e);
          reset();
        }}
        action=""
      >
        {entries.map(
          (entry) =>
            (entry.include === undefined || entry.include) && (
              <TextField
                key={entry.name}
                label={entry.label}
                name={entry.name}
                required={entry.required}
                type={entry.type}
                multiline={entry.type === "textarea"}
                minRows={entry.minRows}
                maxRows={entry.maxRows}
                value={values[entry.name] || ""}
                onChange={(e) => {
                  setValues((prevValues) => ({
                    ...prevValues,
                    [entry.name]: e.target.value,
                  }));
                }}
              />
            )
        )}
        {children}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default FormMaker;
