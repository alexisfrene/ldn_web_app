import React from 'react';
import { CardDescription, Icons, Separator } from '@components';
import { CategoryEdit } from './CategoryEdit';
import { SizeEdit } from './SizeEdit';
import { SignOff } from './SignOff';
import { ChangePassword } from './ChangePassword';

interface Props {
  showModal: (title: string, content: React.ReactNode) => void;
  showSheet: () => void;
  hideModal: () => void;
}

export const Rows: React.FC<Props> = ({ showModal, showSheet, hideModal }) => {
  const config = [
    {
      description: 'Ajustes en categorías',
      icon: (
        <Icons
          type="copy_manual"
          className="col-span-1 w-6 cursor-pointer text-slate-500 hover:text-slate-700"
        />
      ),
      onClick: () =>
        showModal(
          'Editando categorías',
          <CategoryEdit showSheet={showSheet} />,
        ),
    },
    {
      description: 'Ajustes en talles/números',
      icon: (
        <Icons
          type="copy_manual"
          className="col-span-1 w-6 cursor-pointer text-slate-500 hover:text-slate-700"
        />
      ),
      onClick: () =>
        showModal('Editar talles/números', <SizeEdit showSheet={showSheet} />),
    },
    {
      description: 'Cambiar contraseña',
      icon: (
        <Icons
          type="copy_manual"
          className="col-span-1 w-6 cursor-pointer text-slate-500 hover:text-slate-700"
        />
      ),
      onClick: () =>
        showModal('Estas por cambiar la contraseña :', <ChangePassword />),
    },

    {
      description: 'Cerrar sesión',
      icon: (
        <Icons
          type="arrow_left_start_on_rectangle"
          className="col-span-1 w-6 cursor-pointer text-red-500 hover:text-red-600"
        />
      ),
      onClick: () =>
        showModal(
          'Estas seguro de cerrar sesión ?',
          <SignOff hideModal={hideModal} />,
        ),
    },
  ];
  return config.map((row, i) => (
    <div className="px-1 hover:bg-slate-100 dark:hover:bg-slate-800" key={i}>
      <Separator />
      <CardDescription className="my-3 flex justify-between select-none">
        {row.description}
        <span onClick={row.onClick} className="cursor-pointer">
          {row.icon}
        </span>
      </CardDescription>
      <Separator />
    </div>
  ));
};
