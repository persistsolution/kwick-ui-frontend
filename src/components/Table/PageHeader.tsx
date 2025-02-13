import React from 'react';

interface PageHeaderProps {
  heading: string;
  homepage: string;
  activepage: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ heading, homepage, activepage }) => {
  return (
    <div className="page-header">
      <h1>{heading}</h1>
      <div className="breadcrumb">
        <a href="/">{homepage}</a> / <span>{activepage}</span>
      </div>
    </div>
  );
};

export default PageHeader;
