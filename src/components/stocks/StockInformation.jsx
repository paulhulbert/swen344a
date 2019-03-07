import React from 'react';
import { Header } from 'semantic-ui-react';

export default function StockInformation() {
  return (
    <div>
      <Header as="h4" inverted="inherit">SYMB - Company Name</Header>
      <div>Open: Value</div>
      <div>Day High: Value</div>
      <div>Day Low: Value</div>
      <div>52 Week High: Value</div>
      <div>52 Week Low :Value</div>
    </div>
  )
}