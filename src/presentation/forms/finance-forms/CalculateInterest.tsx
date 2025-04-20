import { calculateInterest } from '@utils';

type InterestProps = {
  totalAmountToPay: number;
  amountReceived: number;
  numberOfInstallments: number;
};

export const CalculateInterest = ({
  totalAmountToPay,
  amountReceived,
  numberOfInstallments,
}: InterestProps) => {
  const { effectiveInterestPerInstallment, totalInterest } = calculateInterest({
    totalAmountToPay,
    amountReceived,
    numberOfInstallments,
  });

  return (
    <div>
      <p>Total de interés: {totalInterest.toFixed(2)}%</p>
      <p>Interés por cuota : {effectiveInterestPerInstallment.toFixed(2)}%</p>
    </div>
  );
};
