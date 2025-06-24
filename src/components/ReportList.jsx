import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPORTS } from '../graphql/queries';

function ReportList() {
  const { loading, error, data } = useQuery(GET_REPORTS);

  if (loading) return <p>Memuat laporan...</p>;
  if (error) return <p>Gagal memuat laporan</p>;

  return (
    <div className="report-list">
      <h2>Daftar Laporan</h2>
      <ul>
        {data.getReports.map(report => (
          <li key={report.id} className="report-item">
            <div className="report-header">
              <strong>{report.title}</strong>
              <small>{new Date(report.createdAt).toLocaleString()}</small>
            </div>
            <p>{report.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportList;
