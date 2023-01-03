import { Stack, Typography } from '@mui/material';

const HistoryItem = () => {
  const config = [
    {
      label: 'Pool',
      value: 'x20',
    },
    {
      label: 'Round',
      value: '562341',
    },
    {
      label: 'Your results',
      value: '+25 tickets',
    },
  ];

  return (
    <Stack flexDirection="row" gap="20px" width='100%' justifyContent='space-between'>
      {config?.map((item: any) => (
        <Stack key={item.value} alignItems='flex-start'>
          <Typography variant="body4Poppins" color="text.secondary" fontWeight="400">
            {item?.label}
          </Typography>
          <Typography variant="body3Poppins" color="text.primary" fontWeight="600">
            {item?.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default HistoryItem;
