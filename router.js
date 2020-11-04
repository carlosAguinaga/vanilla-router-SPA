class Router {

  constructor(routes){
    this.routes = routes;
    this._losadInitialRout();
  }

  loadRoute(...urlSegs){
    const matchedRoutes = this._matchUrlToRoute(urlSegs);

    
    const url = `/${urlSegs.join('/')}`;
    history.pushState({}, 'this works', url); 

    const routerOutElm = document.querySelectorAll('[data-router]')[0];
    routerOutElm.innerHTML = matchedRoutes.template;

  }

  _matchUrlToRoute(urlSegs){
    const matchesRoutes = this.routes.find( route => {
      const routePathSegs = route.path.split('/').slice(1);

      if (routePathSegs.length !== urlSegs.length) {
        return false;
      }

      return routePathSegs
      .every( (routePathSeg, i) => routePathSeg === urlSegs [i] );

    });
    return matchesRoutes;

  }

  _losadInitialRout(){
    const pathNameSplit = window.location.pathname.split('/');
    const pathSets = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';

    this.loadRoute(...pathSets)
  }

}