import React from "react";
import Container from "@mui/material/Container";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DenseTable({ history, rows, onDelete }) {
  return (
    <Container sx={{ margin: '0 auto', display: 'flex', padding: 0 }}>
      <TableContainer sx={{ minWidth: 300, marginTop: '20px', marginBottom:'70px' }}>
        <Table size="small">
          <TableBody>
            {rows && (rows.map((row) => (
              <TableRow key={row.id} >
                <TableCell
                  sx={{ fontSize: 18 }}
                  align="left">
                  {row.description}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 18 }}
                  align="right">
                  {"R$ " + row.value.toFixed(2)}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 18, width: '20px' }}
                  align="right">
                  <ModeEditIcon
                    color="success"
                    onClick={() => history.push({ pathname: "/despesa", state: { detail: row } })} />
                </TableCell>
                <TableCell
                  sx={{ fontSize: 18, width: '20px' }}
                  align="right">
                  <DeleteIcon
                    color="error"
                    onClick={() => onDelete(row)} />
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
