import useSWR from 'swr';
import { getData } from './backend';
import { Player, Team, Tile as _Tile } from './interfaces';
import LoginModal from './LoginModal';
import Tile from './Tile';
import { useState } from 'react';

import TeamPanel from './TeamPanel';
import TileModal from './TileModal';


export function App() {

  const { data: player, mutate: revalidatePlayer } = useSWR<Player>('/players/me/', getData);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { data: teams } = useSWR<Array<Team>>('/players/teams/', getData);
  const { data: tiles, mutate: revalidateTiles } = useSWR<Array<_Tile>>('/tiles/tiles/', getData);

  const [currentTile, setCurrentTile] = useState<_Tile>();

  if (!teams || !tiles)
    return null;

  return (
    <div className="w-screen h-screen">
      <LoginModal isOpen={showLoginModal} setIsOpen={setShowLoginModal} onLogin={(player) => { revalidatePlayer(player); revalidateTiles(); }} />
      <TileModal tile={currentTile} setCurrentTile={setCurrentTile} />
      <div className="w-full h-14 bg-blue-600 flex items-center text-lg text-white font-semibold p-8">
        <div className='px-4 text-lg'>
          RNG Street - Tile War
        </div>
        <div className='px-4 hover:underline cursor-pointer'>
          Board
        </div>
        <div className='px-4 hover:underline cursor-pointer'>
          Teams
        </div>
        <div className='px-4 hover:underline cursor-pointer'>
          Statistics
        </div>
        <div className='px-4 hover:underline cursor-pointer ml-auto' onClick={() => setShowLoginModal(true)}>
          {player?.username ?? 'Login'}
        </div>
      </div>
      <div className="flex justify-between gap-16 p-8">
        <div className='flex flex-col gap-16 w-full'>
          <TeamPanel team={teams[0]} />
          <TeamPanel team={teams[1]} />
        </div>
        <div className="grid grid-cols-10 grid-rows-10 border h-[720px] w-[720px] flex-shrink-0">
          {tiles.map((tile) => <Tile key={tile.number} tile={tile} setCurrentTile={setCurrentTile} />)}
        </div>
        <div className='flex flex-col gap-16 w-full'>
          <TeamPanel team={teams[2]} />
          <TeamPanel team={teams[3]} />
        </div>
      </div>
    </div>
  );
}

export default App;
