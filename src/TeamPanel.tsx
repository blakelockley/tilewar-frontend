import { Team } from './interfaces';

function TeamPanel(props: { team: Team }) {
  return (
    <div className='flex flex-col w-full h-full border-2 rounded shadow-sm p-4' style={{ borderColor: "#" + props.team.colour }}>
      <div className='font-semibold text-lg underline' style={{ color: "#" + props.team.colour }}>
        {props.team.name}
      </div>
      <div>
        {props.team.players.map((player, i) => (
          <div key={player.username} className='flex items-center gap-2 text-sm font-semibold'>
            {player.username}
          </div>
        ))}
      </div>
      <div className='mt-auto font-semibold text-sm'>
        Completed Tiles: {props.team.completed_tiles}
      </div>
    </div>
  );
}

export default TeamPanel;
