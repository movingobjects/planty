import { useAtomValue } from 'jotai';
import React from 'react';
import {
  Link, Route, Routes
} from 'react-router-dom';

import * as atoms from 'atoms';
import useApi from 'hooks/useApi';

import AddRoomModal from './AddRoomModal';
import EditRoomModal from './EditRoomModal';

import style from './index.module.scss';

const RoomsView = () => {
  const plants = useAtomValue(atoms.plants);
  const rooms = useAtomValue(atoms.rooms);

  const {
    createRoom,
    updateRoom,
    deleteRoom
  } = useApi();

  function getPlantsCount(roomId) {
    return plants
      ?.filter((p) => p.roomId === roomId)
      ?.length;
  }

  return (
    <div className={style.wrap}>

      <Routes>
        <Route
          path="edit/:id"
          element={(
            <EditRoomModal
              onDelete={deleteRoom}
              onSave={updateRoom} />
          )} />
        <Route
          path="add"
          element={(
            <AddRoomModal
              onAdd={createRoom} />
          )} />
      </Routes>

      <h2>Rooms</h2>

      <div className={style.wrapAdd}>
        <Link
          to="/rooms/add"
          alt="Add room">
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
              <Link to={`/rooms/edit/${room?.id}`}>Edit</Link>
              &nbsp;
              {room?.name} ({getPlantsCount(room?.id)} plants)
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
              <Link to={`/rooms/edit/${room?.id}`}>Edit</Link>
              &nbsp;
              {room?.name} ({getPlantsCount(room?.id)} plants)
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
              <Link to={`/rooms/edit/${room?.id}`}>Edit</Link>
              &nbsp;
              {room?.name} ({getPlantsCount(room?.id)} plants)
            </li>
          ))}
      </ul>

    </div>
  );
};

export default RoomsView;