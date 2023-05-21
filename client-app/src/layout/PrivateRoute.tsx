import { RouteProps, RouteComponentProps, Route, Redirect } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default observer(function PrivateRoute({ component: Component, ...rest }: Props) {
    const { userStore } = useStore();
    
    return (
        <Route
            {...rest}
            render={(props) => window.localStorage.getItem('jwt') != null ? <Component {...props} /> : <Redirect to='/login' />}
        />
    )
})