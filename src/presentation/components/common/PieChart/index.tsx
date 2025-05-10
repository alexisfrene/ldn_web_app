import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@ui/chart";

const chartConfig = {
  total: {
    label: "total",
  },
  debt_paid: {
    label: "Pagado",
    color: "var(--chart-1)",
  },
  debt_unpaid: {
    label: "Pendiente",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type Props = {
  title: string;
  description?: string;
  footer_title?: string;
  footer_description?: string;
  dataKey: string;
  nameKey: string;
  chartData: any[];
};

export const PieChartComponent: React.FC<Props> = ({
  title,
  description,
  footer_title,
  footer_description,
  chartData,
  dataKey,
  nameKey,
}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey={dataKey} nameKey={nameKey} />
          </PieChart>
        </ChartContainer>
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
