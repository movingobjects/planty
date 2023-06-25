import { atom } from 'jotai';

// Base atoms

export const authUser = atom(null);
export const user = atom(null);
export const plants = atom([]);
export const species = atom([]);
export const rooms = atom([]);

// Derived atoms

export const activePlants = atom((get) => (
  (get(plants) || [])
    .filter((p) => !p.dateRetired)
));
export const activeRooms = atom((get) => (
  (get(rooms) || [])
    .filter((room) => (
      get(activePlants)
        .some((plant) => plant.roomId === room.id)
    ))
));