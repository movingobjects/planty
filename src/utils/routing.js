
export const parseUrlParams = (paramsString) => {

  const params = { };

  for (let [key, value] of new URLSearchParams(paramsString)) {

    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }

    params[key] = value;

  }

  return params;

}

export const getRouteSegments = (route) => {

  route = route.split('?')[0];

  if (route.charAt(0) === '#') route = route.slice(1);
  if (route.charAt(0) === '/') route = route.slice(1);
  if (route.slice(-1) === '/') route = route.slice(0, -1);

  return route.split('/');

}

export const checkRoutePath = (route, path) => {

    const result = {
      match: true,
      props: { }
    };

    const routeSegs = getRouteSegments(route).filter((s) => !!s.length),
          pathSegs  = getRouteSegments(path).filter((s) => !!s.length);

    if (pathSegs.length > routeSegs.length) {
      result.match = false;

    } else {
      pathSegs.forEach((pathSeg, index) => {

        if (!result.match) return;

        const routeSeg = routeSegs[index];

        if (pathSeg.charAt(0) === ':') {
          result.props[pathSeg.slice(1)] = routeSeg;

        } else if (routeSeg !== pathSeg) {
          result.match = false;
        }

      });
    }

    return result;

  }

export const trimToValidRoute = (route, validRoutes = []) => {

  const segments = getRouteSegments(route);

  const validCount = validRoutes.reduce((count, validRoute) => {
    return Math.max(count, segments.reduce((matches, segment, i) => {
      const validSegment = validRoute.split('/')[i],
            isWildcard   = validSegment === '*',
            isMatch      = validSegment === segment;
      return (isWildcard || isMatch) ? matches + 1 : matches;
    }, 0));
  }, 0);

  return segments.slice(0, validCount).join('/');

}
