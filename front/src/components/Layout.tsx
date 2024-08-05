"use client";
import React, { useState } from 'react';
import HeaderMain from './Header';
import TableView from './tablesView';

const Table: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div>
      <HeaderMain searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TableView searchQuery={searchQuery} />
    </div>
  );
};

export default Table;
