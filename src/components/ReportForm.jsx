import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REPORT } from '../graphql/mutations';

function ReportForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addReport] = useMutation(ADD_REPORT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReport({ variables: { title, description } });
    alert('Laporan berhasil dikirim!');
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="report-form">
      <h2>Kirim Laporan</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Judul Laporan"
        required
        className="input-field"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Deskripsi Laporan"
        required
        rows={4}
        className="input-field"
      />
      <button type="submit" className="submit-button">Kirim</button>
    </form>
  );
}

export default ReportForm;
