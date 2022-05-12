import React, { useContext } from 'react';
import { API } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import { Routes, Route, Link } from 'react-router-dom';

import { AppContext } from 'components/App';

import AddRoomModal from './AddRoomModal';
import EditRoomModal from './EditRoomModal';

import style from './index.module.scss';

export default function RoomsView() {

  const {
    plants,
    rooms,
    onRoomsChange
  } = useContext(AppContext);

  async function onAdd(roomData) {

    await API.graphql({
      query: mutations.createRoom,
      variables: {
        input: roomData
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    onRoomsChange();

  }
  async function onSave(roomData) {

    await API.graphql({
      query: mutations.updateRoom,
      variables: {
        input: roomData
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    onRoomsChange();

  }
  async function onDelete(roomId) {

    await API.graphql({
      query: mutations.deleteRoom,
      variables: {
        input: {
          id: roomId
        }
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    onRoomsChange();

  }

  function getPlantsCount(roomId) {
    return plants
      ?.filter((p) => p.roomId === roomId)
      ?.length;
  }

  return (
    <div className={style.wrap}>

      <Routes>
        <Route path='edit/:id' element={(
          <EditRoomModal
            onDelete={onDelete}
            onSave={onSave} />
        )} />
        <Route path='add' element={(
          <AddRoomModal
            onAdd={onAdd} />
        )} />
      </Routes>

      <h2>Rooms</h2>

      <div className={style.wrapAdd}>
        <Link
          to='/rooms/add'
          alt='Add room'>
          Add room
        </Link>
      </div>

      <h3>Downstairs</h3>
      <ul>
        {rooms
          .filter((r) => r?.level === -1)
          .map((room, i) => (
            <li
              key={room?.id || i}>
              {room?.name} ({getPlantsCount(room?.id)} plants)
              &nbsp;
              <Link to={`/rooms/edit/${room?.id}`}>Edit</Link>
            </li>
        ))}
      </ul>
      <h3>Main level</h3>
      <ul>
        {rooms
          .filter((r) => r?.level === 0)
          .map((room, i) => (
            <li
              key={room?.id || i}>
              {room?.name} ({getPlantsCount(room?.id)} plants)
              &nbsp;
              <Link to={`/rooms/edit/${room?.id}`}>Edit</Link>
            </li>
        ))}
      </ul>
      <h3>Upstairs</h3>
      <ul>
        {rooms
          .filter((r) => r?.level === 1)
          .map((room, i) => (
            <li
              key={room?.id || i}>
              {room?.name} ({getPlantsCount(room?.id)} plants)
              &nbsp;
              <Link to={`/rooms/edit/${room?.id}`}>Edit</Link>
            </li>
        ))}
      </ul>

    </div>
  );
}
