
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { batchActions } from 'redux-batched-actions';
import { useHash } from 'react-use';

import {
  parseUrlParams,
  trimToValidRoute
} from '~/src/utils/routing';

import * as actions from '~/src/actions';

import config from '~/src/config';

const Router = ({
  children = null
}) => {

  const [ hash, setHash ] = useHash();
  const dispatch = useDispatch();

  useEffect(() => {

    if (!config?.router?.validRoutes) return;

    const [ hashPath, hashParams ] = hash.split('?');

    let nextRoute = trimToValidRoute(hashPath, config?.router?.validRoutes),
        nextHash  = `#/${nextRoute}`;

    const routeActions = [ actions.setRoute(nextRoute) ];

    if (!!hashParams?.length) {
      const nextParams = parseUrlParams(hashParams);
      routeActions.push(actions.setUrlParams(nextParams));
      nextHash += '?' + hashParams;
    }

    setHash(nextHash);
    dispatch(batchActions(routeActions));

  }, [
    hash,
    setHash,
    dispatch
  ]);

  return (
    <>{children}</>
  );

}

export default Router;