import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type WeightEntry = {
  date: string;
  weight: number;
};

type Props = {};

const Progress: React.FC<Props> = () => {
  // State for the weight input form.
  const [weight, setWeight] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState<WeightEntry[]>([]);

  // Update weight state
  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  // Update date state
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  // Add new weight entry 
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEntry: WeightEntry = {
      date: date,
      weight: parseFloat(weight)
    };

    const updatedEntries = [...entries, newEntry].sort((a, b) => a.date.localeCompare(b.date));
    setEntries(updatedEntries);
    setWeight('');
  };

  const chartData = {
    labels: entries.map(entry => entry.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: entries.map(entry => entry.weight),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Chart configuration 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weight Progress Over Time',
      },
    },
  };

  return (
    <div style={containerStyle}>
      <h1>Weight Progress</h1>

      <div style={chartContainerStyle}>
        <Line data={chartData} options={options} />
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Weight (kg):</label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={handleWeightChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Date:</label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>Add Entry</button>
      </form>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '20px auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle: React.CSSProperties = {
  marginBottom: '5px',
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const chartContainerStyle: React.CSSProperties = {
  marginTop: '40px',
};

export default Progress;