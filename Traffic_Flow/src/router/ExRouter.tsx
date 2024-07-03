import {
  useRoutes,
  Navigate,
  RouteObject,
  IndexRouteObject,
  NonIndexRouteObject,
} from "react-router-dom";
import { useLocation, Location } from "react-router";
import { debug } from "console";

/**
 * @description: Extended attribute
 */
interface ExRouteObjectProps {
  /**
   * @description: Redirects route addresses
   */
  redirect?: string;
  /**
   * @description: sublist
   */
  children?: ExRouteObject[];
}

/**
 * @description:  IndexRouteObject
 */
export interface ExIndexRouteObject
  extends Omit<IndexRouteObject, "children">,
    ExRouteObjectProps {}

/**
 * @description:  NonIndexRouteObject
 */
export interface ExNonIndexRouteObject
  extends Omit<NonIndexRouteObject, "children">,
    ExRouteObjectProps {}

/**
 * @description: Route object type
 */
export type ExRouteObject = ExIndexRouteObject | ExNonIndexRouteObject;

/**
 * @description: Find the route object type
 */
type ExRouteObjectFind = ExRouteObject | undefined;

/**
 * @description: Component parameter
 */
export interface ExRouterProps {
  /**
   * @description: Routing list
   */
  routes: ExRouteObject[];
}

const Component = (props: ExRouterProps) => {
  // Current navigation object
  const location = useLocation();
  // Find route object
  const findRoute = (
    routes: ExRouteObject[],
    location: Location
  ): ExRouteObjectFind => {
    // The current level checks one round
    let route: any = routes.find(
      (item: any) => item.path === location.pathname
    );
    // If not, search the current level sibling subpage
    if (!route) {
      // Canvass, find the stop
      routes.some((item: any) => {
        // Fetch sublist
        const children: ExRouteObject[] = item?.children || [];
        // The sublist has values
        if (children.length) {
          // Conduct investigation
          route = findRoute(children, location);
        }
        // Pause if there is a value
        return !!route;
      });
    }
    return route;
  };
  //Find the current route
  const route: ExRouteObjectFind = findRoute(props.routes, location);
  // Back render
  return (
    <>
      {/* Load all routes */}
      {useRoutes(props.routes as RouteObject[])}
      {/* Check whether the current route needs redirection */}
      {route?.redirect && <Navigate to={route.redirect} replace />}
    </>
  );
};

export default Component;
