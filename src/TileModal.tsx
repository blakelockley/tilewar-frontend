import { Dialog } from '@headlessui/react'
import { Tile } from './interfaces';
import { LockClosedIcon, XIcon } from '@heroicons/react/solid';

function TileModal(props: { tile?: Tile, setCurrentTile: (tile?: Tile) => void }) {

  if (!props.tile?.task)
    return (
      <Dialog open={!!props.tile} onClose={() => props.setCurrentTile(undefined)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen h-screen items-center justify-center bg-black/50">
          <Dialog.Panel className="flex gap-2 rounded overflow-hidden shadow w-[800px] h-[600px] bg-white">
            <div className='flex flex-col gap-4 bg-gray-100 w-5/12 items-center justify-center flex-shrink-0'>
              <LockClosedIcon className="w-[200px] text-gray-400" />
            </div>
            <div className='flex flex-col gap-4 relative w-full p-4'>
              <XIcon className='absolute top-2 right-2 w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer' onClick={() => props.setCurrentTile(undefined)} />
              <Dialog.Title className="font-semibold text-lg">
                Locked Tile
              </Dialog.Title>
              <Dialog.Description>
                Get out of here you nosey cunt
              </Dialog.Description>
              <button className='btn btn-primary w-full mt-auto' onClick={() => { }} disabled>
                Submit Completion
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    )

  return (
    <Dialog open={!!props.tile} onClose={() => props.setCurrentTile(undefined)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen h-screen items-center justify-center bg-black/50">
        <Dialog.Panel className="flex gap-2 rounded overflow-hidden shadow w-[800px] h-[600px] bg-white">
          <div className='flex flex-col gap-4 bg-gray-100 w-5/12 items-center justify-center flex-shrink-0'>
            <img className="w-[200px]" src="https://oldschool.runescape.wiki/images/thumb/Zulrah_%28serpentine%29.png/800px-Zulrah_%28serpentine%29.png?29a54" alt="Task" />
          </div>
          <div className='flex flex-col gap-4 relative w-full p-4'>
            <XIcon className='absolute top-2 right-2 w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer' onClick={() => props.setCurrentTile(undefined)} />
            <Dialog.Title className="font-semibold text-lg">
              {props.tile?.task?.title}
            </Dialog.Title>
            <Dialog.Description>
              This is a description about the task
            </Dialog.Description>
            <button className='btn btn-primary w-full mt-auto' onClick={() => { }}>
              Submit Completion
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default TileModal;
