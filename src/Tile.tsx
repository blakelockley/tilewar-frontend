import { EyeIcon, LockClosedIcon } from "@heroicons/react/solid";
import { Tile as _Tile } from "./interfaces";

function Tile(props: { tile: _Tile, setCurrentTile: (tile: _Tile) => void }) {

  const { tile } = props;

  let style = {};
  if (tile.completed_by_team) {
    style = { backgroundColor: "#" + tile.completed_by_team?.colour, color: "white" };
  }

  return (
    <div className="relative w-full aspect-square border flex items-center justify-center hover:scale-150 hover:shadow transition-transform bg-white cursor-pointer hover:z-10 p-1" style={{ ...style }} onClick={() => props.setCurrentTile(props.tile)}>
      <div className='absolute left-1 top-1 flex gap-0.5'>
        {(tile.completed_by_team ? [] : tile.visible_to_teams).map((team) => (
          <EyeIcon key={team.name} className='w-3 h-3' style={{ color: "#" + team.colour }} />
        ))}
      </div>

      <div className='absolute right-1 top-1 flex text-xs text-gray-400'>
        {tile.number}
      </div>

      {tile.task
        ? <div className='text-xs truncate'>{tile.task.title.split(" ")[0]}</div>
        : <LockClosedIcon className='w-6 h-6 text-gray-200' />
      }
    </div>
  );

}

export default Tile;
