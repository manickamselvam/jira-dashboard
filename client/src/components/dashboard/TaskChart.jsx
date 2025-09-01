import { Pie } from '@ant-design/charts';

export default function TaskChart({ stats }) {
  const data = [
    { type: 'Completed', value: stats.completed },
    { type: 'Todo', value: stats.pending },
    { type: 'In Progress', value: stats.inProgress },
    { type: 'In QA', value: stats.inQA },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: { fontSize: 14, textAlign: 'center' },
    },
    interactions: [{ type: 'element-active' }],
  };

  return <Pie {...config} style={{ marginTop: 32 }} />;
}
