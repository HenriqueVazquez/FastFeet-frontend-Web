/* eslint-disable no-alert */
import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/MorePopUp';
import api from '~/services/api';
import { useNavigate } from 'react-router-dom';
import { colors } from '~/styles/colors';

import { Container, MoreConainer } from './styles';

export default function RecipientItem({ data, updateRecipients }) {
  const navigate = useNavigate();
  async function handleDelete() {
    const confirm = window.confirm(
      'Você tem certeza que deseja deletar o endereço de entrega?'
    );

    if (!confirm) {
      toast.error('Destinatário não apagado!');
      return;
    }

    try {
      await api.delete(`/recipients/${data.id}`);
      updateRecipients();
      toast.success('Destinatário apagado com sucesso!');
    } catch (err) {
      toast.error(
        'Esse destinatário não pode ser apagado, pois ainda tem encomenda para receber!'
      );
    }
  }

  return (
    <Container>
      <small>#{data.id}</small>
      <small>{data.name}</small>
      <small>
        {data.street}, {data.number}, {data.city} - {data.uf}
      </small>
      <More>
        <MoreConainer>
          <div>
            <button
              onClick={() => navigate(`/recipient/${data.id}`)}
              type="button"
            >
              <MdEdit color={colors.info} size={15} />
              <span>Editar</span>
            </button>
          </div>
          <div>
            <button onClick={handleDelete} type="button">
              <MdDeleteForever color={colors.danger} size={15} />
              <span>Excluir</span>
            </button>
          </div>
        </MoreConainer>
      </More>
    </Container>
  );
}

RecipientItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    uf: PropTypes.string.isRequired,
    zip_code: PropTypes.string.isRequired,
  }).isRequired,
  updateRecipients: PropTypes.func.isRequired,
};
