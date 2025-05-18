import { PieChart, PieChartProps } from "react-minimal-pie-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";

type Props = {
  title: string;
  description?: string;
  footer_title?: string;
  footer_description?: string;

  chartData: PieChartProps["data"];
};

const PieChartComponent: React.FC<Props> = ({
  title,
  description,
  footer_title,
  footer_description,
  chartData,
}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <PieChart data={chartData} className="h-28" />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {footer_title}
        </div>
        <div className="text-muted-foreground leading-none">
          {footer_description}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieChartComponent;
