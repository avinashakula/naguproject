import React from 'react';
import { SkillZoneContainer } from "../../../screens/home";
import { Loader } from '../../../common'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../../../../../config/routes";
import ScrollToTop from '../../../common/scrollToTop';

function RouteWithSubRoutes(route) {
    return (
        <Route
            exact={route.exact}
            path={route.path}
            render={route.render ? route.render : props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

export default class RootNavigator extends React.PureComponent {

    
    
    render() {
        return (
            <React.Fragment>
                <Router basename={process.env.RELATIVE_PATH}>
                    <ScrollToTop>
                        <Switch>
                            {routes.map((route, i) => (
                                <RouteWithSubRoutes key={i} {...route} />
                            ))}
                        </Switch>
                    </ScrollToTop>
                </Router>
                <Loader />
            </React.Fragment>
        );
    }

}