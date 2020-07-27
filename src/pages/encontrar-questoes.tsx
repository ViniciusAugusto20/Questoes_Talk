import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import ArquivoDeQuestoes from '../mock/QuestoesTalk.json';
import ModalRespostas from '../components/modal';
import Questao from '../models/questao';
import { ptBR } from '@material-ui/core/locale';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../assets/images/logo.png';

const EncontrarQuestoes = () => {
  const [consultarQuestoes, setConsultarQuestoes] = useState('');
  const [questoesEncontradas, setQuestoesEncontradas] = useState(
    ArquivoDeQuestoes.questoes,
  );
  const [arquivoDeQuestoes] = useState<Questao[]>(ArquivoDeQuestoes.questoes);

  // Parte responsável pelo controle da tabela
  const [page, setPage] = React.useState(0);
  const emptyRows = 8 - Math.min(8, arquivoDeQuestoes.length - page * 8);
  const theme = createMuiTheme({}, ptBR);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  // Função de busca e listagem das questões
  const buscarQuestoes = () => {
    let dadosFiltrados0 = arquivoDeQuestoes.filter((questao) =>
      questao.Respostas[0]?.Texto.toLowerCase().includes(
        consultarQuestoes.toLowerCase(),
      ),
    );
    let dadosFiltrados1 = arquivoDeQuestoes.filter((questao) =>
      questao.Respostas[1]?.Texto.toLowerCase().includes(
        consultarQuestoes.toLowerCase(),
      ),
    );
    let dadosFiltrados2 = arquivoDeQuestoes.filter((questao) =>
      questao.Respostas[2]?.Texto.toLowerCase().includes(
        consultarQuestoes.toLowerCase(),
      ),
    );
    let dadosFiltrados3 = arquivoDeQuestoes.filter((questao) =>
      questao.Respostas[3]?.Texto.toLowerCase().includes(
        consultarQuestoes.toLowerCase(),
      ),
    );
    let dadosFiltrados4 = arquivoDeQuestoes.filter((questao) =>
      questao.Respostas[4]?.Texto.toLowerCase().includes(
        consultarQuestoes.toLowerCase(),
      ),
    );
    let dadosQuestoesEncontradas = dadosFiltrados0.concat(
      dadosFiltrados1,
      dadosFiltrados2,
      dadosFiltrados3,
      dadosFiltrados4,
    );

    //Remoção de itens duplicados
    let dadosQuestoesEncontradasFiltrados:Questao[] = [];
    dadosQuestoesEncontradas.forEach((item: Questao) => {
      let duplicated =
        dadosQuestoesEncontradasFiltrados.findIndex((itemAtual: Questao) => {
          return item.ID === itemAtual.ID;
        }) > -1;

      if (!duplicated) {
        dadosQuestoesEncontradasFiltrados.push(item);
      }
    });

    // Parte responsável por setar os dados e disparar respostas ao usuário
    if (
      dadosQuestoesEncontradasFiltrados.length > 0 &&
      consultarQuestoes !== ''
    ) {
      let dadosNoLocalStorage = localStorage.getItem(
        '@Questoes-Talk/SearchHistory',
      );
      if (dadosNoLocalStorage) {
        localStorage.setItem(
          '@Questoes-Talk/SearchHistory',
          consultarQuestoes + ',' + dadosNoLocalStorage,
        );
      } else {
        localStorage.setItem('@Questoes-Talk/SearchHistory', consultarQuestoes);
      }
      setPage(0);
      setQuestoesEncontradas(dadosQuestoesEncontradasFiltrados);
      notifySucesso(dadosQuestoesEncontradasFiltrados.length);
    } else if (consultarQuestoes === '') {
      setQuestoesEncontradas(arquivoDeQuestoes);
      notifyInfo();
    } else notifyError();
  };

  //Notificações para o usuário
  const notifyError = () => {
    toast.error('Nenhuma questão encontrada', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notifyInfo = () => {
    toast.info('Exibindo todas as questões', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notifySucesso = (valor: number) => {
    toast.success('Exibindo ' + valor + ' pergunta(as) encontrado(os)', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
        <Box className="containerPagina">
          <Box
            className={'containerLogo'}
            display="block"
            flexDirection={'row'}
          >
            <img alt="Logo" className={'imagemLogo'} src={logo} />
            <Typography className="textoLogo">Questões Talk</Typography>
          </Box>
          <Box className="containerBuscarQuestao">
            <Typography className="textoCampoBuscaQuestao">
              Digite a resposta e em seguida clique em buscar para encontrar as
              perguntas
            </Typography>
            <TextField
              className="compoBuscaQuestao"
              onChange={(event) => setConsultarQuestoes(event.target.value)}
              variant="outlined"
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  buscarQuestoes();
                  ev.preventDefault();
                }
              }}
            />
            <Button
              className="buttonBuscaQuestao"
              variant="contained"
              color="primary"
              onClick={() => buscarQuestoes()}
            >
              Buscar
            </Button>
          </Box>
          <Box className="containerListagem">
            <TableContainer component={Paper}>
              <Table>
                <TableHead className={'tableHead'}>
                  <TableRow>
                    <TableCell className={'tableCellHeadFirst'}>
                      Pergunta
                    </TableCell>
                    <TableCell className={'tableCellHead'}>Descrição</TableCell>
                    <TableCell className={'tableCellHead'}>
                      Tipo de Tema
                    </TableCell>
                    <TableCell className={'tableCellHead'}>Sub Tema</TableCell>
                    <TableCell className={'tableCellHead'}>
                      Sub Tema 2
                    </TableCell>
                    <TableCell className={'tableCellHead'}>Inativo</TableCell>
                    <TableCell className={'tableCellHead'}>Imagem</TableCell>
                    <TableCell className={'tableCellHead'}>Respostas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(8 > 0
                    ? questoesEncontradas.slice(page * 8, page * 8 + 8)
                    : questoesEncontradas
                  ).map((questao) => (
                    <TableRow key={questao.ID}>
                      <TableCell component="th" scope="row">
                        {questao.Pergunta}
                      </TableCell>
                      <TableCell align="center">
                        {questao.Descricao || 'Vazia'}
                      </TableCell>
                      <TableCell align="center">
                        {questao.TipoTema || 'Vazio'}
                      </TableCell>
                      <TableCell align="center">
                        {questao.SubTema || 'Vazio'}
                      </TableCell>
                      <TableCell align="center">
                        {questao.SubTema2 || 'Vazio'}
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          checked={questao.Inativo}
                          name="checkedB"
                          color="primary"
                          disabled
                        />
                      </TableCell>
                      <TableCell align="center">
                        <img
                          alt="questaoImage"
                          src={questao.Imagem}
                          className={'imagemTableCell'}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <ModalRespostas respostas={questao.Respostas} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={questoesEncontradas.length}
                      rowsPerPageOptions={[0]}
                      rowsPerPage={8}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default EncontrarQuestoes;
