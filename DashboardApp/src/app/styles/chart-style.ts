export const ChartStyles = {
  colors: {
    revenue: {
      border: '#34d399', // Emerald 400
      background: 'rgba(52, 211, 153, 0.4)',
      point: '#34d399',
    },
    expenses: {
      border: '#f87171', // Red 400
      background: 'rgba(248, 113, 113, 0.3)',
      point: '#f87171',
    },
    profit: {
      border: '#fbbf24', // Amber 400
      background: 'rgba(251, 191, 36, 0.3)',
      point: '#fbbf24',
    },
    product: {
      border: '#60a5fa', // Blue 400
      background: 'rgba(96, 165, 250, 0.4)',
      point: '#60a5fa',
    },
  },

  text: {
    primary: '#ffffff',
    secondary: '#ffffff',
  },
  grid: {
    color: '#000000',
  },

  commonOptions: {
    tension: 0.4,
    pointRadius: 4,
    pointHoverRadius: 6,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
  },
};
