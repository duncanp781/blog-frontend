import React from "react";
import { Form } from "../styled/form.styled";
import { PageTitle } from "../styled/pageTitle.styled";
import { TextField, Button } from "@mui/material";

interface FormEntry {
  name: string;
  type: string;
  label: string;
  required: boolean;
  minRows?: number;
  maxRows?: number;

}

type Props = {
  entries: FormEntry[];
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children?: React.ReactNode;
};

function FormMaker({ entries, title, onSubmit, children }: Props) {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <Form onSubmit={onSubmit} action="">
        {entries.map((entry) => (
          <TextField
            key={entry.name}
            label={entry.label}
            name={entry.name}
            required={entry.required}
            type={entry.type}
            multiline={entry.type === "textarea"}
            minRows={entry.minRows}
            maxRows={entry.maxRows}
          />
        ))}
        {children}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default FormMaker;
