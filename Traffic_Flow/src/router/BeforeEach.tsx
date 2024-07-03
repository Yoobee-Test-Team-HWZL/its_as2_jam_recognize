// import { Navigate, useLocation, useSearchParams } from 'react-router-dom'

const Component = (props: any) => {
  // // router params
  // const [searchParams] = useSearchParams()
  // //
  // const location = useLocation()
  // // token
  // const token = 'xxxx'
  // // console.log(location, searchParams.get('token'))
  // // permission verification
  // if (location.pathname.includes('/login') && token) {
  //   // not to login && has token
  //   return <Navigate to="/home" replace />
  // } else if (!location.pathname.includes('/login') && !token) {
  //   // to login && no token
  //   return <Navigate to="/login" replace />
  // }
  // verification successful
  return props.children;
};

export default Component;
