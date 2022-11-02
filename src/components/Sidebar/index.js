import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {

  return (
    <Menu>
      <a className="" href="/">
        Employee Details
      </a>

      <a className="" href="/empfamily">
        Employee Family Details
      </a>

      <a className="" href="/empid">
        View Employee Details
      </a>

      <a className="" href="/empfamid">
        View Employee Family Details
      </a>

    </Menu>
  );
};