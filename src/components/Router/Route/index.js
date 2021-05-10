
import React from 'react';
import { useSelector } from 'react-redux';

import { checkRoutePath } from '~/src/utils/routing';

const Route = ({
  path,
  dispatch,
  component,
  ...passedProps
}) => {

  const route = useSelector((state) => state.route);

  const {
    match,
    props: routeProps
  } = checkRoutePath(route, path);

  if (!match) return null;

  const Component = component;

  const props     = {
    ...routeProps,
    ...passedProps
  };

  return (
    <Component {...props} />
  );

}

export default Route;
