// router
export default (store) => {
  let routes = {};

  const on = (route, render) => {
    if (!routes[route]) {
      routes[route] = {};
    }
    routes[route] = {
      ...routes[route],
      render
    }
  }

  return {
    on,
    routes
  }
}
