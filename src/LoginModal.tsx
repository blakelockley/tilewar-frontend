import { Dialog } from '@headlessui/react'
import { useState } from 'react';
import { Player } from './interfaces';
import { getData } from './backend';

function LoginModal(props: { isOpen: boolean, setIsOpen: (f: boolean) => void, onLogin: (player?: Player) => void }) {

  const [token, setToken] = useState<string>(localStorage.getItem('authToken') ?? '');

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  function handleLogin() {
    setHasSubmitted(true);
    localStorage.setItem('authToken', token);

    getData('/players/me/')
      .then((player: Player) => {
        setHasError(false);

        props.onLogin(player);
        props.setIsOpen(false);
      })
      .catch(() => {
        props.onLogin(undefined);
        setHasError(true);
      })
      .finally(() => setHasSubmitted(false));
  }

  return (
    <Dialog open={props.isOpen} onClose={() => props.setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen h-screen items-center justify-center bg-black/50">
        <Dialog.Panel className="flex flex-col gap-2 rounded border p-10 w-[600px] bg-white">
          <Dialog.Title className="font-semibold text-lg">
            Login to Tile War
          </Dialog.Title>
          <Dialog.Description>
            Please paste in the token proived by Blakos.<br />Message me at any time if you need your token again. ❤️
          </Dialog.Description>
          <div>
            <input type="text" className="w-full border rounded p-2" value={token} onChange={(e) => setToken(e.currentTarget.value)} />
          </div>
          {hasError &&
            <div className='text-red-600 text-sm font-semibold'>
              Invalid token
            </div>
          }
          <div className="flex">
            <button className='btn btn-secondary w-40' onClick={() => props.setIsOpen(false)}>Cancel</button>
            <button className='btn btn-primary ml-auto w-40' onClick={handleLogin} disabled={token.length === 0}>
              {hasSubmitted ? "..." : "Login"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default LoginModal;
