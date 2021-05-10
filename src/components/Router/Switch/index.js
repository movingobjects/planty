
import React from 'react';
import { useSelector } from 'react-redux';
import { isArray } from 'lodash';

import { checkRoutePath } from '~/src/utils/routing';

const Switch = ({
  children
}) => {

  const route = useSelector((state) => state.route);

  if (!isArray(children)) {
    return (
      <>{children}</>
    );
  }

  const Match = children
    .find((c) => (
      !!c?.props?.path?.length &&
      !!checkRoutePath(route, c?.props?.path)?.match
    ));

  return Match ? (
    <>{Match}</>
  ) : (
    null
  );

}

export default Switch;
