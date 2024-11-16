import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Icons,
} from '@components';

export const DeleteFinancialAccountDialog = ({
  financial_accounts_id,
  deleteMutation,
}: {
  financial_accounts_id: UUID;
  deleteMutation: any;
}) => (
  <AlertDialog>
    <AlertDialogTrigger className="relative">
      <Icons
        type="close"
        className="absolute -right-4 -top-6 h-4 cursor-pointer opacity-70 transition-opacity hover:scale-105 hover:opacity-100"
      />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Eliminar esta cuenta financiera?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción es permanente
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => deleteMutation.mutate(financial_accounts_id)}
        >
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
