import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Description } from '@material-ui/icons';
import Respostas from '../../models/resposta';

import './style.scss';

interface Props {
  respostas: Respostas[];
}

const Modal = (props: Props) => {
  const { respostas } = props;
  const [abrirModal, setAbrirModal] = useState(false);

  const handleClickOpen = () => {
    setAbrirModal(true);
  };
  const handleClose = () => {
    setAbrirModal(false);
  };
  return (
    <Box display="block">
      <IconButton onClick={handleClickOpen}>
        <Description />
      </IconButton>
      <Dialog className={'dialogoContainer'} onClose={handleClose} open={abrirModal}>
        <DialogTitle>
          <Typography className={'tituloModal'}>Respostas</Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell className={'tableCellHeadFirst'}>Texto da resposta</TableCell>
                  <TableCell className={'tableCellHead'}>Correta</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {respostas.map((resposta: any) => (
                  <TableRow key={resposta.ID}>
                    <TableCell align="left">
                      {resposta.Texto || 'Vazio'}
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={resposta.Correta}
                        name="checkedB"
                        color="primary"
                        disabled
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Modal;
